// Macro by wilsonam used with permission by the author
// Modifications by David Hudson

function printMessage(message) {
    let chatData = { content: message};
    ChatMessage.applyRollMode(chatData, game.settings.get("core","rollMode"));
    ChatMessage.create(chatData, {})
};

let message = "";
let Choice = "";
let Subject = "";
let Demand = "";
let Action = "";
let Object = "";

// let table = game.tables.getName("Plots - Plot Choice");
let table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.ZyEC6JjDaLn6fG4i");

let Roll = await table.roll();
Choice = Roll.results[0].text;

// table = game.tables.getName("Plots - First Name");
table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.8flYod7IdN0C5Pw5");
Roll = await table.roll();
Subject = Roll.results[0].text;
// table = game.tables.getName("Plots - Last Name");
table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.hZHeP0Aq9FYWQ0BL");
Roll = await table.roll();
Subject = Subject + " " + Roll.results[0].text;
// table = game.tables.getName("Plots - NPC Modifier");
table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.ML5bfefHPVrXaPMq");
Roll = await table.roll();
Subject = Subject + " (" + Roll.results[0].text;
// table = game.tables.getName("Plots - NPC Role");
table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.r9I5WbSGo4BW6hWN");
Roll = await table.roll();
Subject = Subject + " " + Roll.results[0].text + ")";

// table = game.tables.getName("Plots - Demand");
table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.wGq6oOlOrjVSyXVf");
Roll = await table.roll();
Demand = Roll.results[0].text;

if (Choice == "Person") {
    // table = game.tables.getName("Plots - Action vs Person");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.j5TewCEoidsWvOHz");
    Roll = await table.roll();
    Action = Roll.results[0].text;
    // table = game.tables.getName("Plots - First Name");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.8flYod7IdN0C5Pw5");
    Roll = await table.roll();
    Object = Roll.results[0].text;
    // table = game.tables.getName("Plots - Last Name");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.hZHeP0Aq9FYWQ0BL");
    Roll = await table.roll();
    Object = Object + " " + Roll.results[0].text;
    // table = game.tables.getName("Plots - NPC Modifier");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.ML5bfefHPVrXaPMq");
    Roll = await table.roll();
    Object = Object + " (" + Roll.results[0].text;
    // table = game.tables.getName("Plots - NPC Role");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.r9I5WbSGo4BW6hWN");
    Roll = await table.roll();
    Object = Object + " " + Roll.results[0].text + ")";
}

else if (Choice == "Object") {
    // table = game.tables.getName("Plots - Action vs Object");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.SP8X4aaKNZhMEUco");
    Roll = await table.roll();
    Action = Roll.results[0].text + " the";
    // table = game.tables.getName("Plots - Target Object");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.QIL1ivkyvFfy6GLu");
    Roll = await table.roll();
    Object = Roll.results[0].text;
}

else if (Choice == "Group") {
    // table = game.tables.getName("Plots - Action vs Group");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.LzoSodIXHxOivd26");
    Roll = await table.roll();
    Action = Roll.results[0].text;
    // table = game.tables.getName("Plots - Target Group");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.Q5Qn4ilnOjubIkWm");
    Roll = await table.roll();
    Object = Roll.results[0].text;
}

else {
    // table = game.tables.getName("Plots - Action vs Abstract");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.HR7OGyJtv6WLX1GQ");
    Roll = await table.roll();
    Action = Roll.results[0].text;
    // table = game.tables.getName("Plots - Target Abstract");
    table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.J3deDnBD5NwXNC3g");
    Roll = await table.roll();
    Object = Roll.results[0].text;
}

// Print the message

message = "<h3>Plot Generator</h3>" + Subject + " " + Demand + " " + Action + " " + Object

printMessage(message);
