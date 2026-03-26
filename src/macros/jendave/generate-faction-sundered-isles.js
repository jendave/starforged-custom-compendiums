// Macro by David Hudson under the MIT License.
//
// Extension: add RollTable document ids to the arrays in FACTION_ORACLES (one id per table).
// When an array has multiple ids, a random table is used for that step.
// Guild / fringe ids are reserved for future type-detail wiring; they are not rolled in this macro yet.

// =============================================================================
// Oracle pack configuration (edit here to point at other compendia or more tables)
// =============================================================================

const FACTION_ORACLES = {
    rollTablePrefix: "Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.",
    ids: {
        type: ["b4383db857ca3b34"],
        influence: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.66110f9a7d08cf74"],
        societychronicles: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.357c11f1cb736462"],
        societyoverseers: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.41d28fe3103bc730"],
        societytouchstones: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.19b1c62d7f0845c5"],
        relationships: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.59b86d78f3bdb745"],
        organizationtypes: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.fbc5f237d5a0c1bc"],
        organizationmethods: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.c5abc14b60ea728e"],
        organizationsecrets: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.d94642748c2feb36"],
        imperialleadership: ["fddeddbbad1bc62a"],
        imperialtactics: ["cfac08ca2345cbed"],
        imperialvulnerabilities: ["b347a87fb81a3abb"],
        theme: ["0c5ce82c7adbb4e2"],
        dominion: ["e6552ca1c08225e6"],
        dominionLeadership: ["a57014c9aabe315a"],
        guild: ["da3a6351fff54ef4"],
        fringe: ["f3403e14e9e6bd71"],
        nameTemplate: ["9e9c1587cf1c98e1"],
    },
};

const FACTION_CHAT = {
    title: "<h3><strong>Generate Faction (Sundered Isles)</strong></h3>",
    dominionLabelIncludes: "Dominion",
};

// =============================================================================
// Chat utilities
// =============================================================================

function printMessage(message) {
    const chatData = { content: message };
    ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));
    ChatMessage.create(chatData, {});
}

function randomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function firstRollText(roll) {
    return roll.results[0].text;
}

// =============================================================================
// Compendium link parsing
// =============================================================================

function parseTableResultToUUID(result) {
    const open = result.indexOf("[");
    const close = result.indexOf("]");
    if (open === -1 || close === -1 || close <= open) {
        return result;
    }
    const insideBrackets = result.slice(open + 1, close);
    const lastDot = insideBrackets.lastIndexOf(".");
    if (lastDot === -1) {
        return insideBrackets;
    }
    return insideBrackets.slice(lastDot + 1);
}

function parseTableResultToString(result) {
    const openBrace = result.indexOf("{");
    const closeBrace = result.indexOf("}");
    if (openBrace === -1 || closeBrace === -1 || closeBrace <= openBrace) {
        return result;
    }
    return result.slice(openBrace + 1, closeBrace);
}

// =============================================================================
// Roll comparison and "Roll twice" handling
// =============================================================================

