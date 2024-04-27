// Macro by David Hudson under the MIT License.

function printMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
}

let table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.08527c8cf3635799");
let roll = await table.roll();
let environment = roll.results[0].text;

table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.62082688c94188a7");
roll = await table.roll();
if (roll.roll.total == 100) {
    table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.ef130923fb734a55");
    roll = await table.roll();
}
let scale = roll.results[0].text;

let scaleTable = "";

switch (scale) {
    case "Minuscule (bug-sized)":
        scaleTable = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.42Zc0gU0LGWRPCK1";
        break;
    case "Tiny (rodent-sized)":
        scaleTable = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.a94dwIipMGlDbBrr";
        break;
    case "Small (dog-sized)":
        scaleTable = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.1fPKhdZE2joyFZlh";
        break;
    case "Medium (person-sized)":
        scaleTable = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.VPpaBLJpdO9rW0of";
        break;
    case "Large (vehicle-sized)":
        scaleTable = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.8An6TDVvqcZ1p9au";
        break;
    case "Huge (whale-sized)":
        scaleTable = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.x3MGiXMGrA6MGHnW";
        break;
    case "Titanic (hill-sized)":
        scaleTable = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.dBJnzg3oNOLGixbD";
        break;
    case "Colossal (mountain-sized)":
        scaleTable = "Compendium.starforged-custom-oracles.starforgedcustomoracless.RollTable.CMaiD8e3YGqYKd40";
        break;
    case "Vast (planet-sized)":
        scaleTable = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.vIEK7JtQpn1QQSzd";
        break;
    default:
        scaleTable = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.VPpaBLJpdO9rW0of";
}

table = await fromUuid(scaleTable);
roll = await table.roll();
let rank = roll.results[0].text;

let creatureFormTable = "";

switch (environment) {
    case "Space":
        creatureFormTable = "Compendium.foundry-ironsworn.starforgedoracles.RollTable.7971676f12fe9f85";
        break;
    case "Interior":
        creatureFormTable = "Compendium.foundry-ironsworn.starforgedoracles.RollTable.34cf9b7731ec35df";
        break;
    case "Land":
        creatureFormTable = "Compendium.foundry-ironsworn.starforgedoracles.RollTable.5dee17188d87278c";
        break;
    case "Liquid":
        creatureFormTable = "Compendium.foundry-ironsworn.starforgedoracles.RollTable.3e5b84fccec6c789";
        break;
    case "Air":
        creatureFormTable = "Compendium.foundry-ironsworn.starforgedoracles.RollTable.16fbeb54dfe52e19";
        break;
    default:
        creatureFormTable = "Compendium.foundry-ironsworn.starforgedoracles.RollTable.5dee17188d87278c";
}

table = await fromUuid(creatureFormTable);
roll = await table.roll();
let basicForm = roll.results[0].text;

table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.807a6b963f72d7e5");
roll = await table.roll();
let firstLook1 = roll.results[0].text;

table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.807a6b963f72d7e5");
roll = await table.roll();
let firstLook2 = roll.results[0].text;

table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.923af7927992abad");
roll = await table.roll();
let encounteredBehavior = roll.results[0].text;

table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.b9f9a0434c89daac");
roll = await table.roll();
let creatureAspect1 = roll.results[0].text;

table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.b9f9a0434c89daac");
roll = await table.roll();
let creatureAspect2 = roll.results[0].text;

let title = "<h3><strong>Generate Creature</strong></h3>";
let message = " Environment: " + environment + "<br> Scale:  " + scale + "<br> Rank:  " + rank + " <br> Basic Form: " + basicForm + " <br> First Look 1: " + firstLook1 + " <br> First Look 2: " + firstLook2 + " <br> Encountered Behavior:  " + encounteredBehavior + " <br> Creature Aspect 1: " + creatureAspect1 + " <br> Creature Aspect 2: " + creatureAspect2;

// Print the message
printMessage(title + message);