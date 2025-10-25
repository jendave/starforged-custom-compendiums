function printMessage(message) {
    let chatData = { content: message };
    ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));
    ChatMessage.create(chatData, {})
};

function randomArrayItem(array) {
    const index = (Math.floor(Math.random() * array.length));
    return array[index];
}

async function coreFunction(region, startingSector) {
    console.log("Region:", region);
    console.log("Starting Sector:", startingSector);
    if (region == "" || startingSector == "") {
        return;
    }
    let data = [];
    let numberOfPlanets = 0;
    let numberOfPassages = 0;
    switch (region) {
        case "Terminus":
            numberOfPlanets = 4;
            numberOfPassages = 3;
            break;
        case "Outlands":
            numberOfPlanets = 3;
            numberOfPassages = 2;
            break;
        case "Expanse":
            numberOfPlanets = 2;
            numberOfPassages = 1;
            break;
        default:
            numberOfPlanets = 4;
            numberOfPassages = 3;
    }

    let result = await FilePicker.browse("data", "systems/foundry-ironsworn/assets/sectors/1.webp");

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

    //let sectorDataFolder = game.folders.getName("Sector Data");
    //if (!sectorDataFolder) sectorDataFolder = await Folder.create({ name: "Sector Data" });

    const sectorDataFolder = game.folders.getName("Sector Data") ?? await Folder.create({ name: "Sector Data", type: "JournalEntry" });

    const newJournal = await JournalEntry.create({
        name: sectorPrefix + " " + sectorSuffix,
        folder: sectorDataFolder.id,
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
            "grid.alpha": 0.35,
            "grid.size": 200,
            "background.src": file,
            backgroundColor: "000000",
            padding: 0,
            "initial.scale": 0.386,
            "initial.x": 2428,
            "initial.y": 1417,
            foregroundElevation: 20,
            journal: newJournal.id,
            //   journalEntryPage: newJournal.pages[0].id,
            width,
            height
        });
    }
    await Scene.createDocuments(data);
}

try {
    let region = "";
    let startingSector = "";

    let d = new Dialog({
        title: 'Select Region and Sector Type',
        content: `
        <form class="flexcol">
            <div class="form-group">
                <label for="selectRegion">Region</label>
                <select name="selectRegion">
                    <option value="Terminus">Terminus</option>
                    <option value="Outlands">Outlands</option>
                    <option value="Expanse">Expanse</option>
                </select>
            </div>
            <div class="checkbox">
                <label><input type="checkbox" name="selectStartingSector" checked> Starting Sector</label>
            </div>
        </form>
        `,
        buttons: {
            no: {
                icon: '<i class="fas fa-times"></i>',
                label: 'Cancel'
            },
            yes: {
                icon: '<i class="fas fa-check"></i>',
                label: 'Yes',
                callback: (html) => {
                    region = html.find('[name="selectRegion"]').val();
                    startingSector = html.find('[name="selectStartingSector"]').is(':checked');
                }
            },
        },
        default: 'yes',
        close: () => {
            coreFunction(region, startingSector);
        }
    }).render(true)
}
catch (e) {
    console.log("The Dialog was closed without a choice being made.");
}
