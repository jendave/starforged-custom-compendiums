// Macro by David Hudson under the MIT License.

// -----------------------------------------------------------------------------
// Chat
// -----------------------------------------------------------------------------

function printMessage(message) {
    const chatData = { content: message };
    ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));
    ChatMessage.create(chatData, {});
}

function randomArrayItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// -----------------------------------------------------------------------------
// Compendium / table result parsing (Foundry enriched links)
// -----------------------------------------------------------------------------

/** Document id from `@Compendium[path.to.id]{Label}`-style text (id after last dot in brackets). */
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

/** Display label from `{Label}` suffix, if present. */
function parseTableResultToString(result) {
    const openBrace = result.indexOf("{");
    const closeBrace = result.indexOf("}");
    if (openBrace === -1 || closeBrace === -1 || closeBrace <= openBrace) {
        return result;
    }
    return result.slice(openBrace + 1, closeBrace);
}

// -----------------------------------------------------------------------------
// Comparing roll rows (HTML-aware, so duplicates are detected after strip)
// -----------------------------------------------------------------------------

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

/**
 * Rolls until `raw` maps to a display string not already in `usedDisplayValues`, then appends it.
 * Used for dominion bundles, name-template links, and projects/quirks/rumors (with a mapper).
 */
async function rollUniqueTableRow(table, usedDisplayValues, mapRawToDisplay = async (raw) => raw) {
    for (let attempt = 0; attempt < ROLL_TWICE_MAX_UNIQUE_ATTEMPTS; attempt++) {
        const raw = (await table.roll()).results[0].text;
        const display = await mapRawToDisplay(raw);
        if (!usedDisplayValues.some((x) => rollResultTextsEqual(x, display))) {
            usedDisplayValues.push(display);
            return display;
        }
    }
    const raw = (await table.roll()).results[0].text;
    const display = await mapRawToDisplay(raw);
    usedDisplayValues.push(display);
    return display;
}

/**
 * Guild / Fringe / Relationships: "Roll twice" expands recursively.
 * Resolved rows are de-duplicated when the same table produced them.
 */
