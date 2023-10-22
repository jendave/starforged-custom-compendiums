// Macro by David Hudson under the MIT License.

function fPrintMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
};

async function coreFunction(dice, modifier, worldType) {
    rollFormula = dice + " + " + modifier;
    let numberOfMoonsTmp = new Roll(rollFormula, { modifier: modifier });
    await numberOfMoonsTmp.evaluate();
    let numberOfMoons = numberOfMoonsTmp.total < 0 ? 0 : numberOfMoonsTmp.total;

    message = message + worldType + " with " + numberOfMoons.toString() + " moon" + (numberOfMoons == 1 ? "" : "s") + "<br><br>";

    for (let step = 1; step <= numberOfMoons; step++) {
        message = message + step.toString() + ": ";
        table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.SUJkUek80DWdqspV");
        roll = await table.roll();

        if (roll.results[0].text.split(' ')[0] == "Sister") {
            message = message + "Sister Moons:<br>";
            numberOfMoons = numberOfMoons + 2
        } else if (roll.results[0].text.split(' ')[0] == "Artificial") {
            message = message + "Artificial Moon:<br>";
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.N58Y34S1B9ooTmbC");
            roll = await table.roll();
            message = message + "Atmosphere: " + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.V7T0kBSB6SPDDTcb");
            roll = await table.roll();
            message = message + "Life: " + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.VmXV4O1ICHAcP0ZV");
            roll = await table.roll();
            message = message + "Form: " + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.bjTD1YHmQeQyJ8lh");
            roll = await table.roll();
            message = message + "Features: " + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.bjTD1YHmQeQyJ8lh");
            roll = await table.roll();
            message = message + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.As3p71XL94Geqn5w");
            roll = await table.roll();
            message = message + "Perils: " + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.7NoCmNWYPO6yEgP9");
            roll = await table.roll();
            message = message + "Opportunities: " + roll.results[0].text + "<br>";
        } else if (roll.results[0].text.split(' ')[0] == "Dust") {
            message = message + "Dust Ring:<br>";
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.i9Aeb38RIMsMVqWM");
            roll = await table.roll();
            message = message + "Atmosphere: " + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.H2vXAYLxRWS1Ipkz");
            roll = await table.roll();
            message = message + "Features: " + roll.results[0].text + "<br>";

            roll = await table.roll();
            message = message + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.LkVyAWVWxHaVfOpX");
            roll = await table.roll();
            message = message + "Perils: " + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.3u05KTcbYUPA8HPc");
            roll = await table.roll();
            message = message + "Opportunities: " + roll.results[0].text + "<br>";

        } else if (roll.results[0].text.split(' ')[0] == "Crystalline") {
            message = message + "Crystalline Moon:<br>";
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.JVnw5VE7w4dL3KAu");
            roll = await table.roll();
            message = message + "Atmosphere: " + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.BVhF0gVo87eRKIty");
            roll = await table.roll();
            message = message + "Features: " + roll.results[0].text + "<br>";

            roll = await table.roll();
            message = message + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.I38e71hzVByuAwWf");
            roll = await table.roll();
            message = message + "Perils: " + roll.results[0].text + "<br>";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.8DKXh0JvTvFeq0lG");
            roll = await table.roll();
            message = message + "Opportunities: " + roll.results[0].text + "<br>";
        } else if (roll.results[0].text.split(' ')[0] == "Exotic") {
            message = message + "Exotic Moon:<br>";
            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.g7xmcQZ1ch2Ei77o");
            roll = await table.roll();
            message = message + "Exotic Feature: " + "<br>" + roll.results[0].text + " ";

            table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.tL7jrXCa0Lz2kJW7");
            roll = await table.roll();
            message = message + roll.results[0].text + "<br>";
        }
        else {
            message = message + roll.results[0].text + "<br>";
        }
        console.log(roll.results[0]);
    }
    fPrintMessage(message);
}

const myDialogOptions = {
    scale: 1,
    id: "world-selector"
};

let modifier = 0;
let dice = '1d6';
let message = "";
let numberOfMoons = 0;
let worldType = "";

new Dialog({
    title: "Better + Moons",
    content: `<style>
    #world-selector .dialog-buttons {
        flex-direction: column;
    }
    </style>
    <p>Select Type of World: </p>`,
    buttons:
    {
        desert: {
            label: "Desert World",
            callback: () => {
                dice = "1d6";
                modifier = -1;
                worldType = "Desert World";
            }
        },
        furnace: {
            label: "Furnace World",
            callback: () => {
                dice = "1d6";
                modifier = "-2";
                worldType = "Furnace World";
            }
        },
        grave: {
            label: "Grave World",
            callback: () => {
                dice = "1d6";
                modifier = "-2";
                worldType = "Grave World";
            }
        },
        ice: {
            label: "Ice World",
            callback: () => {
                dice = "1d6";
                modifier = "0";
                worldType = "Ice World";
            }
        },
        jovian: {
            label: "Jovian World",
            callback: () => {
                dice = "3d6";
                modifier = "-5";
                worldType = "Jovian World";
            }
        },
        jungle: {
            label: "Jungle World",
            callback: () => {
                dice = "1d6";
                modifier = "-2";
                worldType = "Jungle World";
            }
        },
        ocean: {
            label: "Ocean World",
            callback: () => {
                dice = "1d6";
                modifier = "-2";
                worldType = "Ocean World";
            }
        },
        rocky: {
            label: "Rocky World",
            callback: () => {
                dice = "1d6";
                modifier = "-2";
                worldType = "Rocky World";
            }
        },
        shattered: {
            label: "Shattered World",
            callback: () => {
                dice = "1d6";
                modifier = "-3";
                worldType = "Shattered World";
            }
        },
        tainted: {
            label: "Tainted World",
            callback: () => {
                dice = "1d6";
                modifier = "-2";
                worldType = "Tainted World";
            }
        },
        vital: {
            label: "Vital World",
            callback: () => {
                dice = "1d6";
                modifier = "-3";
                worldType = "Vital World";
            }
        },
        custom: {
            label: "Custom World",
            callback: () => {
                dice = "1d6";
                modifier = "-2";
                worldType = "Custom World";
            }
        },
    },
    default: "desert",
    close: html => {
        coreFunction(dice, modifier, worldType);
    },
}, myDialogOptions).render(true);