function stripRollTextForCompare(s) {
    return (s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function rollResultTextsEqual(a, b) {
    return stripRollTextForCompare(a) === stripRollTextForCompare(b);
}

const ROLL_TWICE_MAX_UNIQUE_ATTEMPTS = 200;
const ROLL_TWICE_LABEL = "Roll twice";

function isRollTwiceResult(rawText) {
    const t = (rawText ?? "").trim();
    if (t === ROLL_TWICE_LABEL) {
        return true;
    }
    if (t.includes("@Compendium") || t.includes("{")) {
        return parseTableResultToString(t) === ROLL_TWICE_LABEL;
    }
    return false;
}

async function rollUniqueTableRow(table, usedDisplayValues, mapRawToDisplay = async (raw) => raw) {
    for (let attempt = 0; attempt < ROLL_TWICE_MAX_UNIQUE_ATTEMPTS; attempt++) {
        const raw = firstRollText(await table.roll());
        const display = await mapRawToDisplay(raw);
        if (!usedDisplayValues.some((x) => rollResultTextsEqual(x, display))) {
            usedDisplayValues.push(display);
            return display;
        }
    }
    const raw = firstRollText(await table.roll());
    const display = await mapRawToDisplay(raw);
    usedDisplayValues.push(display);
    return display;
}

async function rollTableResolvingRollTwice(table) {
    const out = [];

    async function addOneResolved() {
        let raw = null;
        let placed = false;
        for (let attempt = 0; attempt < ROLL_TWICE_MAX_UNIQUE_ATTEMPTS && !placed; attempt++) {
            raw = firstRollText(await table.roll());
            if (isRollTwiceResult(raw)) {
                await addOneResolved();
                await addOneResolved();
                return;
            }
            if (!out.some((t) => rollResultTextsEqual(t, raw))) {
                out.push(raw);
                placed = true;
            }
        }
        if (!placed && raw !== null && !isRollTwiceResult(raw)) {
            out.push(raw);
        }
    }

    await addOneResolved();
    return out;
}

// =============================================================================
// RollTable helpers (use FACTION_ORACLES or pass another pack for reuse)
// =============================================================================

function rollTableFullUuid(oraclePack, idArray) {
    return oraclePack.rollTablePrefix + randomArrayItem(idArray);
}

async function getRollTable(oraclePack, idArray) {
    return fromUuid(rollTableFullUuid(oraclePack, idArray));
}

/** Picks one random table from idArray and returns one row plus its document id. */
async function rollOnceFromIdArray(oraclePack, idArray) {
    const id = randomArrayItem(idArray);
    const table = await fromUuid(oraclePack.rollTablePrefix + id);
    const roll = await table.roll();
    return { id, text: firstRollText(roll) };
}

/** Rolls 1–N unique rows on the same table instance (e.g. Dominion 1–3 draws). */
async function rollUniqueRowsSameTable(oraclePack, idArray, count, mapRaw = async (raw) => raw) {
    const table = await getRollTable(oraclePack, idArray);
    const parts = [];
    for (let i = 0; i < count; i++) {
        await rollUniqueTableRow(table, parts, mapRaw);
    }
    return parts;
}

// =============================================================================
// Name template
// =============================================================================

function normalizeNameTemplateLiterals(s) {
    const unwrapOfThe = (match, inner) => {
        const t = inner.replace(/\s+/g, " ").trim();
        return t.toLowerCase() === "of the" ? "of the" : match;
    };
    return s
        .replace(/<\s*em\s*>([\s\S]*?)<\s*\/\s*em\s*>/gi, unwrapOfThe)
        .replace(/<\s*i\s*>([\s\S]*?)<\s*\/\s*i\s*>/gi, unwrapOfThe);
}

function sanitizeChatFieldHtml(s) {
    let t = (s ?? "").trim();
    const stripBrEdges = () => {
        t = t.replace(/^(<br\s*\/?>\s*)+/gi, "");
        t = t.replace(/(\s*<br\s*\/?>)+$/gi, "");
        t = t.trim();
    };
    stripBrEdges();
    t = t.replace(/<p\b[^>]*>/gi, "");
    t = t.replace(/<\/p>/gi, " ");
    stripBrEdges();
    return t.trim();
}

async function resolveNameTemplateWithRolls(text, oraclePack, embeddedRolls = {}) {
    const linkRe = /@Compendium\[[^\]]+\](?:\{[^}]*\})?/g;
    const seenByRollTableUuid = new Map();
    let out = "";
    let lastIndex = 0;
    let m;

    while ((m = linkRe.exec(text)) !== null) {
        if (m.index > lastIndex) {
            out += normalizeNameTemplateLiterals(text.slice(lastIndex, m.index));
        }

        const uuid = parseTableResultToUUID(m[0]);
        let rowText;
        if (Object.prototype.hasOwnProperty.call(embeddedRolls, uuid)) {
            rowText = embeddedRolls[uuid];
        } else {
            const table = await fromUuid(oraclePack.rollTablePrefix + uuid);
            if (!seenByRollTableUuid.has(uuid)) {
                seenByRollTableUuid.set(uuid, []);
            }
            const seenForTable = seenByRollTableUuid.get(uuid);
            rowText = await rollUniqueTableRow(table, seenForTable, async (raw) => raw);
        }

        out += rowText;
        lastIndex = m.index + m[0].length;
    }

    out += normalizeNameTemplateLiterals(text.slice(lastIndex));
    return { text: out };
}

// =============================================================================
// Action + Theme compound row (projects / quirks / rumors)
// =============================================================================

function isActionPlusThemeCompound(oraclePack, rawText) {
    const { action, theme } = oraclePack.ids;
    if (!rawText || !/\s+\+\s+/.test(rawText)) {
        return false;
    }
    return rawText.includes(action[0]) && rawText.includes(theme[0]);
}

async function resolveActionThemeCompound(oraclePack, rawText) {
    if (!isActionPlusThemeCompound(oraclePack, rawText)) {
        return rawText;
    }
    const actionTable = await getRollTable(oraclePack, oraclePack.ids.action);
    const themeTable = await getRollTable(oraclePack, oraclePack.ids.theme);
    return `${firstRollText(await actionTable.roll())} ${firstRollText(await themeTable.roll())}`;
}

async function rollTableOneOrTwoTimes(oraclePack, idArrayKey) {
    const idArray = oraclePack.ids[idArrayKey];
    const table = await getRollTable(oraclePack, idArray);
    const rollCount = Math.floor(Math.random() * 2) + 1;
    const parts = [];
    const mapper = (raw) => resolveActionThemeCompound(oraclePack, raw);
    for (let i = 0; i < rollCount; i++) {
        await rollUniqueTableRow(table, parts, mapper);
    }
    return parts.join(", ");
}

// =============================================================================
// Faction-specific steps (compose from oracle pack + chat labels)
// =============================================================================

