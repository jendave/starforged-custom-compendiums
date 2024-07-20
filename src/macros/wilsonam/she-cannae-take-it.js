// Macro by David Hudson under the MIT License.

function printMessage(message) {
    let chatData = { content: message};
    ChatMessage.applyRollMode(chatData, game.settings.get("core","rollMode"));
    ChatMessage.create(chatData, {})
};

let table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.9Lw2GlMyLNqHR4Ri");
let roll = await table.roll();
let location = roll.results[0].text;

table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.J4Pm4dY96dfKUiRz");
roll = await table.roll();
let adjective = roll.results[0].text;

table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.atSzGzt43aXIrh1V");
roll = await table.roll();
let first_part = roll.results[0].text;

table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.xnan7QVWBABBEImV");
roll = await table.roll();
let last_part = roll.results[0].text;

let system = location + " " + adjective + " " + first_part + " " + last_part;
let title = "<h3>She Cannae Take It!</h3>";
let message = "";

roll = await new Roll('1d3').evaluate();

if (roll.total == 1) {
    // "We need to <need> the <system>."
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.WICnxf7Vhz5GOgLR");
    roll = await table.roll();
    let need = roll.results[0].text;
    message = "We need to " + need + " the " + system + ".";
} else if (roll.total == 2) {
    // "The <system> is <problem>."
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.dK8a0tkTZH9xOr4e");
    roll = await table.roll();
    let problem = roll.results[0].text;
    message = "The " + system + " is " + problem + ".";
} else if (roll.total == 3) {
    // "The <system> is offline."
    message = "The " + system + " is offline.";
}

// Print the message
printMessage(title + message);