async function rollTableResolvingRollTwice(table) {
    const out = [];

    async function addOneResolved() {
        let raw = null;
        let placed = false;
        for (let attempt = 0; attempt < ROLL_TWICE_MAX_UNIQUE_ATTEMPTS && !placed; attempt++) {
            const roll = await table.roll();
            raw = roll.results[0].text;
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

// -----------------------------------------------------------------------------
// Oracle pack: RollTable document ids (Compendium.foundry-ironsworn.starforgedoracles.RollTable.<id>)
// -----------------------------------------------------------------------------

const rollTablePrefix = "Compendium.foundry-ironsworn.starforgedoracles.RollTable.";

const typeArray = ["9a3e1b0020e66ddb"];
const influenceArray = ["5f8eb805b526f608"];
const projectsArray = ["0d4433612382146d"];
const relationshipsArray = ["7c48ac6e6d1ff769"];
const legacyArray = ["1bc0d594892867ed"];
const affiliationArray = ["b6808ae6711d2c7b"];
const identitiesArray = ["4873d9b03e06e901"];
const quirksArray = ["fddeddbbad1bc62a"];
const rumorsArray = ["cfac08ca2345cbed"];
const actionArray = ["b347a87fb81a3abb"];
const themeArray = ["0c5ce82c7adbb4e2"];
const dominionArray = ["e6552ca1c08225e6"];
const dominionLeadershipArray = ["a57014c9aabe315a"];
const guildArray = ["da3a6351fff54ef4"];
const fringeGroupArray = ["f3403e14e9e6bd71"];
const nameTemplateArray = ["9e9c1587cf1c98e1"];

function rollTableUuid(idArray) {
    return rollTablePrefix + randomArrayItem(idArray);
}

// -----------------------------------------------------------------------------
// Name template (HTML between oracle links + per-link rolls)
// -----------------------------------------------------------------------------

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

async function resolveNameTemplateWithRolls(text, uuidPrefix) {
    const linkRe = /@Compendium\[[^\]]+\](?:\{[^}]*\})?/g;
    const legacyId = legacyArray[0];
    const affiliationId = affiliationArray[0];
    const identitiesId = identitiesArray[0];

    const legacyParts = [];
    const affiliationParts = [];
    const identitiesParts = [];
    const seenByRollTableUuid = new Map();

    let out = "";
    let lastIndex = 0;
    let m;

    while ((m = linkRe.exec(text)) !== null) {
        if (m.index > lastIndex) {
            out += normalizeNameTemplateLiterals(text.slice(lastIndex, m.index));
        }

        const uuid = parseTableResultToUUID(m[0]);
        const table = await fromUuid(uuidPrefix + uuid);
        if (!seenByRollTableUuid.has(uuid)) {
            seenByRollTableUuid.set(uuid, []);
        }
        const seenForTable = seenByRollTableUuid.get(uuid);
        const rowText = await rollUniqueTableRow(table, seenForTable, async (raw) => raw);

        out += rowText;
        if (uuid === legacyId) {
            legacyParts.push(rowText);
        } else if (uuid === affiliationId) {
            affiliationParts.push(rowText);
        } else if (uuid === identitiesId) {
            identitiesParts.push(rowText);
        }

        lastIndex = m.index + m[0].length;
    }

    out += normalizeNameTemplateLiterals(text.slice(lastIndex));
    return {
        text: out,
        legacy: legacyParts.join(", "),
        affiliation: affiliationParts.join(", "),
        identities: identitiesParts.join(", "),
    };
}

// -----------------------------------------------------------------------------
// Action + Theme placeholder row on some tables
// -----------------------------------------------------------------------------

function isActionPlusThemeCompound(rawText) {
    if (!rawText || !/\s+\+\s+/.test(rawText)) {
        return false;
    }
    return rawText.includes(actionArray[0]) && rawText.includes(themeArray[0]);
}

async function resolveActionThemeCompound(rawText) {
    if (!isActionPlusThemeCompound(rawText)) {
        return rawText;
    }
    const actionTable = await fromUuid(rollTableUuid(actionArray));
    const themeTable = await fromUuid(rollTableUuid(themeArray));
    const actionRoll = await actionTable.roll();
    const themeRoll = await themeTable.roll();
    return actionRoll.results[0].text + " " + themeRoll.results[0].text;
}

/** 1–2 rolls on the same table, comma-separated; second row never duplicates the first (best effort). */
async function rollTableOneOrTwoTimes(tableIdArray) {
    const table = await fromUuid(rollTableUuid(tableIdArray));
    const rollCount = Math.floor(Math.random() * 2) + 1;
    const parts = [];
    for (let i = 0; i < rollCount; i++) {
        await rollUniqueTableRow(table, parts, resolveActionThemeCompound);
    }
    return parts.join(", ");
}

// -----------------------------------------------------------------------------
// Main macro
// -----------------------------------------------------------------------------

let table = await fromUuid(rollTableUuid(typeArray));
let roll = await table.roll();
let type = roll.results[0].text;

let typeDetailsArray = [];
if (type.includes("@Compendium")) {
    typeDetailsArray.push(parseTableResultToUUID(type));
}

let dominionLeadership = "";
let typeDetails = "";

const typeLabel = parseTableResultToString(type);

if (typeLabel.includes("Dominion")) {
    table = await fromUuid(rollTableUuid(dominionArray));
    const dominionRollCount = Math.floor(Math.random() * 3) + 1;
    const dominionParts = [];
    for (let i = 0; i < dominionRollCount; i++) {
        await rollUniqueTableRow(table, dominionParts, async (raw) => raw);
    }
    typeDetails = dominionParts.join(", ");

    table = await fromUuid(rollTableUuid(dominionLeadershipArray));
    roll = await table.roll();
    dominionLeadership = roll.results[0].text;
} else if (typeDetailsArray.length > 0) {
    table = await fromUuid(rollTableUuid(typeDetailsArray));
    const typeDetailsRolls = await rollTableResolvingRollTwice(table);
    typeDetails = typeDetailsRolls.join(", ");
}

table = await fromUuid(rollTableUuid(nameTemplateArray));
roll = await table.roll();
const nameTemplate = roll.results[0].text;
const nameResolvedResult = await resolveNameTemplateWithRolls(nameTemplate, rollTablePrefix);
const nameResolved = nameResolvedResult.text;
const legacy = nameResolvedResult.legacy;
const affiliation = nameResolvedResult.affiliation;
const identities = nameResolvedResult.identities;

table = await fromUuid(rollTableUuid(influenceArray));
roll = await table.roll();
const influence = roll.results[0].text;

const projects = await rollTableOneOrTwoTimes(projectsArray);

table = await fromUuid(rollTableUuid(relationshipsArray));
const relationshipsRolls = await rollTableResolvingRollTwice(table);
const relationships = relationshipsRolls.join("<br>");

const quirks = await rollTableOneOrTwoTimes(quirksArray);
const rumors = await rollTableOneOrTwoTimes(rumorsArray);

const title = "<h3><strong>Generate Faction</strong></h3>";
const nameForMessage = sanitizeChatFieldHtml(nameResolved);

const messageSections = [
    `<br>Name: ${nameForMessage}`,
    `<br><br>Type: ${typeLabel}`,
    `<br><br> Type Details:  ${typeDetails}`,
];

if (dominionLeadership) {
    messageSections.push(`<br><br>Dominion Leadership:  ${dominionLeadership}`);
}

messageSections.push(
    `<br><br> Influence:  ${influence}`,
    `<br><br> Projects:  ${projects}`,
    `<br><br> Relationships:  ${relationships}`,
);

if (legacy) {
    messageSections.push(`<br><br> Legacy:  ${legacy}`);
}
if (affiliation) {
    messageSections.push(`<br><br> Affiliation:  ${affiliation}`);
}
if (identities) {
    messageSections.push(`<br><br> Identities:  ${identities}`);
}

messageSections.push(`<br><br> Quirks:  ${quirks}`, `<br><br> Rumors:  ${rumors}`);

const message = messageSections.join("");

printMessage(title + message);
