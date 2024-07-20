// Macro by David Hudson under the MIT License.

function printMessage(message) {
    let chatData = { content: message};
    ChatMessage.applyRollMode(chatData, game.settings.get("core","rollMode"));
    ChatMessage.create(chatData, {})
};

try {
    let rollTablesUUIDPrefix = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.";

    let title = "<h3>Sojourn Hot Sauce</h3>";

    const flavourTable = await fromUuid(rollTablesUUIDPrefix + "Wsg6a5AD8qJZ6txw");
    let flavourRoll = await flavourTable.roll();
    let flavour = flavourRoll.results[0].text;

    const downtimeAdjectiveTable = await fromUuid(rollTablesUUIDPrefix + "kE4Pu6a7fX8jCN5Y");
    let downtimeAdjectiveRoll = await downtimeAdjectiveTable.roll();
    let downtimeAdjective = downtimeAdjectiveRoll.results[0].text;

    const downtimeNounTable = await fromUuid(rollTablesUUIDPrefix + "OHS1wGYtjWPBS9rT");
    let downtimeNounRoll = await downtimeNounTable.roll();
    let downtimeNoun = downtimeNounRoll.results[0].text;

    let message = "Flavour: " + flavour + "<br>";
    message += "Downtime Adjective: " + downtimeAdjective + "<br>";
    message += "Downtime Noun: " + downtimeNoun + "<br>";

    // Print the message
    printMessage(title + message);

}
catch (e) {
    console.log(e);
}