//import { IronswornActor } from "../../systems/foundry-ironsworn/module/actor/ironsworn-actor.js";

function printMessage(message) {
    let chatData = { content: message };
    ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));
    ChatMessage.create(chatData, {});
}

function randomArrayItem(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    let populationOracle = "";
    switch (region) {
        case "Terminus":
            numberOfPlanets = 4;
            numberOfPassages = 3;
            populationOracle =
                "Compendium.foundry-ironsworn.starforgedoracles.RollTable.473250ed66f4c411";
            break;
        case "Outlands":
            numberOfPlanets = 3;
            numberOfPassages = 2;
            populationOracle =
                "Compendium.foundry-ironsworn.starforgedoracles.RollTable.8d5220c3ac5a5199";
            break;
        case "Expanse":
            numberOfPlanets = 2;
            numberOfPassages = 1;
            populationOracle =
                "Compendium.foundry-ironsworn.starforgedoracles.RollTable.058fd93e957c6804";
            break;
        default:
            numberOfPlanets = 4;
            numberOfPassages = 3;
            populationOracle =
                "Compendium.foundry-ironsworn.starforgedoracles.RollTable.473250ed66f4c411";
    }

    let result = await FilePicker.browse(
        "data",
        "systems/foundry-ironsworn/assets/sectors/1.webp"
    );

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

    const rollTablePrefix =
        "Compendium.foundry-ironsworn.starforgedoracles.RollTable.";
    // const rollTablePrefix = "Compendium.starsmith-expanded-oracles.starsmithexpandedoracles.RollTable.";
    const sectorPrefixArray = ["306501658d12dbad"];
    const sectorSuffixArray = ["0b2b7f507f8901cc"];
    const sectorTroubleArray = ["f6764b50761b77eb"];
    const settlementNameArray = ["c25eade4d8daa0bc"];
    const authorityArray = ["2c3224921966f200"];
    const settlementProjectArray = ["eb909255e1df463b"];

    table = await fromUuid(
        rollTablePrefix + randomArrayItem(sectorPrefixArray)
    );
    roll = await table.roll();
    let sectorPrefix = roll.results[0].text;

    table = await fromUuid(
        rollTablePrefix + randomArrayItem(sectorSuffixArray)
    );
    roll = await table.roll();
    let sectorSuffix = roll.results[0].text;

    table = await fromUuid(
        rollTablePrefix + randomArrayItem(sectorTroubleArray)
    );
    roll = await table.roll();
    let sectorTrouble = roll.results[0].text;

    const sectorsFolder =
        game.folders.getName("Sectors") ??
        (await Folder.create({ name: "Sectors", type: "Scene" }));

    const sectorsTerminusFolder =
        game.folders.getName("Sectors - Terminus") ??
        (await Folder.create({
            name: "Sectors - Terminus",
            type: "Scene",
            folder: sectorsFolder.id,
        }));

    const sectorsOutlandsFolder =
        game.folders.getName("Sectors - Outlands") ??
        (await Folder.create({
            name: "Sectors - Outlands",
            type: "Scene",
            folder: sectorsFolder.id,
        }));

    const sectorsExpanseFolder =
        game.folders.getName("Sectors - Expanse") ??
        (await Folder.create({
            name: "Sectors - Expanse",
            type: "Scene",
            folder: sectorsFolder.id,
        }));

    const sectorDataFolder =
        game.folders.getName("Sector Data") ??
        (await Folder.create({ name: "Sector Data", type: "JournalEntry" }));

    const sectorDataTerminusFolder =
        game.folders.getName("Sector Data - Terminus") ??
        (await Folder.create({
            name: "Sector Data - Terminus",
            type: "JournalEntry",
            folder: sectorDataFolder.id,
        }));

    const sectorDataOutlandsFolder =
        game.folders.getName("Sector Data - Outlands") ??
        (await Folder.create({
            name: "Sector Data - Outlands",
            type: "JournalEntry",
            folder: sectorDataFolder.id,
        }));

    const sectorDataExpanseFolder =
        game.folders.getName("Sector Data - Expanse") ??
        (await Folder.create({
            name: "Sector Data - Expanse",
            type: "JournalEntry",
            folder: sectorDataFolder.id,
        }));

    const locationsFolder =
        game.folders.getName("Sector Locations") ??
        (await Folder.create({ name: "Sector Locations", type: "Actor" }));

    const locationsTerminusFolder =
        game.folders.getName("Locations - Terminus") ??
        (await Folder.create({
            name: "Locations - Terminus",
            type: "Actor",
            folder: locationsFolder.id,
        }));

    const locationsOutlandsFolder =
        game.folders.getName("Locations - Outlands") ??
        (await Folder.create({
            name: "Locations - Outlands",
            type: "Actor",
            folder: locationsFolder.id,
        }));

    const locationExpanseFolder =
        game.folders.getName("Locations - Expanse") ??
        (await Folder.create({
            name: "Locations - Expanse",
            type: "Actor",
            folder: locationsFolder.id,
        }));

    const newJournal = await JournalEntry.create({
        name: sectorPrefix + " " + sectorSuffix,
        folder:
            region == "Terminus"
                ? sectorDataTerminusFolder.id
                : region == "Outlands"
                ? sectorDataOutlandsFolder.id
                : region == "Expanse"
                ? sectorDataExpanseFolder.id
                : sectorDataFolder.id,
        pages: [
            {
                name: "Overview",
                text: {
                    content:
                        sectorPrefix +
                        " " +
                        sectorSuffix +
                        " is located in the " +
                        region +
                        ".",
                },
            },
            {
                name: "Sector Trouble",
                text: { content: sectorTrouble + "." },
            },
        ],
    });

    for (let file of result.files) {
        //if(game.scenes.some(s => s.background.src === file)) continue;
        const { width, height } = await loadTexture(file);
        data.push({
            folder:
                region == "Terminus"
                    ? sectorsTerminusFolder.id
                    : region == "Outlands"
                    ? sectorsOutlandsFolder.id
                    : region == "Expanse"
                    ? sectorsExpanseFolder.id
                    : sectorsFolder.id,
            name: sectorPrefix + " " + sectorSuffix,
            fogExploration: false,
            "flags.foundry-ironsworn.region": region.toLowerCase(),
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
            height,
        });
    }
    await Scene.createDocuments(data);

    for (let i = 0; i < numberOfPlanets; i++) {
        const locationsFolderTemp =
            region == "Terminus"
                ? locationsTerminusFolder
                : region == "Outlands"
                ? locationsOutlandsFolder
                : region == "Expanse"
                ? locationsExpanseFolder
                : locationsFolder;

        const locationsSectorFolder =
            game.folders.getName(sectorPrefix + " " + sectorSuffix) ??
            (await Folder.create({
                name: sectorPrefix + " " + sectorSuffix,
                type: "Actor",
                folder: locationsFolderTemp.id,
            }));
        table = await fromUuid(
            rollTablePrefix + randomArrayItem(settlementNameArray)
        );
        roll = await table.roll();
        let settlementName = roll.results[0].text;

        const name = settlementName;
        const scale = 1;
        const subtype = "settlement";

        table = await fromUuid(
            "Compendium.foundry-ironsworn.starforgedoracles.RollTable.68efb47a93ee8925"
        );
        roll = await table.roll();
        const klass = roll.results[0].text.toLowerCase();

        table = await fromUuid(populationOracle);
        roll = await table.roll();
        let population = roll.results[0].text;

        table = await fromUuid(
            rollTablePrefix + randomArrayItem(authorityArray)
        );
        roll = await table.roll();
        let authority = roll.results[0].text;

        let settlementProject = "";
        table = await fromUuid(
            rollTablePrefix + randomArrayItem(settlementProjectArray)
        );
        for (let i = 0; i < getRandomInt(1, 2); i++) {
            roll = await table.roll();
            settlementProject += roll.results[0].text + "<br>";
        }

        let description = `<p><strong>Population:</strong> ${population}</p>
        <p><strong>Authority:</strong> ${authority}</p>
        <p><strong>Settlement projects:</strong> ${settlementProject}</p>`;

        const loc = await CONFIG.IRONSWORN.actorClass.create({
            type: "location",
            name,
            folder: locationsSectorFolder.id,
            system: { subtype, klass, description },
            img: `systems/foundry-ironsworn/assets/locations/settlement-${klass.replace(
                /\s+/,
                ""
            )}.webp`,
            prototypeToken: {
                displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
                actorLink: true,
                "texture.scaleX": scale,
                "texture.scaleY": scale,
            },
        });
    }
}

try {
    let region = "";
    let startingSector = "";

    let d = new Dialog({
        title: "Select Region and Sector Type",
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
                label: "Cancel",
            },
            yes: {
                icon: '<i class="fas fa-check"></i>',
                label: "Yes",
                callback: (html) => {
                    region = html.find('[name="selectRegion"]').val();
                    startingSector = html
                        .find('[name="selectStartingSector"]')
                        .is(":checked");
                },
            },
        },
        default: "yes",
        close: () => {
            coreFunction(region, startingSector);
        },
    }).render(true);
} catch (e) {
    console.log("The Dialog was closed without a choice being made.");
}
