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

function getStringBetween(fullString, startString, endString) {
    const startIndex = fullString.indexOf(startString);
    if (startIndex === -1) {
        return null;
    }

    const endIndex = fullString.indexOf(
        endString,
        startIndex + startString.length
    );
    if (endIndex === -1) {
        return null;
    }
    return fullString.substring(startIndex + startString.length, endIndex);
}

function getStellarObjectTypes() {
    return [
        {
            value: "smoldering red star",
            imgKey: "Red-Star",
            label: "Smoldering Red Star",
        },
        {
            value: "glowing orange star",
            imgKey: "Orange-Star",
            label: "Glowing Orange Star",
        },
        {
            value: "burning yellow star",
            imgKey: "Yellow-Star",
            label: "Burning Yellow Star",
        },
        {
            value: "blazing blue star",
            imgKey: "Blue-Star",
            label: "Blazing Blue Star",
        },
        {
            value: "young star incubating in a molecular cloud",
            imgKey: "Star-In-Incubating-Cloud",
            label: "Young Star",
        },
        {
            value: "white dwarf shining with spectral light",
            imgKey: "White-Dwarf",
            label: "White Dwarf",
        },
        {
            value: "corrupted star radiating with unnatural light",
            imgKey: "Corrupted-Star",
            label: "Corrupted Star",
        },
        {
            value: "neutron star surrounded by intense magnetic fields",
            imgKey: "Neutron-Star",
            label: "Neutron Star",
        },
        {
            value: "two stars in close orbit connected by fiery tendrils of energy",
            imgKey: "Binary-Star",
            label: "Binary Stars",
        },
        {
            value: "black hole allows nothing to escape—not even light",
            imgKey: "Black-Hole",
            label: "Black Hole",
        },
        {
            value: "hypergiant star generating turbulent solar winds",
            imgKey: "Hypergiant",
            label: "Hypergiant",
        },
        {
            value: "artificial star constructed by a long-dead civilization",
            // TODO: img: 'Artificial-Star',
            label: "Artificial Star",
        },
        {
            value: "unstable star showing signs of impending supernova",
            imgKey: "Unstable-Star",
            label: "Unstable Star",
        },
    ];
}

