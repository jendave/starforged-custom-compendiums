// Macro by David Hudson under the MIT License.

function printMessage(message) {
    let chatData = { content: message };
    ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));
    ChatMessage.create(chatData, {})
};

function randomArrayItem(array) {
    const index = (Math.floor(Math.random() * array.length));
    return array[index];
}

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
    if (t === ROLL_TWICE_LABEL) return true;
    if (t.includes("@Compendium") || t.includes("{")) {
        return parseTableResultToString(t) === ROLL_TWICE_LABEL;
    }
    return false;
}

/** Guild, Fringe Group (type details), and Relationships tables include a "Roll twice" row. Multiple resolved rows on the same table are never duplicates (best effort). */
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

/** Turn italic "of the" wrappers into plain text; other markup is unchanged. */
function normalizeNameTemplateLiterals(s) {
    const unwrapOfThe = (match, inner) => {
        const t = inner.replace(/\s+/g, " ").trim();
        return t.toLowerCase() === "of the" ? "of the" : match;
    };
    return s
        .replace(/<\s*em\s*>([\s\S]*?)<\s*\/\s*em\s*>/gi, unwrapOfThe)
        .replace(/<\s*i\s*>([\s\S]*?)<\s*\/\s*i\s*>/gi, unwrapOfThe);
}

/** Strip leading/trailing br tags; remove p element wrappers from Foundry table HTML. */
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

/** Replace each compendium link with a table roll; literals pass through normalizeNameTemplateLiterals. */
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
        const t = await fromUuid(uuidPrefix + uuid);
        if (!seenByRollTableUuid.has(uuid)) seenByRollTableUuid.set(uuid, []);
        const seenForTable = seenByRollTableUuid.get(uuid);
        let rowText;
        let gotUnique = false;
        for (let attempt = 0; attempt < ROLL_TWICE_MAX_UNIQUE_ATTEMPTS && !gotUnique; attempt++) {
            const r = await t.roll();
            rowText = r.results[0].text;
            if (!seenForTable.some((prev) => rollResultTextsEqual(prev, rowText))) {
                seenForTable.push(rowText);
                gotUnique = true;
            }
        }
        if (!gotUnique) {
            const r = await t.roll();
            rowText = r.results[0].text;
            seenForTable.push(rowText);
        }
        out += rowText;
        if (uuid === legacyId) legacyParts.push(rowText);
        else if (uuid === affiliationId) affiliationParts.push(rowText);
        else if (uuid === identitiesId) identitiesParts.push(rowText);
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

function isActionPlusThemeCompound(rawText) {
    if (!rawText || !/\s+\+\s+/.test(rawText)) return false;
    return rawText.includes(actionArray[0]) && rawText.includes(themeArray[0]);
}

async function resolveActionThemeCompound(rawText) {
    if (!isActionPlusThemeCompound(rawText)) return rawText;
    const actionTable = await fromUuid(rollTablePrefix + randomArrayItem(actionArray));
    const themeTable = await fromUuid(rollTablePrefix + randomArrayItem(themeArray));
    const actionRoll = await actionTable.roll();
    const themeRoll = await themeTable.roll();
    return actionRoll.results[0].text + " " + themeRoll.results[0].text;
}

/** Projects, Quirks, and Rumors: roll 1–2 times (random), comma-separated; no duplicate results when rolled twice. */
async function rollTableOneOrTwoTimes(tableIdArray) {
    const t = await fromUuid(rollTablePrefix + randomArrayItem(tableIdArray));
    const rollCount = Math.floor(Math.random() * 2) + 1;
    const parts = [];
    for (let i = 0; i < rollCount; i++) {
        let resolved;
        let placed = false;
        for (let attempt = 0; attempt < ROLL_TWICE_MAX_UNIQUE_ATTEMPTS && !placed; attempt++) {
            const r = await t.roll();
            resolved = await resolveActionThemeCompound(r.results[0].text);
            if (!parts.some((p) => rollResultTextsEqual(p, resolved))) {
                parts.push(resolved);
                placed = true;
            }
        }
        if (!placed) {
            const r = await t.roll();
            resolved = await resolveActionThemeCompound(r.results[0].text);
            parts.push(resolved);
        }
    }
    return parts.join(", ");
}

