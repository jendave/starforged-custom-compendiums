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

const ROLL_TWICE_LABEL = "Roll twice";

function isRollTwiceResult(rawText) {
    const t = (rawText ?? "").trim();
    if (t === ROLL_TWICE_LABEL) return true;
    if (t.includes("@Compendium") || t.includes("{")) {
        return parseTableResultToString(t) === ROLL_TWICE_LABEL;
    }
    return false;
}

/** Guild, Fringe Group (type details), and Relationships tables include a "Roll twice" row. */
async function rollTableResolvingRollTwice(table) {
    const out = [];
    async function addOneResolved() {
        const roll = await table.roll();
        const raw = roll.results[0].text;
        if (isRollTwiceResult(raw)) {
            console.log("rollTableResolvingRollTwice");
            await addOneResolved();
            await addOneResolved();
        } else {
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
    console.log("isActionPlusThemeCompound: " + rawText);
    return actionRoll.results[0].text + " " + themeRoll.results[0].text;
}

/** Projects, Quirks, and Rumors: roll 1–2 times (random), comma-separated. */
async function rollTableOneOrTwoTimes(tableIdArray) {
    const t = await fromUuid(rollTablePrefix + randomArrayItem(tableIdArray));
    const rollCount = Math.floor(Math.random() * 2) + 1;
    const parts = [];
    for (let i = 0; i < rollCount; i++) {
        const r = await t.roll();
        parts.push(await resolveActionThemeCompound(r.results[0].text));
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

let typeDetails = "";
if (typeDetailsArray.length > 0) {
    table = await fromUuid(rollTablePrefix + randomArrayItem(typeDetailsArray));
    let typeDetailsRolls = await rollTableResolvingRollTwice(table);
    typeDetails = typeDetailsRolls.join("<br>");
}

let dominion = "";
let dominionLeadership = "";

if (parseTableResultToString(type).includes("Dominion")) {
    table = await fromUuid(rollTablePrefix + randomArrayItem(dominionArray));
    const dominionRollCount = Math.floor(Math.random() * 3) + 1;
    const dominionParts = [];
    for (let i = 0; i < dominionRollCount; i++) {
        roll = await table.roll();
        dominionParts.push(roll.results[0].text);
    }
    dominion = dominionParts.join(", ");

    table = await fromUuid(rollTablePrefix + randomArrayItem(dominionLeadershipArray));
    roll = await table.roll();
    dominionLeadership = roll.results[0].text;
}

table = await fromUuid(rollTablePrefix + randomArrayItem(influenceArray));
roll = await table.roll();
let influence = roll.results[0].text;

let projects = await rollTableOneOrTwoTimes(projectsArray);

table = await fromUuid(rollTablePrefix + randomArrayItem(relationshipsArray));
let relationshipsRolls = await rollTableResolvingRollTwice(table);
let relationships = relationshipsRolls.join("<br>");

table = await fromUuid(rollTablePrefix + randomArrayItem(legacyArray));
roll = await table.roll();
let legacy = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(affiliationArray));
roll = await table.roll();
let affiliation = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(identitiesArray));
roll = await table.roll();
let identities = roll.results[0].text;

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
let message = "<br>Type: " + typeDisplay + "<br><br> Type Details:  " + typeDetails + "<br><br>" + (dominion ? "Dominion:  " + dominion + "<br><br>" : "") + (dominionLeadership ? "Dominion Leadership:  " + dominionLeadership + "<br><br>" : "") + " Influence:  " + influence + "<br><br> Projects:  " + projects + "<br><br> Relationships:  " + relationships + "<br><br> Legacy:  " + legacy + "<br><br> Affiliation:  " + affiliation + "<br><br> Identities:  " + identities + "<br><br> Quirks:  " + quirks + "<br><br> Rumors:  " + rumors;

// Print the message
printMessage(title + message);
