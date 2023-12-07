// Macro by David Hudson under the MIT License.

function printMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
};

try {
    let rollTablesUUIDPrefix = "Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.";

    let title = "<h3>I Owe My Soul to the Corporate Planet</h3>";

    const citizensTable = await fromUuid(rollTablesUUIDPrefix + "Mwv4GxulyoFYCSBr");
    let citizensRoll = await citizensTable.roll();
    let citizens = citizensRoll.results[0].text;

    const domainTable = await fromUuid(rollTablesUUIDPrefix + "va1JToybIdjLPyyB");
    let domainRoll = await domainTable.roll();
    let domain = domainRoll.results[0].text;

    const influenceTable = await fromUuid(rollTablesUUIDPrefix + "JJB6gt5lLzLrsapG");
    let influenceRoll = await influenceTable.roll();
    let influence = influenceRoll.results[0].text;

    const leadersTable = await fromUuid(rollTablesUUIDPrefix + "MjDvX9PFv8wB60jz");
    let leadersRoll = await leadersTable.roll();
    let leaders = leadersRoll.results[0].text;

    const opportunityTable = await fromUuid(rollTablesUUIDPrefix + "TO1zAhuVDv5YGjAY");
    let opportunityRoll = await opportunityTable.roll();
    let opportunity = opportunityRoll.results[0].text;

    const perilTable = await fromUuid(rollTablesUUIDPrefix + "u6KuWElAsHUu3cBL");
    let perilRoll = await perilTable.roll();
    let peril = perilRoll.results[0].text;

    const loyaltyTable = await fromUuid(rollTablesUUIDPrefix + "5Sp9BxEXhNUK8KOv");
    let loyaltyRoll = await loyaltyTable.roll();
    let loyalty = loyaltyRoll.results[0].text;

    let message = "Inhabitants Under Corporate Control: " + citizens + "<br>";
    message += "Corporate Domain: " + domain + "<br>";
    message += "Corporate Influence: " + influence + "<br>";
    message += "Corporate Leaders: " + leaders + "<br>";
    message += "Corporate Planet Opportunity: " + opportunity + "<br>";
    message += "Corporate Planet Peril: " + peril + "<br>";
    message += "Employee Loyalty: " + loyalty + "<br>";

    // Print the message
    printMessage(title + message);

}
catch (e) {
    console.log(e);
}