function printMessage(message) {
    let chatData = { content: message };
    ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));
    ChatMessage.create(chatData, {})
};

function randomArrayItem(array) {
    const index = (Math.floor(Math.random() * array.length));
    return array[index];
}

let data = [];
let result = await FilePicker.browse("data", "systems/foundry-ironsworn/assets/sectors");

// The 'result' object contains information about the browsed directory
console.log("Files:", result.files); // Array of file paths
console.log("Directories:", result.dirs); // Array of directory paths
console.log("Target:", result.target); // The target directory that was browsed
console.log("Source:", result.source); // The source location (e.g., "data")

// You can then process the files or directories as needed
if (result.files.length > 0) {
    console.log("First image file found:", result.files[0]);
}

let table;
let roll;

const rollTablePrefix = "Compendium.foundry-ironsworn.starforgedoracles.RollTable.";
// const rollTablePrefix = "Compendium.starsmith-expanded-oracles.starsmithexpandedoracles.RollTable.";
const sectorPrefixArray = ["306501658d12dbad"];
const sectorSuffixArray = ["0b2b7f507f8901cc"];

table = await fromUuid(rollTablePrefix + randomArrayItem(sectorPrefixArray));
roll = await table.roll();
let sectorPrefix = roll.results[0].text;

table = await fromUuid(rollTablePrefix + randomArrayItem(sectorSuffixArray));
roll = await table.roll();
let sectorSuffix = roll.results[0].text;

table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.f6764b50761b77eb");
roll = await table.roll();
let sectorTrouble = roll.results[0].text;

const newJournal = await JournalEntry.create({
    name: sectorPrefix + " " + sectorSuffix,
    pages: [{
        name: "Sector Trouble",
        text: { content: sectorTrouble + "." }
    }]
});

for (let file of result.files) {
    //if(game.scenes.some(s => s.background.src === file)) continue;
    const { width, height } = await loadTexture(file);
    data.push({
        name: sectorPrefix + " " + sectorSuffix,
        fogExploration: false,
        tokenVision: false,
        navigation: false,
        "grid.type": 2,
        "grid.color": "ffffff",
        "background.src": file,
        journal: newJournal.id,
        width,
        height
    });
}
await Scene.createDocuments(data);
