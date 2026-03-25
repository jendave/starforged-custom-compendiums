// Macro by David Hudson under the MIT License.
//
// Extension: add RollTable document ids to the arrays in FACTION_ORACLES.ids (one id per table).
// For steps that live in another compendium, set prefixOverrides[key] and keep only bare document ids in ids[key].
// Type Details: Dominion (multi-roll + leadership), Fringe, and Guild use ids.dominion / ids.fringe / ids.guild when the type label matches FACTION_CHAT.

// =============================================================================
// Oracle pack configuration
// =============================================================================

const FACTION_ORACLES = {
    /** Default RollTable prefix for Starsmith expanded oracles. */
    rollTablePrefix: "Compendium.starsmith-expanded-oracles.starsmithexpandedoracles.RollTable.",
    /**
     * Optional per-step prefix when that step uses a different pack (bare ids in ids[influence], etc.).
     * Values must include trailing segment up to and including "RollTable." (with dot).
     */
    prefixOverrides: {
        influence: "Compendium.foundry-ironsworn.starforgedoracles.RollTable.",
        nameTemplate: "Compendium.foundry-ironsworn.starforgedoracles.RollTable.",
    },
    ids: {
        type: ["jrxDHQYEuB6XayQB"],
        influence: ["5f8eb805b526f608"],
        projects: ["OwLUXvgCKzKEa1wr", "69hcmdT5pjf2F1IU", "7VdNGiCm6peWzLMr"],
        relationships: ["Lh2QRYQ2jkRnEI4m", "tlrca4lQsFIZ8IwZ", "tRYvWAQqU7xkpJYu"],
        legacy: ["JQlTpghFQFXDskkS", "IHGdTmOVN1zloqmM", "h9jxuC70RIV2YYod"],
        affiliation: ["Xl7mEaAISq6I8Q9x", "DkdxtOPf0Kk45pIe", "1N106p7YNKKWr7HI"],
        identities: ["LhqLvU4wD2bZEicK", "OAITk7XvPcUBdDih", "Yyi071quFTMjRybK"],
        quirks: ["000XYhjOoHW6hKAP", "P1Z2tq2DiGNUalkD", "bQjrwSHHyHC4BLNc"],
        rumors: ["DOLQckJPOzfE8JzY", "yqA6hSUhfIGURMR2", "6hXWxSEdrjiY7K7f"],
        action: ["OSpHuphKhIOcJy6e", "EdMDbQ2rvj1kjsVw", "P2eGB9bEuZtwAQxq"],
        theme: ["mgGRUu62QCdo0n2Z", "cCXTQZgR8f8d0Ojq", "2KgRpUejv7U6Pjzf"],
        dominion: ["SR2UXvMKVawDqzk4", "AQ1jgsUYuEhA12Ju", "CgfxgI13aErxbXod"],
        dominionLeadership: ["eAqohSRwBWwx7uy5", "A6v2rLoWS3xEAtam", "StGZjdeejoYDZFLN"],
        guild: ["k3ylcTmv45qOhxMM", "39brIk5GOHXK0Gqw", "PDnjZEt9uprBcXoY"],
        fringe: ["mhQqIfHi4ldU6lk3", "UE6b4kAluQqrAGUO", "yjYdyPveqyWUOgwF"],
        nameTemplate: ["9e9c1587cf1c98e1"],
    },
};

