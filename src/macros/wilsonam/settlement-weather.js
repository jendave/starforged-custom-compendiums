// Macro by David Hudson under the MIT license

function printMessage(message) {
    let chatData = { content: message, };
    ChatMessage.create(chatData, {})
};

function calculateTemp(base, mult) {
    const temp = ((Math.floor(Math.random() * 10) + 1) * mult) + base;
    return temp;
}

async function coreFunction(planet, atmosphere) {
    let message = "";
    let table = "";

    const planetary_weather_JSON = '{' +
        '"Desert": {"precipitation_type":"Dust", "table_shift": 2, "special_storm": "Electrical storm", "hab_base": 0, "hab_mult": 5, "uninhab_base": -30, "uninhab_mult": 10},' +
        '"Furnace": {"precipitation_type":"Volcanic ash", "table_shift": 1, "special_storm": "Ash storm", "hab_base": 10, "hab_mult": 5, "uninhab_base": 45, "uninhab_mult": 10},' +
        '"Grave": {"precipitation_type":"Radioactive ash", "table_shift": 1, "special_storm": "Electrical storm", "hab_base": -15, "hab_mult": 5, "uninhab_base": -30, "uninhab_mult": 10},' +
        '"Ice": {"precipitation_type":"Snow", "table_shift": -1, "special_storm": "Blizzard", "hab_base": -45, "hab_mult": 5, "uninhab_base": -90, "uninhab_mult": 10},' +
        '"Jovian": {"precipitation_type":"Water", "table_shift": 0, "special_storm": "Giant superstorm", "hab_base": -15, "hab_mult": 5, "uninhab_base": -15, "uninhab_mult": 5},' +
        '"Jungle": {"precipitation_type":"Water", "table_shift": 2, "special_storm": "Flash floods", "hab_base": 0, "hab_mult": 5, "uninhab_base": 0, "uninhab_mult": 5},' +
        '"Ocean": {"precipitation_type":"Water", "table_shift": 1, "special_storm": "Hurricane", "hab_base": -15, "hab_mult": 5, "uninhab_base": -25, "uninhab_mult": 10},' +
        '"Rocky": {"precipitation_type":"None", "table_shift": 0, "special_storm": "None", "hab_base": -45, "hab_mult": 10, "uninhab_base": -100, "uninhab_mult": 10},' +
        '"Shattered": {"precipitation_type":"Radioactive ash", "table_shift": 3, "special_storm": "Geomagnetic storm", "hab_base": -45, "hab_mult": 10, "uninhab_base": -45, "uninhab_mult": 10},' +
        '"Tainted": {"precipitation_type":"Tainted water", "table_shift": 0, "special_storm": "Corrosive thunderstorm", "hab_base": -15, "hab_mult": 5, "uninhab_base": -15, "uninhab_mult": 5},' +
        '"Vital": {"precipitation_type":"Water", "table_shift": 0, "special_storm": "Thunderstorm", "hab_base": -15, "hab_mult": 5, "uninhab_base": -15, "uninhab_mult": 5}' +
        '}';

    const planetary_weather = JSON.parse(planetary_weather_JSON);
    const tempWeather = planetary_weather.Desert;
    console.log(tempWeather.precipitation_type);
    console.log(calculateTemp(tempWeather.hab_base, tempWeather.hab_mult));

    message = "<b>" + planet + " world with a " + atmosphere + " atmosphere</b><br>";
    const habitable = ["Marginal", "Breathable", "Ideal"];
    const precipitation = ["Clear", "Light", "Medium", "Heavy", "Storm"]

    if (habitable.includes(atmosphere)) {
        table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.xb42QIQbA6Th4hwk");
    } else {
        table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.9TGH7jvEw3XnkO95");
    }

    let roll = await table.roll();
    let cloudCover = roll.results[0].text;
    let temperature = calculateTemp(tempWeather.hab_base, tempWeather.hab_mult);

    message = message + "Cloud cover: " + cloudCover + "<br>";
    message = message + "Temperature: " + temperature + "° C";
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