// Macro by David Hudson under the MIT License.
//
// Sundered Isles faction generator: rolls oracle tables from FACTION_ORACLES and posts a chat message.
// Edit FACTION_ORACLES.ids plus the maps below (labels, type-gated keys, multi-roll counts).

// =============================================================================
// Configuration — oracle ids, labels, and roll behavior
// =============================================================================

const FACTION_ORACLES = {
    rollTablePrefix: "Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.",
    ids: {
        types: ["b4383db857ca3b34"],
        influences: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.66110f9a7d08cf74"],
        relationships: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.59b86d78f3bdb745"],
        societychronicles: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.357c11f1cb736462"],
        societyoverseers: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.41d28fe3103bc730"],
        societytouchstones: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.19b1c62d7f0845c5"],
        organizationtypes: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.fbc5f237d5a0c1bc"],
        organizationmethods: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.c5abc14b60ea728e"],
        organizationsecrets: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.d94642748c2feb36"],
        imperialleadership: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.d376b90ebbc34680"],
        imperialtactics: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.8123f6aac4c325b9"],
        imperialvulnerabilities: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.f5dad7c50066c672"],
        cursedfactionrole: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.0001ccabdf0d3b5a"],
        cursedfactionaspects: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.0c4ea61819a3090b"],
        namecultures: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.1193319d6bd1d1a2"],
        namesocietyidentities: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.93286483fc9f9a1d"],
        nameempireidentities: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.8ff995bc16f63b1a"],
        nameorganizationidentities: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.7df40b48bb2f5d8d"],
        themetypes: ["Compendium.foundry-ironsworn.sunderedislesoracles.RollTable.20de0f9b4cbd77d5"],
    },
};

/** Chat heading for the first line; one <br> is inserted after this before body fields. */
const FACTION_CHAT = {
    title: "<h3><strong>Generate Faction (Sundered Isles)</strong></h3>",
};

/** User-visible labels for each oracle key in FACTION_ORACLES.ids (and “types”). */
const FACTION_SI_LABELS = {
    types: "Faction Type",
    influences: "Faction Influence",
    relationships: "Faction Relationship",
    societychronicles: "Society Chronicles",
    societyoverseers: "Society Overseers",
    societytouchstones: "Society Touchstones",
    organizationtypes: "Organization Type",
    organizationmethods: "Organization Methods",
    organizationsecrets: "Organization Secrets",
    imperialleadership: "Imperial Leadership",
    imperialtactics: "Imperial Tactics",
    imperialvulnerabilities: "Imperial Vulnerabilities",
    cursedfactionrole: "Cursed Faction Role",
    cursedfactionaspects: "Cursed Faction Aspects",
    namecultures: "Faction Name: Culture",
    namesocietyidentities: "Faction Name: Society Identity",
    nameempireidentities: "Faction Name: Empire Identity",
    nameorganizationidentities: "Faction Name: Organization Identity",
    themetypes: "Faction Name: Themes",
};

/** Canonical faction type strings from the types table (used for gated oracles). */
const FACTION_TYPE_NAMES = ["Society", "Organization", "Empire"];

/** Detail-table keys rolled only when the resolved type matches. */
const FACTION_SI_TYPE_DETAIL_KEYS = {
    Society: ["societychronicles", "societyoverseers", "societytouchstones"],
    Organization: ["organizationtypes", "organizationmethods", "organizationsecrets"],
    Empire: ["imperialleadership", "imperialtactics", "imperialvulnerabilities"],
};

/** Name-identity key rolled only for that type (after culture + themetypes in the suffix block). */
const FACTION_SI_TYPE_NAME_IDENTITY_KEYS = {
    Society: ["namesocietyidentities"],
    Organization: ["nameorganizationidentities"],
    Empire: ["nameempireidentities"],
};