async function coreFunction(
    region,
    startingSector,
    useTokenAttacher,
    createPassages
) {
    if (region == "") {
        return;
    }
    let data = [];
    let numberOfSettlements = 0;
    let numberOfPassages = 0;
    let populationOracle = "";
    let gridSize = 170;
    switch (region) {
        case "Terminus":
            numberOfSettlements = 4;
            numberOfPassages = 3;
            populationOracle =
                "Compendium.foundry-ironsworn.starforgedoracles.RollTable.473250ed66f4c411";
            break;
        case "Outlands":
            numberOfSettlements = 3;
            numberOfPassages = 2;
            populationOracle =
                "Compendium.foundry-ironsworn.starforgedoracles.RollTable.8d5220c3ac5a5199";
            break;
        case "Expanse":
            numberOfSettlements = 2;
            numberOfPassages = 1;
            populationOracle =
                "Compendium.foundry-ironsworn.starforgedoracles.RollTable.058fd93e957c6804";
            break;
        default:
            numberOfSettlements = 4;
            numberOfPassages = 3;
            populationOracle =
                "Compendium.foundry-ironsworn.starforgedoracles.RollTable.473250ed66f4c411";
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
    const planetaryClassArray = ["affbef437e01ef10"];
    const stellarObjectArray = ["f2bba7a759c5871a"];
    const tokenAttacherModuleId = "token-attacher";
    const JB2A_DnD5e_ModuleId = "JB2A_DnD5e";

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
        game.folders.getName("Sectors: Terminus") ??
        (await Folder.create({
            name: "Sectors: Terminus",
            type: "Scene",
            folder: sectorsFolder.id,
        }));

    const sectorsOutlandsFolder =
        game.folders.getName("Sectors: Outlands") ??
        (await Folder.create({
            name: "Sectors: Outlands",
            type: "Scene",
            folder: sectorsFolder.id,
        }));

    const sectorsExpanseFolder =
        game.folders.getName("Sectors: Expanse") ??
        (await Folder.create({
            name: "Sectors: Expanse",
            type: "Scene",
            folder: sectorsFolder.id,
        }));

    const sectorDataFolder =
        game.folders.getName("Sector Data") ??
        (await Folder.create({ name: "Sector Data", type: "JournalEntry" }));

    const sectorDataTerminusFolder =
        game.folders.getName("Sector Data: Terminus") ??
        (await Folder.create({
            name: "Sector Data: Terminus",
            type: "JournalEntry",
            folder: sectorDataFolder.id,
        }));

    const sectorDataOutlandsFolder =
        game.folders.getName("Sector Data: Outlands") ??
        (await Folder.create({
            name: "Sector Data: Outlands",
            type: "JournalEntry",
            folder: sectorDataFolder.id,
        }));

    const sectorDataExpanseFolder =
        game.folders.getName("Sector Data: Expanse") ??
        (await Folder.create({
            name: "Sector Data: Expanse",
            type: "JournalEntry",
            folder: sectorDataFolder.id,
        }));

    const locationsFolder =
        game.folders.getName("Sector Locations") ??
        (await Folder.create({ name: "Sector Locations", type: "Actor" }));

    const locationsTerminusFolder =
        game.folders.getName("Locations: Terminus") ??
        (await Folder.create({
            name: "Locations: Terminus",
            type: "Actor",
            folder: locationsFolder.id,
        }));

    const locationsOutlandsFolder =
        game.folders.getName("Locations: Outlands") ??
        (await Folder.create({
            name: "Locations: Outlands",
            type: "Actor",
            folder: locationsFolder.id,
        }));

    const locationsExpanseFolder =
        game.folders.getName("Locations: Expanse") ??
        (await Folder.create({
            name: "Locations: Expanse",
            type: "Actor",
            folder: locationsFolder.id,
        }));

    let result = await FilePicker.browse(
        "data",
        "systems/foundry-ironsworn/assets/sectors/1.webp"
    );

    if (result.files.length > 0) {
        console.log("First image file found:", result.files[0]);
    }

    for (let file of result.files) {
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
            "grid.size": gridSize,
            "background.src": file,
            backgroundColor: "000000",
            padding: 0,
            "initial.scale": 0.386,
            "initial.x": 2428,
            "initial.y": 1417,
            foregroundElevation: 20,
            //  journal: newJournal.id,
            width,
            height,
        });
    }
    const sector = await Scene.createDocuments(data);
    console.log("Created sector:", sector[0].name);

    let uuidSettlementsAndPlanets = [];

    for (let i = 0; i < numberOfSettlements; i++) {
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
        const settlementScale = 2;
        const subtype = "settlement";

        table = await fromUuid(
            "Compendium.foundry-ironsworn.starforgedoracles.RollTable.68efb47a93ee8925"
        );
        roll = await table.roll();
        const settlementKlass = roll.results[0].text.toLowerCase();

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

        const settlement = await CONFIG.IRONSWORN.actorClass.create({
            type: "location",
            name,
            folder: locationsSectorFolder.id,
            system: { subtype, klass: settlementKlass, description },
            img: `systems/foundry-ironsworn/assets/locations/settlement-${settlementKlass.replace(
                /\s+/,
                ""
            )}.webp`,
            prototypeToken: {
                displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
                actorLink: true,
                "texture.scaleX": settlementScale,
                "texture.scaleY": settlementScale,
            },
        });
        let tokenDataSettlement = await settlement.getTokenDocument();

        // 24 wide by 18 tall grid of hexes
        // 27 wide by 15 tall in playkit
        const rowHeight = gridSize * (Math.sqrt(3) / 2);
        const colWidth = gridSize;

        let targetHexCol =
            ((i + 1) * 20) / (numberOfSettlements + 1) + getRandomInt(-1, 1);
        let targetHexRow = getRandomInt(2, 14);
        let x = targetHexCol * colWidth;
        let y = targetHexRow * rowHeight;

        // console.log(
        //     `Before Placing settlement ${settlement.name} at hex col ${targetHexCol}, row ${targetHexRow} (x: ${x}, y: ${y})`
        // );

        if (targetHexRow % 2 === 0) {
            x += colWidth / 2;
        }

        let sceneId = sector[0].id;
        let scene = game.scenes.get(sceneId);

        scene.activate();
        let tokenSettlement = await scene.createEmbeddedDocuments("Token", [
            {
                ...tokenDataSettlement.toObject(),
                x: x,
                y: y,
                sort: 1,
            },
        ]);

        // console.log(
        //     `After Placing settlement ${settlement.name} at hex col ${targetHexCol}, row ${targetHexRow} (x: ${x}, y: ${y})`
        // );

        let uuidSettlement = `@UUID[${settlement.uuid}]{${settlement.name}}`;

        let conjunction =
            settlementKlass == "deep space"
                ? "is in Deep Space"
                : settlementKlass == "orbital"
                ? "orbits planet"
                : "is on planet";

        let uuidPlanet = "";
        let planet;
        // planet generation
        if (settlementKlass != "deep space") {
            const planetScale = 1;
            table = await fromUuid(
                rollTablePrefix + randomArrayItem(planetaryClassArray)
            );
            roll = await table.roll();
            let planetaryClass =
                getStringBetween(roll.results[0].text, "</i>", "</a>").trim() ||
                roll.results[0].text.trim();
            let planetaryKlass = planetaryClass.split(" ")[0].toLowerCase();
            let planetaryNameArray = [];
            switch (planetaryKlass) {
                case "desert":
                    planetaryNameArray = ["d9ccce4a55cf1ba3"];
                    break;
                case "furnace":
                    planetaryNameArray = ["0ab38c2349ec8e2b"];
                    break;
                case "grave":
                    planetaryNameArray = ["b39ab4b43d2df736"];
                    break;
                case "ice":
                    planetaryNameArray = ["f45c90ceb8432000"];
                    break;
                case "jovian":
                    planetaryNameArray = ["fbb7cb653d8543a0"];
                    break;
                case "jungle":
                    planetaryNameArray = ["d231589442f1e296"];
                    break;
                case "ocean":
                    planetaryNameArray = ["3ab55ec64f9f711d"];
                    break;
                case "rocky":
                    planetaryNameArray = ["0aea1078fd7f3f1e"];
                    break;
                case "shattered":
                    planetaryNameArray = ["1bb3d31309da3f83"];
                    break;
                case "tainted":
                    planetaryNameArray = ["ce83758fc30fecc5"];
                    break;
                case "vital":
                    planetaryNameArray = ["9d429eda4f215791"];
                    break;
                default:
                    planetaryNameArray = ["9d429eda4f215791"];
            }

            table = await fromUuid(
                rollTablePrefix + randomArrayItem(planetaryNameArray)
            );
            roll = await table.roll();
            let planetaryName = roll.results[0].text;

            planet = await CONFIG.IRONSWORN.actorClass.create({
                type: "location",
                name: planetaryName,
                folder: locationsSectorFolder.id,
                system: {
                    subtype: "planet",
                    klass: planetaryKlass,
                    description:
                        "<p><b>Settlement:</b> " + uuidSettlement + "</p>",
                },
                img: `systems/foundry-ironsworn/assets/planets/Starforged-Planet-Token-${
                    planetaryClass.split(" ")[0]
                }-0${getRandomInt(1, 2)}.webp`,
                prototypeToken: {
                    displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
                    actorLink: true,
                    "texture.scaleX": planetScale,
                    "texture.scaleY": planetScale,
                },
            });

            uuidPlanet = "@UUID[" + planet.uuid + "]{" + planet.name + "}";
            uuidSettlementsAndPlanets.push(
                uuidSettlement + " " + conjunction + " " + uuidPlanet
            );
            settlement.system.description +=
                "\n<p><b>Planet:</b> " + uuidPlanet + "</p>";
            await CONFIG.IRONSWORN.actorClass.updateDocuments([
                {
                    _id: settlement._id,
                    system: { description: settlement.system.description },
                },
            ]);

            let tokenDataPlanet = await planet.getTokenDocument();
            targetHexRow += 1;
            x = targetHexCol * colWidth;
            y = targetHexRow * rowHeight;

            if (targetHexRow % 2 === 0) {
                x -= colWidth / 2;
            }

            console.log(
                `Placing planet ${planet.name} at hex col ${targetHexCol}, row ${targetHexRow} (x: ${x}, y: ${y})`
            );

            sceneId = sector[0].id;

            let tokenPlanet = await scene.createEmbeddedDocuments("Token", [
                {
                    ...tokenDataPlanet.toObject(),
                    x: x,
                    y: y,
                },
            ]);

            if (
                useTokenAttacher == true &&
                game.modules.get(tokenAttacherModuleId)?.active
            ) {
                let targetTokenSettlement = canvas.tokens.get(
                    tokenSettlement[0].id
                );
                let targetTokenPlanet = canvas.tokens.get(tokenPlanet[0].id);

                targetTokenPlanet.setTarget(true, {
                    user: game.user,
                    releaseOthers: true,
                });
                tokenAttacher.attachElementToToken(
                    targetTokenPlanet,
                    targetTokenSettlement
                );
                targetTokenPlanet.setTarget(false, {
                    user: game.user,
                    releaseOthers: true,
                });
            }
        } else {
            uuidSettlementsAndPlanets.push(uuidSettlement + " " + conjunction);
        }

        const stellarObjectScale = 1;
        let stellarObjectTypeDescription = "";
        table = await fromUuid(
            rollTablePrefix + randomArrayItem(stellarObjectArray)
        );
        roll = await table.roll();
        stellarObjectTypeDescription = roll.results[0].text;

        const star = getStellarObjectTypes().find(
            (item) =>
                item.value.toLowerCase() ===
                stellarObjectTypeDescription.toLowerCase()
        );

        const stellarObject = await CONFIG.IRONSWORN.actorClass.create({
            type: "location",
            name: `${settlementName}'s Star`,
            folder: locationsSectorFolder.id,
            system: {
                subtype: "star",
                klass: stellarObjectTypeDescription.toLowerCase(),
                description:
                    "<p><b>Settlement:</b> " +
                    uuidSettlement +
                    (uuidPlanet != ""
                        ? "</p>\n<p><b>Planet:</b> " + uuidPlanet + "</p>"
                        : ""),
            },
            img: star.imgKey
                ? `systems/foundry-ironsworn/assets/stellar-objects/Starforged-Stellar-Token-${star.imgKey}-01.webp`
                : `systems/foundry-ironsworn/assets/icons/stellar-object.svg`,
            prototypeToken: {
                displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
                actorLink: true,
                "texture.scaleX": stellarObjectScale,
                "texture.scaleY": stellarObjectScale,
            },
        });

        let uuidStellarObject =
            "@UUID[" + stellarObject.uuid + "]{" + stellarObject.name + "}";

        settlement.system.description +=
            "\n<p><b>Star:</b> " + uuidStellarObject + "</p>";
        await CONFIG.IRONSWORN.actorClass.updateDocuments([
            {
                _id: settlement._id,
                system: { description: settlement.system.description },
            },
        ]);

        if (planet !== null && planet !== undefined) {
            planet.system.description +=
                "\n<p><b>Star:</b> " + uuidStellarObject + "</p>";
            await CONFIG.IRONSWORN.actorClass.updateDocuments([
                {
                    _id: planet._id,
                    system: { description: planet.system.description },
                },
            ]);
        }
    }

    if (useTokenAttacher && !game.modules.get(tokenAttacherModuleId)?.active) {
        ui.notifications.info(
            `The module ${tokenAttacherModuleId} is not active.`
        );
    }

    // if (
    //     createPassages &&
    //     game.modules.get(JB2A_DnD5e_ModuleId)?.active
    // ) {
    //     for (let i = 0; i < numberOfPassages; i++) {
    //      //   const target = game.user.targets.first();
    //         let passageAnimation = new Sequence()
    //             .effect()
    //             .file("jb2a.energy_beam.normal.blue.01")
    //             //     .attachTo(token)

    //             // Testing random locations for now
    //             .atLocation({
    //                 x: getRandomInt(200, 4000),
    //                 y: getRandomInt(200, 3000),
    //             })
    //             //.stretchTo(target, { attachTo: true })
    //             .persist()
    //             .duration(1)
    //             .scale({ x: 1.0, y: 0.5 })
    //             .play();
    //     }
    // }

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
            {
                name: "Sector Locations",
                text: {
                    content:
                        "<p><b>Settlements and Planets</b></p>\n<p>" +
                        uuidSettlementsAndPlanets
                            .sort((a, b) =>
                                a.localeCompare(b, undefined, {
                                    sensitivity: "base",
                                })
                            )
                            .join("<br>") +
                        "</p>",
                },
            },
        ],
    });

    let sceneId = sector[0].id;
    let scene = game.scenes.get(sceneId);
    await scene.update({
        journal: newJournal.id,
    });
}

