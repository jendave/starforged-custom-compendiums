// Macro by David Hudson under the MIT License.

function printMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
};

function randomItemInArray(array) {
    return array[(Math.floor(Math.random() * array.length))];
}

try {
    let rollTablesUUIDPrefix = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.";

    let title = "<h3>MegaCorp Names</h3>";

    const megaCorpPrefixArray = ["n2QIJPF0TnYl3HV2", "FNdAYylXJaIzHJPl", "Cp4ZOvPVaB1gcfsN"];
    const megaCorpStylizerArray = ["24c7utw48KSWuKJk", "NAgkcDnEG03d5zvb", "qR8ukYM0uiTfp45t"];

    let megaCorpPrefixTable_1 = await fromUuid(rollTablesUUIDPrefix + randomItemInArray(megaCorpPrefixArray));
    let megaCorpPrefixRoll_1 = await megaCorpPrefixTable_1.roll();
    let megaCorpPrefix_1 = megaCorpPrefixRoll_1.results[0].text;

    let megaCorpPrefixTable_2 = "";
    let megaCorpPrefixRoll_2 = "";
    let megaCorpPrefix_2 = "";

    do {
        megaCorpPrefixTable_2 = await fromUuid(rollTablesUUIDPrefix + randomItemInArray(megaCorpPrefixArray));
        megaCorpPrefixRoll_2 = await megaCorpPrefixTable_2.roll();
        megaCorpPrefix_2 = megaCorpPrefixRoll_2.results[0].text;
    } while (megaCorpPrefix_2 == megaCorpPrefix_1);

    let megaCorpStylizerTable = await fromUuid(rollTablesUUIDPrefix + randomItemInArray(megaCorpStylizerArray));
    let megaCorpStylizerRoll = await megaCorpStylizerTable.roll();
    let megaCorpStylizer = megaCorpStylizerRoll.results[0].text;

    let message = "MegaCorp Name: ";
    message += megaCorpPrefix_1 + megaCorpPrefix_2 + " " + megaCorpStylizer;

    // Print the message
    printMessage(title + message);

}
catch (e) {
    console.log(e);
}