async function rollFactionTypeAndDetails(oraclePack, typeRollText) {
    const { ids } = oraclePack;
    const typeLabel = parseTableResultToString(typeRollText);
    let typeDetails = "";
    let dominionLeadership = "";

    const typeDetailUuid = typeRollText.includes("@Compendium") ? parseTableResultToUUID(typeRollText) : null;
    const typeDetailsCandidates = typeDetailUuid ? [typeDetailUuid] : [];

    if (typeLabel.includes(FACTION_CHAT.dominionLabelIncludes)) {
        const dominionCount = Math.floor(Math.random() * 3) + 1;
        const dominionParts = await rollUniqueRowsSameTable(oraclePack, ids.dominion, dominionCount, async (raw) => raw);
        typeDetails = dominionParts.join(", ");
        const leadTable = await getRollTable(oraclePack, ids.dominionLeadership);
        dominionLeadership = firstRollText(await leadTable.roll());
    } else if (typeDetailsCandidates.length > 0) {
        const table = await fromUuid(oraclePack.rollTablePrefix + randomArrayItem(typeDetailsCandidates));
        const typeDetailsRolls = await rollTableResolvingRollTwice(table);
        typeDetails = typeDetailsRolls.join(", ");
    }

    return { typeLabel, typeDetails, dominionLeadership };
}

async function preRollLegacyAffiliationIdentityForName(oraclePack) {
    const { ids } = oraclePack;
    const legacyRoll = await rollOnceFromIdArray(oraclePack, ids.legacy);
    const affiliationRoll = await rollOnceFromIdArray(oraclePack, ids.affiliation);
    const identitiesRoll = await rollOnceFromIdArray(oraclePack, ids.identities);
    const embeddedRolls = {
        [legacyRoll.id]: legacyRoll.text,
        [affiliationRoll.id]: affiliationRoll.text,
        [identitiesRoll.id]: identitiesRoll.text,
    };
    return {
        legacy: legacyRoll.text,
        affiliation: affiliationRoll.text,
        identities: identitiesRoll.text,
        embeddedRolls,
    };
}

function buildFactionMessageBody(fields) {
    const parts = [
        `<br>Name: ${fields.nameForMessage}`,
        `<br><br>Type: ${fields.typeLabel}`,
        `<br><br> Type Details:  ${fields.typeDetails}`,
    ];
    if (fields.dominionLeadership) {
        parts.push(`<br><br>Dominion Leadership:  ${fields.dominionLeadership}`);
    }
    parts.push(
        `<br><br> Influence:  ${fields.influence}`,
        `<br><br> Projects:  ${fields.projects}`,
        `<br><br> Relationships:  ${fields.relationships}`,
        `<br><br> Legacy:  ${fields.legacy}`,
        `<br><br> Affiliation:  ${fields.affiliation}`,
        `<br><br> Identities:  ${fields.identities}`,
        `<br><br> Quirks:  ${fields.quirks}`,
        `<br><br> Rumors:  ${fields.rumors}`,
    );
    return parts.join("");
}

// =============================================================================
// Main entry (call with FACTION_ORACLES or a copy with different ids)
// =============================================================================

async function runFactionGenerator(oraclePack = FACTION_ORACLES) {
    const { ids } = oraclePack;

    const typeTable = await getRollTable(oraclePack, ids.type);
    const typeRollText = firstRollText(await typeTable.roll());

    const { typeLabel, typeDetails, dominionLeadership } = await rollFactionTypeAndDetails(oraclePack, typeRollText);

    const { legacy, affiliation, identities, embeddedRolls } = await preRollLegacyAffiliationIdentityForName(oraclePack);

    const nameTemplateTable = await getRollTable(oraclePack, ids.nameTemplate);
    const nameTemplate = firstRollText(await nameTemplateTable.roll());
    const { text: nameResolved } = await resolveNameTemplateWithRolls(nameTemplate, oraclePack, embeddedRolls);

    const influenceTable = await getRollTable(oraclePack, ids.influence);
    const influence = firstRollText(await influenceTable.roll());

    const projects = await rollTableOneOrTwoTimes(oraclePack, "projects");

    const relationshipsTable = await getRollTable(oraclePack, ids.relationships);
    const relationships = (await rollTableResolvingRollTwice(relationshipsTable)).join("<br>");

    const quirks = await rollTableOneOrTwoTimes(oraclePack, "quirks");
    const rumors = await rollTableOneOrTwoTimes(oraclePack, "rumors");

    const message = buildFactionMessageBody({
        nameForMessage: sanitizeChatFieldHtml(nameResolved),
        typeLabel,
        typeDetails,
        dominionLeadership,
        influence,
        projects,
        relationships,
        legacy,
        affiliation,
        identities,
        quirks,
        rumors,
    });

    printMessage(FACTION_CHAT.title + message);
}

await runFactionGenerator(FACTION_ORACLES);
