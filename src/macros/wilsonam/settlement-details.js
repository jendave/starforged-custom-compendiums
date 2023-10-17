function fPrintMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
};

// ===== Random number function =====

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

// ===== This is the main async function that does all the work =====

async function CoreFunction(Location, Enclosed, Region) {

    // Lookup the Tech Level
    if (Location == 'Deep Space') {
        table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.61rPT9QvLVn1O4lj");
    }
    else if (Location == 'Orbital') {
        table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.E5ntOEIiT4PZSiiA");
    }
    else {
        table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.KAKjV6GL1lfsn97b");
    }

    Roll = await table.roll();
    TLDetail = Roll.results[0].text;
    TL = TLDetail.substring(0, 5);
    message = "<h3>Settlement Details </h3>" + Location + " (" + Enclosed + "), " + Region + "<br><br>" + TLDetail;

    // Lookup the Settlement Type
    switch (TL) {
        case 'TL-00':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.c0slR6yjO5Rxu0dU");
            break;
        case 'TL-01':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.Nzxizsv4o6ZJUdMw");
            break;
        case 'TL-02':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.s7GYK5vRxfxNRuiW");
            break;
        case 'TL-03':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.kwLRiezzUtWzLiy0");
            break;
        case 'TL-04':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.slR9tqFo3KUCVjGW");
            break;
        case 'TL-05':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.yQ1rFNKYZSNdcLcK");
            break;
        case 'TL-06':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.R1xuzviNGsGbMk3V");
            break;
        case 'TL-07':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.QcrLyWyz9W8Cskwc");
            break;
        case 'TL-08':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.IRXq7c5PfasD5gMm");
            break;
        case 'TL-09':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.4HgY94M69M9CXUKQ");
            break;
        case 'TL-10':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.f1W2ylOipCWZsEoF");
            break;
        case 'TL-11':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.AgVxb7qSGzmufI7r");
            break;
        case 'TL-12':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.ZMi9qTBo2eej1d1C");
            break;
        case 'TL-13':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.Lx9G612WHR1XsM2G");
            break;
        case 'TL-14':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.rdCW7I7q6zAKxfGW");
            break;
        case 'TL-15':
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.Nzxizsv4o6ZJUdMw");
            break;
        default:
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.O4erMSrXlugSoqwF");
    }

    Roll = await table.roll();
    SettType = Roll.results[0].text;
    message = message + "<br><br>Type: " + SettType;

    // Settlement Look Descriptors x2
    if (PS == 'Planet') {
        switch (SettType) {
            case 'Backwater':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.NMaziZXqbNowZs9y");
                break;
            case 'Defended':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.mpejcMKxbwRni2cY");
                break;
            case 'Dilapidated':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.9l0kDTbvWFAl98OS");
                break;
            case 'High-Tech':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.epDVJJKp1dshO1bl");
                break;
            case 'Military-Industrial':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.IOBc9bdPSlcAkxoz");
                break;
            case 'Over-Crowded':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.LTUw2a86WaNma3Ht");
                break;
            case 'Primitive':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.RqA5VShgKPPMQQ32");
                break;
            default:
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.RqA5VShgKPPMQQ32");
        }
    }
    else {
        switch (SettType) {
            case 'Backwater':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.NMaziZXqbNowZs9y");
                break;
            case 'Defended':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.mpejcMKxbwRni2cY");
                break;
            case 'Dilapidated':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.9l0kDTbvWFAl98OS");
                break;
            case 'High-Tech':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.epDVJJKp1dshO1bl");
                break;
            case 'Military-Industrial':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.IOBc9bdPSlcAkxoz");
                break;
            case 'Over-Crowded':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.LTUw2a86WaNma3Ht");
                break;
            case 'Primitive':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.RqA5VShgKPPMQQ32");
                break;
            default:
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.RqA5VShgKPPMQQ32");
        }
    }
    Roll = await table.roll();
    SettDesc_01 = Roll.results[0].text;
    Roll = await table.roll();
    SettDesc_02 = Roll.results[0].text;
    while (SettDesc_01 == SettDesc_02) {
        Roll = await table.roll();
        SettDesc_02 = Roll.results[0].text;
    }
    SettDesc = SettDesc_01 + " and " + SettDesc_02;

    message = message + " with " + SettDesc;

    // Lookup the overall population
    if (Region == 'Expanse') {
        table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.058fd93e957c6804");
    }
    else if (Region == 'Outlands') {
        table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.8d5220c3ac5a5199");
    }
    else {
        table = await fromUuid("Compendium.foundry-ironsworn.starforgedoracles.RollTable.473250ed66f4c411");
    }

    Roll = await table.roll();
    SettPop = Roll.results[0].text;
    SettPopBase = SettPop.substring(0, 3);

    // Calc numeric base population

    if (SettPopBase == "Few") {
        SettPopBase = 2
        SettPopSize = "S"
    }
    else if (SettPopBase == "Doz") {
        SettPopBase = 8
        SettPopSize = "S"
    }
    else if (SettPopBase == "Hun") {
        SettPopBase = 80
        SettPopSize = "ML"
    }
    else if (SettPopBase == "Tho") {
        SettPopBase = 800
        SettPopSize = "ML"
    }
    else {
        SettPopBase = 8000
        SettPopSize = "ML"
    };

    // Calc Detailed Pop Number

    SettPopDet = random(1, 6);
    SettPopDet = SettPopDet + random(1, 6);
    SettPopDet = SettPopDet * SettPopBase;

    message = message + "<br><br>Population of about " + SettPopDet + " (" + SettPop + ")";

    // Now do Settlement Senses x2
    if (PS == 'Planet') {
        if (Enclosed == "Enclosed") {
            if (SettPopSize == "ML") {
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.LMEsQ5yvslFt9WDp");
            }
            else {
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.EBp0P0bDBlT4Kx9i");
            }
        }
        else {
            if (SettPopSize == "ML") {
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.ddSz1h5ADOlCJiq2");
            }
            else {
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.4PKg9e1VUJbAoAAo");
            }
        }
    }
    else {
        if (SettPopSize == "ML") {
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.sddUehP0SDWmfW86");
        }
        else {
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.rl81naNPAw2aUP4Q");
        }
    }

    Roll = await table.roll();
    SettSenses_01 = Roll.results[0].text;
    Roll = await table.roll();
    SettSenses_02 = Roll.results[0].text;

    while (SettSenses_01 == SettSenses_02) {
        Roll = await table.roll();
        SettSenses_02 = Roll.results[0].text;
    }
    SettSenses = SettSenses_01 + "/" + SettSenses_02;

    message = message + "<br><br>Sounds and smells: " + SettSenses;

    // Now do Settlement Industries x2
    if (PS == 'Planet') {
        if (Enclosed == "Enclosed") {
            if (SettPopSize == "ML") {
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.LYt7lPPmiX53oPA4");
            }
            else {
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.31sqY1xlsyTSvFsN");
            }
        }
        else {
            if (SettPopSize == "ML") {
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.N9Hxj2NlQoHpOLQt");
            }
            else {
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.iEwtkIEVKHp3B7HQ");
            }
        }
    }
    else {
        if (SettPopSize == "ML") {
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.pea6CvympFx9ZNln");
        }
        else {
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.UwISOKINJSUqUs4C");
        }
    }

    Roll = await table.roll();
    SettInd_01 = Roll.results[0].text;
    if (SettInd_01 == "Manufacturing") { Manu = Manu + 1 };
    Roll = await table.roll();
    SettInd_02 = Roll.results[0].text;
    if (SettInd_02 == "Manufacturing") { Manu = Manu + 1 };
    while (SettInd_01 == SettInd_02) {
        Roll = await table.roll();
        SettInd_02 = Roll.results[0].text;
    }
    SettInd = SettInd_01 + "/" + SettInd_02;

    message = message + "<br><br>Industries: " + SettInd;

    // And now possible Settlement Manufacturing

    if (Manu > 0) {
        switch (SettType) {
            case 'Backwater':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.oNxWUQmD3D62WsaR");
                break;
            case 'Defended':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.HneyWj8ktd4CSJPY");
                break;
            case 'Dilapidated':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.I64UBZ1ZEYPgBOnk");
                break;
            case 'High-Tech':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.23Nx5FqKVT9gBpBP");
                break;
            case 'Military-Industrial':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.k09e0Xb4TWswO3CG");
                break;
            case 'Over-Crowded':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.RYfN4KpB5CvjCs52");
                break;
            case 'Primitive':
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.nvatB0Sg1yeQyQ7s");
                break;
            default:
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.nvatB0Sg1yeQyQ7s");
        }
        Roll = await table.roll();
        SettManu = Roll.results[0].text;

        message = message + "<br><br>Manufacturing: " + SettManu;
    }

    if (Manu > 1) {
        Roll = await table.roll();
        SettManu = Roll.results[0].text;

        message = message + "/" + SettManu;
    }

    // Finally print the message

    fPrintMessage(message);

    return;
}

