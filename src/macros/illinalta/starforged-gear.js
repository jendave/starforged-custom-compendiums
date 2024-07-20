// Macro by David Hudson under the MIT License.

// [Background]’s [Attribute] [Object]: [History]

function printMessage(message) {
    let chatData = { content: message};
    ChatMessage.applyRollMode(chatData, game.settings.get("core","rollMode"));
    ChatMessage.create(chatData, {})
};

let table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.P0Jvpir9JOuExcpr");
let roll = await table.roll();
let background = roll.results[0].text;

table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.sa1junIzBGFDG59Q");
roll = await table.roll();
let attribute = roll.results[0].text;

table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.IxjuBrce91PJfAll");
roll = await table.roll();
let object = roll.results[0].text;

table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.KtFtiLa1GlPdf8rB");
roll = await table.roll();
let history = roll.results[0].text;

let title = "<h3><strong>Starforged Gear</strong></h3>";
let message = background + "'s" + " " + attribute + " " + object + ":" + " " + history;

// Print the message
printMessage(title + message);