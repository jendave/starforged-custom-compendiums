// Macro by wilsonam used with permission by the author
// Modifications by David Hudson

function fPrintMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
}

let message = "";
let CorpFront = "";
let CorpBack = "";
let Crime = "";
let Method = "";

// let table = game.tables.getName("Corporate - Front Name");
let table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.vt3n9TYeQr6sQUVz");

let Roll = await table.roll();
CorpFront = Roll.results[0].text;

// table = game.tables.getName("Corporate - Back Name");
table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.0GtuQnwiClCBnknY");
Roll = await table.roll();
CorpBack = Roll.results[0].text;

// table = game.tables.getName("Corporate - Crime");
table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.YUbKhY7DV72tES3i");
Roll = await table.roll();
Crime = Roll.results[0].text;

// table = game.tables.getName("Corporate - Method");
table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.3YicVtK49eI2g87F");
Roll = await table.roll();
Method = Roll.results[0].text;

// Print the message

message = "<h3>Corporate Evil</h3>" + CorpFront + " " + CorpBack + " is " + Crime + " using " + Method

fPrintMessage(message);