// ===== END of the main function =====

const myDialogOptions = {
    scale: 1,
    id: "settlement-selector"
};

let message = ""
let Location = ""
let Enclosed = ""
let Region = ""
let PS = ""
let table = ""
let Roll = ""
let TLDetail = ""
let TL = ""
let SettType = ""
let SettDesc = ""
let SettDesc_01 = ""
let SettDesc_02 = ""
let SettPop = ""
let SettPopBase = 0
let SettPopSize = ""
let SettPopDet = 0
let SettSenses = ""
let SettSenses_01 = ""
let SettSenses_02 = ""
let SettInd = ""
let SettInd_01 = ""
let SettInd_02 = ""
let Manu = 0
let SettManu = ""

// Start with dialog for location

new Dialog({
    title: "Input Location",
    content: `<style>
    #settlement-selector .dialog-buttons {
        flex-direction: column;
    }
    </style>
<p>Select Region / Location / Enclosure Type: </p>`,
    buttons:
    {
        PlanetsideOpenT: {
            label: "Terminus / Planetside / Open Air",
            callback: () => {
                Location = "Planetside";
                Enclosed = "Open Air";
                Region = "Terminus";
                PS = "Planet";
            }
        },
        PlanetsideEncT: {
            label: "Terminus / Planetside / Enclosed",
            callback: () => {
                Location = "Planetside";
                Enclosed = "Enclosed";
                Region = "Terminus";
                PS = "Planet";
            }
        },
        OrbitalEncT: {
            label: "Terminus / Orbital / Enclosed",
            callback: () => {
                Location = "Orbital";
                Enclosed = "Enclosed";
                Region = "Terminus";
                PS = "Space";
            }
        },
        DeepSpaceEncT: {
            label: "Terminus / Deep Space / Enclosed",
            callback: () => {
                Location = "Deep Space";
                Enclosed = "Enclosed";
                Region = "Terminus";
                PS = "Space";
            }
        },
        PlanetsideOpenO: {
            label: "Outlands / Planetside / Open Air",
            callback: () => {
                Location = "Planetside";
                Enclosed = "Open Air";
                Region = "Outlands";
                PS = "Planet";
            }
        },
        PlanetsideEncO: {
            label: "Outlands / Planetside / Enclosed",
            callback: () => {
                Location = "Planetside";
                Enclosed = "Enclosed";
                Region = "Outlands";
                PS = "Planet";
            }
        },
        OrbitalEncO: {
            label: "Outlands / Orbital / Enclosed",
            callback: () => {
                Location = "Orbital";
                Enclosed = "Enclosed";
                Region = "Outlands";
                PS = "Space";
            }
        },
        DeepSpaceEncO: {
            label: "Outlands / Deep Space / Enclosed",
            callback: () => {
                Location = "Deep Space";
                Enclosed = "Enclosed";
                Region = "Outlands";
                PS = "Space";
            }
        },
        PlanetsideOpenE: {
            label: "Expanse / Planetside / Open Air",
            callback: () => {
                Location = "Planetside";
                Enclosed = "Open Air";
                Region = "Expanse";
                PS = "Planet";
            }
        },
        PlanetsideEncE: {
            label: "Expanse / Planetside / Enclosed",
            callback: () => {
                Location = "Planetside";
                Enclosed = "Enclosed";
                Region = "Expanse";
                PS = "Planet";
            }
        },
        OrbitalEncE: {
            label: "Expanse / Orbital / Enclosed",
            callback: () => {
                Location = "Orbital";
                Enclosed = "Enclosed";
                Region = "Expanse";
                PS = "Space";
            }
        },
        DeepSpaceEncE: {
            label: "Expanse / Deep Space / Enclosed",
            callback: () => {
                Location = "Deep Space";
                Enclosed = "Enclosed";
                Region = "Expanse";
                PS = "Space";
            }
        },
    },
    default: "Planetside",
    close: html => {

        // First layer within the dialog - Tech Level

        CoreFunction(Location, Enclosed, Region);


        //End of the "Close"

    },

    // Bottom end of the dialog box

}, myDialogOptions).render(true);
