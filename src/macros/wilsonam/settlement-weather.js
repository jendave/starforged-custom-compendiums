// Macro by David Hudson under the MIT license

function printMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
};

async function coreFunction(planet, atmosphere) {
    let message = "";
    let table = "";
    message = "<b>" + planet + " world with a " + atmosphere + " atmosphere</b><br>";
    const habitable = ["Marginal", "Breathable", "Ideal"];

    if (habitable.includes(atmosphere)) {
        table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.xb42QIQbA6Th4hwk");
    } else {
        table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.9TGH7jvEw3XnkO95");
    }

    let roll = await table.roll();
    let cloudCover = roll.results[0].text;

    message = message + "The planet greets you with " + cloudCover;
    printMessage(message);
}

try {
    let planet = "";
    let atmosphere = "";

    let d = new Dialog({
        title: 'Select Planet and Atmosphere',
        content: `
        <form class="flexcol">
            <div class="form-group">
                <label for="selectPlanet">Planet</label>
                <select name="selectPlanet">
                    <option value="Desert">Desert</option>
                    <option value="Furnace">Furnace</option>
                    <option value="Grave">Grave</option>
                    <option value="Ice">Ice</option>
                    <option value="Jovian">Jovian</option>
                    <option value="Jungle">Jungle</option>
                    <option value="Ocean">Ocean</option>
                    <option value="Rocky">Rocky</option>
                    <option value="shattered">Shattered</option>
                    <option value="Tainted">Tainted</option>
                    <option value="Vital">Vital</option>
                </select>
            </div>
            <div class="form-group">
                <label for="selectAtmosphere">Atmosphere</label>
                <select name="selectAtmosphere">
                    <option value="None / Thin">None / Thin</option>
                    <option value="Toxic">Toxic</option>
                    <option value="Corrosive">Corrosive</option>
                    <option value="Marginal">Marginal</option>
                    <option value="Breathable">Breathable</option>
                    <option value="Ideal">Ideal</option>
                </select>
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
                    planet = html.find('[name="selectPlanet"]').val();
                    atmosphere = html.find('[name="selectAtmosphere"]').val();
                }
            },
        },
        default: 'yes',
        close: () => {
            coreFunction(planet, atmosphere);
        }
    }).render(true)
}
catch (e) {
    console.log("The Dialog was closed without a choice being made.");
}