/** Fixed tail of the roll order (cursed → name pipeline). */
const FACTION_SI_ORACLE_ORDER_SUFFIX = [
    "cursedfactionrole",
    "cursedfactionaspects",
    "namecultures",
    "themetypes",
];

/**
 * These oracles: run several independent draws (min–max inclusive).
 * Each draw expands "Roll twice" on that table; formatted results are comma-separated and de-duped.
 */
const FACTION_SI_ORACLE_ROLL_COUNT = {
    societychronicles: { min: 2, max: 3 },
    societytouchstones: { min: 1, max: 3 },
    organizationmethods: { min: 1, max: 2 },
    organizationsecrets: { min: 1, max: 2 },
    imperialtactics: { min: 2, max: 3 },
    imperialvulnerabilities: { min: 1, max: 2 },
    cursedfactionaspects: { min: 1, max: 2 },
};

const ROLL_TWICE_LABEL = "Roll twice";
const ROLL_TWICE_MAX_UNIQUE_ATTEMPTS = 200;

// =============================================================================
// Chat
// =============================================================================

function printMessage(message) {
    const chatData = { content: message };
    ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));
    ChatMessage.create(chatData, {});
}

// =============================================================================
// Random helpers
// =============================================================================

function randomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function randomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function firstRollText(roll) {
    return roll.results[0].text;
}

// =============================================================================
// Parsings table cell HTML (Compendium links, {labels})
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
// Text normalization
// =============================================================================

function stripRollTextForCompare(s) {
    return (s ?? "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function rollResultTextsEqual(a, b) {
    return stripRollTextForCompare(a) === stripRollTextForCompare(b);
}

function pushUniqueLine(lines, line) {
    if (!lines.some((x) => rollResultTextsEqual(x, line))) {
        lines.push(line);
    }
}

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

/** Plain visible label from a row: {…} text or stripped HTML. */
function plainLabelFromTableRow(raw) {
    let s = stripRollTextForCompare(parseTableResultToString(raw ?? ""));
    if (!s) {
        s = stripRollTextForCompare(raw ?? "");
    }
    return s;
}

// =============================================================================
// "Roll twice" — detection and recursive single-draw collection
// =============================================================================

function isRollTwiceResult(rawText) {
    const plain = stripRollTextForCompare(rawText);
    if (plain === ROLL_TWICE_LABEL || plain.startsWith(ROLL_TWICE_LABEL)) {
        return true;
    }
    const t = (rawText ?? "").trim();
    if (t.includes("@Compendium") || t.includes("{")) {
        const label = parseTableResultToString(t);
        if (label === ROLL_TWICE_LABEL) {
            return true;
        }
        const labelPlain = stripRollTextForCompare(label);
        if (labelPlain.startsWith(ROLL_TWICE_LABEL)) {
            return true;
        }
    }
    return false;
}

/**
 * One logical draw on `table`: any "Roll twice" becomes two more draws (recursive).
 * Raw results in the returned array are de-duplicated by rollResultTextsEqual.
 */
async function collectSingleDrawRawsResolvingRollTwice(table) {
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
// RollTable documents
// =============================================================================

function resolveTableUuid(oraclePack, tableRef) {
    const s = String(tableRef ?? "").trim();
    if (s.startsWith("Compendium.")) {
        return s;
    }
    return oraclePack.rollTablePrefix + s;
}

async function getRollTable(oraclePack, idArray) {
    return fromUuid(resolveTableUuid(oraclePack, randomArrayItem(idArray)));
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
    if (!usedDisplayValues.some((x) => rollResultTextsEqual(x, display))) {
        usedDisplayValues.push(display);
    }
    return display;
}

// =============================================================================
// Embedded @Compendium links inside a template string
// =============================================================================

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
            rowText = await rollUniqueTableRow(table, seenForTable, async (r) => r);
        }

        out += rowText;
        lastIndex = m.index + m[0].length;
    }

    out += normalizeNameTemplateLiterals(text.slice(lastIndex));
    return { text: out };
}