try {
    let region = "";
    let startingSector = "";
    let tokenAttacherActive = false;
    let JB2A_DnD5eActive = false;
    const tokenAttacherModuleId = "token-attacher";
    const JB2A_DnD5e_ModuleId = "JB2A_DnD5e";
    if (game.modules.get(tokenAttacherModuleId)?.active) {
        tokenAttacherActive = true;
    }
    if (game.modules.get(JB2A_DnD5e_ModuleId)?.active) {
        JB2A_DnD5eActive = true;
    }

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
            <div class="checkbox">
                <label><input type="checkbox" name="useTokenAttacher" ${
                    tokenAttacherActive ? "checked" : ""
                }> Use Token Attacher</label>
            </div>
            <div class="checkbox">
                <label><input type="checkbox" name="createPassages" ${
                    JB2A_DnD5eActive ? "checked" : ""
                }> Create Passages</label>
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
                    useTokenAttacher = html
                        .find('[name="useTokenAttacher"]')
                        .is(":checked");
                    createPassages = html
                        .find('[name="createPassages"]')
                        .is(":checked");
                },
            },
        },
        default: "yes",
        close: () => {
            coreFunction(
                region,
                startingSector,
                useTokenAttacher,
                createPassages
            );
        },
    }).render(true);
} catch (e) {
    console.log("The Dialog was closed without a choice being made.");
}