let table = await fromUuid(rollTablePrefix + randomArrayItem(typeArray));
let roll = await table.roll();
let type = roll.results[0].text;

let typeDetailsArray = [];
if (type.includes("@Compendium")) {
    typeDetailsArray.push(parseTableResultToUUID(type));
}

let dominionLeadership = "";
let typeDetails = "";

if (parseTableResultToString(type).includes("Dominion")) {
    table = await fromUuid(rollTablePrefix + randomArrayItem(dominionArray));
    const dominionRollCount = Math.floor(Math.random() * 3) + 1;
    const dominionParts = [];
    for (let i = 0; i < dominionRollCount; i++) {
        let placed = false;
        for (let attempt = 0; attempt < ROLL_TWICE_MAX_UNIQUE_ATTEMPTS && !placed; attempt++) {
            roll = await table.roll();
            const txt = roll.results[0].text;
            if (!dominionParts.some((p) => rollResultTextsEqual(p, txt))) {
                dominionParts.push(txt);
                placed = true;
            }
        }
        if (!placed) {
            roll = await table.roll();
            dominionParts.push(roll.results[0].text);
        }
    }
    typeDetails = dominionParts.join(", ");

    table = await fromUuid(rollTablePrefix + randomArrayItem(dominionLeadershipArray));
    roll = await table.roll();
    dominionLeadership = roll.results[0].text;
} else if (typeDetailsArray.length > 0) {
    table = await fromUuid(rollTablePrefix + randomArrayItem(typeDetailsArray));
    let typeDetailsRolls = await rollTableResolvingRollTwice(table);
    typeDetails = typeDetailsRolls.join(", ");
}

table = await fromUuid(rollTablePrefix + randomArrayItem(nameTemplateArray));
roll = await table.roll();
let nameTemplate = roll.results[0].text;
let nameResolvedResult = await resolveNameTemplateWithRolls(nameTemplate, rollTablePrefix);
let nameResolved = nameResolvedResult.text;
let legacy = nameResolvedResult.legacy;
let affiliation = nameResolvedResult.affiliation;
let identities = nameResolvedResult.identities;

table = await fromUuid(rollTablePrefix + randomArrayItem(influenceArray));
roll = await table.roll();
let influence = roll.results[0].text;

let projects = await rollTableOneOrTwoTimes(projectsArray);

table = await fromUuid(rollTablePrefix + randomArrayItem(relationshipsArray));
let relationshipsRolls = await rollTableResolvingRollTwice(table);
let relationships = relationshipsRolls.join("<br>");

let quirks = await rollTableOneOrTwoTimes(quirksArray);

let rumors = await rollTableOneOrTwoTimes(rumorsArray);

table = await fromUuid(rollTablePrefix + randomArrayItem(actionArray));
roll = await table.roll();
let action = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(themeArray));
roll = await table.roll();
let theme = roll.results[0].text;

let typeDisplay = parseTableResultToString(type);
let title = "<h3><strong>Generate Faction</strong></h3>";
let nameForMessage = sanitizeChatFieldHtml(nameResolved);
let message = "<br>Name: " + nameForMessage + "<br><br>Type: " + typeDisplay + "<br><br> Type Details:  " + typeDetails + "<br><br>" + (dominionLeadership ? "Dominion Leadership:  " + dominionLeadership + "<br><br>" : "") + " Influence:  " + influence + "<br><br> Projects:  " + projects + "<br><br> Relationships:  " + relationships + "<br><br>" + (legacy ? " Legacy:  " + legacy + "<br><br>" : "") + (affiliation ? " Affiliation:  " + affiliation + "<br><br>" : "") + (identities ? " Identities:  " + identities + "<br><br>" : "") + " Quirks:  " + quirks + "<br><br> Rumors:  " + rumors;

// Print the message
printMessage(title + message);