// =============================================================================
// Format one oracle row for chat (by oracle key)
// =============================================================================

function normalizeFactionTypeFromRoll(raw) {
    const s = plainLabelFromTableRow(raw);
    const lower = s.toLowerCase();
    for (const name of FACTION_TYPE_NAMES) {
        const n = name.toLowerCase();
        if (lower === n || new RegExp(`\\b${n}\\b`).test(lower)) {
            return name;
        }
    }
    return s;
}

async function formatOracleResultForChat(oraclePack, raw, oracleKey) {
    if (oracleKey === "types") {
        return normalizeFactionTypeFromRoll(raw);
    }
    if (oracleKey === "themetypes") {
        return plainLabelFromTableRow(raw);
    }
    if ((raw ?? "").includes("@Compendium")) {
        const { text } = await resolveNameTemplateWithRolls(raw, oraclePack, {});
        return sanitizeChatFieldHtml(text);
    }
    return sanitizeChatFieldHtml(parseTableResultToString(raw));
}

async function formatRawsToDedupedCommaLine(oraclePack, raws, oracleKey) {
    const lines = [];
    for (const raw of raws) {
        const line = await formatOracleResultForChat(oraclePack, raw, oracleKey);
        pushUniqueLine(lines, line);
    }
    return lines.join(", ");
}

async function rollOracleSlotToCommaLine(oraclePack, table, oracleKey) {
    const raws = await collectSingleDrawRawsResolvingRollTwice(table);
    return formatRawsToDedupedCommaLine(oraclePack, raws, oracleKey);
}

/**
 * Roll oracle `key`: either multi-draw (FACTION_SI_ORACLE_ROLL_COUNT) or one slot with roll-twice expansion.
 */
async function rollSunderedIslesOracleForChat(oraclePack, key) {
    const idArray = oraclePack.ids[key];
    if (!idArray?.length) {
        return "—";
    }
    const table = await getRollTable(oraclePack, idArray);
    const multiSpec = FACTION_SI_ORACLE_ROLL_COUNT[key];
    if (multiSpec) {
        const targetCount = randomIntInclusive(multiSpec.min, multiSpec.max);
        const parts = [];
        for (let inv = 0; inv < targetCount; inv++) {
            const raws = await collectSingleDrawRawsResolvingRollTwice(table);
            for (const raw of raws) {
                const line = await formatOracleResultForChat(oraclePack, raw, key);
                pushUniqueLine(parts, line);
            }
        }
        return parts.join(", ");
    }
    return rollOracleSlotToCommaLine(oraclePack, table, key);
}

// =============================================================================
// Roll order and main
// =============================================================================

function factionOracleKeysAfterType(typeText) {
    const detailKeys = FACTION_SI_TYPE_DETAIL_KEYS[typeText] ?? [];
    const nameIdentityKeys = FACTION_SI_TYPE_NAME_IDENTITY_KEYS[typeText] ?? [];
    return [
        "influences",
        "relationships",
        ...detailKeys,
        ...FACTION_SI_ORACLE_ORDER_SUFFIX,
        ...nameIdentityKeys,
    ];
}

async function runFactionGenerator(oraclePack = FACTION_ORACLES) {
    const chunks = [];
    const typeText = await rollSunderedIslesOracleForChat(oraclePack, "types");
    chunks.push(`<strong>${FACTION_SI_LABELS.types}:</strong> ${typeText}`);

    for (const key of factionOracleKeysAfterType(typeText)) {
        if (!oraclePack.ids[key]?.length) {
            continue;
        }
        const label = FACTION_SI_LABELS[key] ?? key;
        const text = await rollSunderedIslesOracleForChat(oraclePack, key);
        chunks.push(`<br><br><strong>${label}:</strong> ${text}`);
    }
    printMessage(`${FACTION_CHAT.title}<br>${chunks.join("")}`);
}

await runFactionGenerator(FACTION_ORACLES);
