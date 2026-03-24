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

let table = await fromUuid(rollTablePrefix + randomArrayItem(typeArray));
let roll = await table.roll();
let type = roll.results[0].text;

let typeDetailsArray = [];
if (type.includes("@Compendium")) {
    typeDetailsArray = [parseTableResultToUUID(type)];
}


//let typeDetailsTable2 = "";
console.log("Type: " + parseTableResultToString(type));
console.log("Type Details Array: " + typeDetailsArray);

// switch (type) {
//     case "Dominion":
//         typeDetailsTable = dominionArray;
//         typeDetailsTable2 = dominionLeadershipArray;
//         break;
//     case "Guild":
//         typeDetailsTable = guildArray;
//         break;
//     case "Fringe Group":
//         typeDetailsTable = fringeGroupArray;
//         break;
//     default:
//         typeDetailsTable = "";
// }

table = await fromUuid(rollTablePrefix + randomArrayItem(typeDetailsArray));
roll = await table.roll();
let typeDetails = roll.results[0].text;

console.log("Type Details: " + typeDetails);

table = await fromUuid(rollTablePrefix + randomArrayItem(influenceArray));
roll = await table.roll();
let influence = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(projectsArray));
roll = await table.roll();
let projects = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(relationshipsArray));
roll = await table.roll();
let relationships = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(legacyArray));
roll = await table.roll();
let legacy = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(affiliationArray));
roll = await table.roll();
let affiliation = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(identitiesArray));
roll = await table.roll();
let identities = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(quirksArray));
roll = await table.roll();
let quirks = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(rumorsArray));
roll = await table.roll();
let rumors = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(actionArray));
roll = await table.roll();
let action = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(themeArray));
roll = await table.roll();
let theme = roll.results[0].text;

let title = "<h3><strong>Generate Faction</strong></h3>";
let message = "<br>Type: " + parseTableResultToString(type) + "<br><br> Type Details:  " + typeDetails + "<br><br> Influence:  " + influence + "<br><br> Projects:  " + projects + "<br><br> Relationships:  " + relationships + "<br><br> Legacy:  " + legacy + "<br><br> Affiliation:  " + affiliation + "<br><br> Identities:  " + identities + "<br><br> Quirks:  " + quirks + "<br><br> Rumors:  " + rumors;

// Print the message
printMessage(title + message);