const FACTION_CHAT = {
    title: "<h3><strong>Generate Faction (Starsmith)</strong></h3>",
    dominionLabelIncludes: "Dominion",
    /** Checked before guild (e.g. "Fringe Group"). Case-insensitive substring. */
    fringeLabelIncludes: "Fringe",
    guildLabelIncludes: "Guild",
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

/**
 * Starsmith type oracle text sometimes includes empty "()" and trailing spaces.
 * Removes those so Dominion checks, type-detail UUID parsing, and chat Type label stay consistent.
 */
function normalizeFactionTypeRollHtml(raw) {
    return String(raw ?? "")
        .replace(/\(\s*\)/g, "")
        .trim();
}

function normalizeFactionTypeLabel(label) {
    return String(label ?? "")
        .replace(/\(\s*\)/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

function typeLabelMatches(typeLabel, needle) {
    const a = (typeLabel ?? "").toLowerCase();
    const b = (needle ?? "").toLowerCase();
    return b.length > 0 && a.includes(b);
}

/** Text inside `[...]` for `@Compendium[...]{...}`. */
function parseCompendiumLinkBracketInner(linkStr) {
    const open = linkStr.indexOf("[");
    const close = linkStr.indexOf("]");
    if (open === -1 || close === -1 || close <= open) {
        return "";
    }
    return linkStr.slice(open + 1, close).trim();
}

/**
 * Build a Foundry RollTable UUID from bracket inner `pkg.coll.id` (no DocumentType in path).
 * Already-full `Compendium....` strings are returned unchanged.
 */
function bracketInnerToRollTableUuid(inner) {
    const t = (inner ?? "").trim();
    if (!t) {
        return t;
    }
    if (t.startsWith("Compendium.")) {
        return t;
    }
    const parts = t.split(".");
    if (parts.length < 2) {
        return t;
    }
    const id = parts[parts.length - 1];
    const packPath = parts.slice(0, -1).join(".");
    return `Compendium.${packPath}.RollTable.${id}`;
}

/** RollTable document id at end of a ref (bare id or full Compendium UUID). */
function bareDocumentIdFromRef(ref) {
    const r = (ref ?? "").trim();
    if (!r) {
        return r;
    }
    const parts = r.split(".");
    return parts[parts.length - 1];
}

/**
 * Resolve a config entry to a full `Compendium....` uuid: full refs pass through;
 * bare ids use `prefixOverrides[idKey]` or default `rollTablePrefix`.
 */
function resolvedRollTableUuid(oraclePack, ref, idKey = null) {
    const r = (ref ?? "").trim();
    if (r.startsWith("Compendium.")) {
        return r;
    }
    const prefix =
        idKey && oraclePack.prefixOverrides && oraclePack.prefixOverrides[idKey]
            ? oraclePack.prefixOverrides[idKey]
            : oraclePack.rollTablePrefix;
    return prefix + r;
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
// RollTable helpers
// =============================================================================

async function getRollTable(oraclePack, idArray, idKey = null) {
    const ref = randomArrayItem(idArray);
    return fromUuid(resolvedRollTableUuid(oraclePack, ref, idKey));
}

async function rollOnceFromIdArray(oraclePack, idArray, idKey = null) {
    const ref = randomArrayItem(idArray);
    const uuid = resolvedRollTableUuid(oraclePack, ref, idKey);
    const table = await fromUuid(uuid);
    return { id: bareDocumentIdFromRef(ref), text: firstRollText(await table.roll()) };
}

async function rollUniqueRowsSameTable(oraclePack, idArrayKey, count, mapRaw = async (raw) => raw) {
    const idArray = oraclePack.ids[idArrayKey];
    const table = await getRollTable(oraclePack, idArray, idArrayKey);
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

        const inner = parseCompendiumLinkBracketInner(m[0]);
        const tableUuid = bracketInnerToRollTableUuid(inner);
        const uuid = parseTableResultToUUID(m[0]);

        let rowText;
        if (Object.prototype.hasOwnProperty.call(embeddedRolls, uuid)) {
            rowText = embeddedRolls[uuid];
        } else {
            const table = await fromUuid(tableUuid);
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
// Action + Theme compound row
// =============================================================================

function isActionPlusThemeCompound(oraclePack, rawText) {
    const { action, theme } = oraclePack.ids;
    if (!rawText || !/\s+\+\s+/.test(rawText)) {
        return false;
    }
    const hasId = (arr) => arr.some((id) => rawText.includes(id));
    return hasId(action) && hasId(theme);
}

async function resolveActionThemeCompound(oraclePack, rawText) {
    if (!isActionPlusThemeCompound(oraclePack, rawText)) {
        return rawText;
    }
    const actionTable = await getRollTable(oraclePack, oraclePack.ids.action, "action");
    const themeTable = await getRollTable(oraclePack, oraclePack.ids.theme, "theme");
    return `${firstRollText(await actionTable.roll())} ${firstRollText(await themeTable.roll())}`;
}

async function rollTableOneOrTwoTimes(oraclePack, idArrayKey) {
    const idArray = oraclePack.ids[idArrayKey];
    const table = await getRollTable(oraclePack, idArray, idArrayKey);
    const rollCount = Math.floor(Math.random() * 2) + 1;
    const parts = [];
    const mapper = (raw) => resolveActionThemeCompound(oraclePack, raw);
    for (let i = 0; i < rollCount; i++) {
        await rollUniqueTableRow(table, parts, mapper);
    }
    return parts.join(", ");
}

// =============================================================================
// Faction-specific steps
// =============================================================================

/** Random table from `ids[idArrayKey]`, then resolve "Roll twice" like core faction oracles. */
async function rollTypeDetailsRollTwiceOnRandomTable(oraclePack, idArrayKey) {
    const table = await getRollTable(oraclePack, oraclePack.ids[idArrayKey], idArrayKey);
    const rolls = await rollTableResolvingRollTwice(table);
    return rolls.join(", ");
}

async function rollFactionTypeAndDetails(oraclePack, typeRollText) {
    const { ids } = oraclePack;
    const typeSource = normalizeFactionTypeRollHtml(typeRollText);
    const typeLabel = normalizeFactionTypeLabel(parseTableResultToString(typeSource));
    let typeDetails = "";
    let dominionLeadership = "";

    if (typeLabelMatches(typeLabel, FACTION_CHAT.dominionLabelIncludes)) {
        const dominionCount = Math.floor(Math.random() * 3) + 1;
        const dominionParts = await rollUniqueRowsSameTable(oraclePack, "dominion", dominionCount, async (raw) => raw);
        typeDetails = dominionParts.join(", ");
        const leadTable = await getRollTable(oraclePack, ids.dominionLeadership, "dominionLeadership");
        dominionLeadership = firstRollText(await leadTable.roll());
    } else if (typeLabelMatches(typeLabel, FACTION_CHAT.fringeLabelIncludes)) {
        typeDetails = await rollTypeDetailsRollTwiceOnRandomTable(oraclePack, "fringe");
    } else if (typeLabelMatches(typeLabel, FACTION_CHAT.guildLabelIncludes)) {
        typeDetails = await rollTypeDetailsRollTwiceOnRandomTable(oraclePack, "guild");
    } else if (typeSource.includes("@Compendium")) {
        const linkMatch = typeSource.match(/@Compendium\[[^\]]+\](?:\{[^}]*\})?/);
        if (linkMatch) {
            const inner = parseCompendiumLinkBracketInner(linkMatch[0]);
            const tableUuid = bracketInnerToRollTableUuid(inner);
            const table = await fromUuid(tableUuid);
            const typeDetailsRolls = await rollTableResolvingRollTwice(table);
            typeDetails = typeDetailsRolls.join(", ");
        }
    }

    return { typeLabel, typeDetails, dominionLeadership };
}

async function preRollLegacyAffiliationIdentityForName(oraclePack) {
    const { ids } = oraclePack;
    const legacyRoll = await rollOnceFromIdArray(oraclePack, ids.legacy, "legacy");
    const affiliationRoll = await rollOnceFromIdArray(oraclePack, ids.affiliation, "affiliation");
    const identitiesRoll = await rollOnceFromIdArray(oraclePack, ids.identities, "identities");
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
// Main entry
// =============================================================================

async function runFactionGenerator(oraclePack = FACTION_ORACLES) {
    const { ids } = oraclePack;

    const typeTable = await getRollTable(oraclePack, ids.type, "type");
    const typeRollText = firstRollText(await typeTable.roll());

    const { typeLabel, typeDetails, dominionLeadership } = await rollFactionTypeAndDetails(oraclePack, typeRollText);

    const { legacy, affiliation, identities, embeddedRolls } = await preRollLegacyAffiliationIdentityForName(oraclePack);

    const nameTemplateTable = await getRollTable(oraclePack, ids.nameTemplate, "nameTemplate");
    const nameTemplate = firstRollText(await nameTemplateTable.roll());
    const { text: nameResolved } = await resolveNameTemplateWithRolls(nameTemplate, oraclePack, embeddedRolls);

    const influenceTable = await getRollTable(oraclePack, ids.influence, "influence");
    const influence = firstRollText(await influenceTable.roll());

    const projects = await rollTableOneOrTwoTimes(oraclePack, "projects");

    const relationshipsTable = await getRollTable(oraclePack, ids.relationships, "relationships");
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
