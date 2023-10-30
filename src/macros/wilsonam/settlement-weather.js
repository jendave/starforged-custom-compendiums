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
    if (planet == "" || atmosphere == "") {
        return;
    }

    let message = "<h3>Settlement Weather</h3>";
    let table = "";

    const planetary_weather_JSON = '{' +
        '"Desert": {"precipitation_type":"Dust", "table_shift": 2, "special_storm": "Electrical storm", "hab_base": 0, "hab_mult": 5, "uninhab_base": -30, "uninhab_mult": 10},' +
        '"Furnace": {"precipitation_type":"Volcanic ash", "table_shift": 1, "special_storm": "Ash storm", "hab_base": 10, "hab_mult": 5, "uninhab_base": 45, "uninhab_mult": 10},' +
        '"Grave": {"precipitation_type":"Radioactive ash", "table_shift": 1, "special_storm": "Electrical storm", "hab_base": -15, "hab_mult": 5, "uninhab_base": -30, "uninhab_mult": 10},' +
        '"Ice": {"precipitation_type":"Snow", "table_shift": -1, "special_storm": "Blizzard", "hab_base": -45, "hab_mult": 5, "uninhab_base": -90, "uninhab_mult": 10},' +
        '"Jovian": {"precipitation_type":"Water", "table_shift": 0, "special_storm": "Giant superstorm", "hab_base": -15, "hab_mult": 5, "uninhab_base": -15, "uninhab_mult": 5},' +
        '"Jungle": {"precipitation_type":"Water", "table_shift": 2, "special_storm": "Flash floods", "hab_base": 0, "hab_mult": 5, "uninhab_base": 0, "uninhab_mult": 5},' +
        '"Ocean": {"precipitation_type":"Water", "table_shift": 1, "special_storm": "Hurricane", "hab_base": -15, "hab_mult": 5, "uninhab_base": -25, "uninhab_mult": 10},' +
        '"Rocky": {"precipitation_type":"None", "table_shift": -5, "special_storm": "None", "hab_base": -45, "hab_mult": 10, "uninhab_base": -100, "uninhab_mult": 10},' +
        '"Shattered": {"precipitation_type":"Radioactive ash", "table_shift": 3, "special_storm": "Geomagnetic storm", "hab_base": -45, "hab_mult": 10, "uninhab_base": -45, "uninhab_mult": 10},' +
        '"Tainted": {"precipitation_type":"Tainted water", "table_shift": 0, "special_storm": "Corrosive thunderstorm", "hab_base": -15, "hab_mult": 5, "uninhab_base": -15, "uninhab_mult": 5},' +
        '"Vital": {"precipitation_type":"Water", "table_shift": 0, "special_storm": "Thunderstorm", "hab_base": -15, "hab_mult": 5, "uninhab_base": -15, "uninhab_mult": 5}' +
        '}';

    const planetary_weather = JSON.parse(planetary_weather_JSON);
    let planetary_weather_data = "";
    switch (planet) {
        case "Desert":
            planetary_weather_data = planetary_weather.Desert;
            break;
        case "Furnace":
            planetary_weather_data = planetary_weather.Furnace;
            break;
        case "Grave":
            planetary_weather_data = planetary_weather.Grave;
            break;
        case "Ice":
            planetary_weather_data = planetary_weather.Ice;
            break;
        case "Jovian":
            planetary_weather_data = planetary_weather.Jovian;
            break;
        case "Jungle":
            planetary_weather_data = planetary_weather.Jungle;
            break;
        case "Ocean":
            planetary_weather_data = planetary_weather.Ocean;
            break;
        case "Rocky":
            planetary_weather_data = planetary_weather.Rocky;
            break;
        case "Shattered":
            planetary_weather_data = planetary_weather.Shattered;
            break;
        case "Tainted":
            planetary_weather_data = planetary_weather.Tainted;
            break;
        case "Vital":
            planetary_weather_data = planetary_weather.Vital;
            break;
        default:
            planetary_weather_data = planetary_weather.Desert;
    }
    //console.log(planetary_weather_data.precipitation_type);
    //console.log(calculateTemp(planetary_weather_data.hab_base, planetary_weather_data.hab_mult));

    message = message + planet + " world with a " + atmosphere + " atmosphere<br><br>";
    const habitableAtmosphere = ["Marginal", "Breathable", "Ideal"];
    let habitable = true;
    const cloudCoverArray = ["Clear", "Light", "Medium", "Heavy", "Storm"]
    let temperature = 0;

    if (habitableAtmosphere.includes(atmosphere)) {
        table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.xb42QIQbA6Th4hwk");
        temperature = calculateTemp(planetary_weather_data.hab_base, planetary_weather_data.hab_mult);
        habitable = true;
    } else {
        table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.9TGH7jvEw3XnkO95");
        temperature = calculateTemp(planetary_weather_data.uninhab_base, planetary_weather_data.uninhab_mult);
        habitable = false;
    }

    let roll = await table.roll();
    let cloudCoverTemp = roll.results[0].text;
    //console.log(cloudCoverTemp);
    let cloudCoverIndex = cloudCoverArray.indexOf(cloudCoverTemp);
    //console.log("CloudCoverIndex: " + cloudCoverIndex);
    cloudCoverIndex = cloudCoverIndex + planetary_weather_data.table_shift;
    if (cloudCoverIndex < 0) {
        cloudCoverIndex = 0;
    }
    if (cloudCoverIndex > (cloudCoverArray.length - 1)) {
        cloudCoverIndex = cloudCoverArray.length - 1;
    }
    //console.log("CloudCoverIndex: " + cloudCoverIndex);
    let cloudCover = cloudCoverArray[cloudCoverIndex];
    //console.log(cloudCover);

    if (habitable) {
        switch (cloudCover) {
            case "Clear":
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.N9DC5oU4m9bWJ6wZ");
                break;
            case "Light":
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.Nsa5h9rynouI7KOX");
                break;
            case "Medium":
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.RLpB27fCBAoftjS7");
                break;
            case "Heavy":
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.rAPHdSJ9fkOAm8De");
                break;
            case "Storm":
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.cGSlMhHJN7dLLrv2");
                break;
            default:
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.N9DC5oU4m9bWJ6wZ");
        }
    }
    else {
        switch (cloudCover) {
            case "Clear":
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.un3dD2KPiUw3ogJu");
                break;
            case "Light":
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.43frdsUYkvAEMWty");
                break;
            case "Medium":
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.FqN0pRWf5hEidQgn");
                break;
            case "Heavy":
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.YHkQaGsWXpVlGxV2");
                break;
            case "Storm":
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.zrJNtzdjSD7j7QsY");
                break;
            default:
                table = await fromUuid("Compendium.starforged-custom-oracles.starforgedcustomoracles.RollTable.N9DC5oU4m9bWJ6wZ");
        }
    }
    roll = await table.roll();
    let precipitation = roll.results[0].text;

    if (precipitation == "Special storm") {
        precipitation = planetary_weather_data.special_storm;
    }

    let precipitation_type = planetary_weather_data.precipitation_type;

    message = message + "Cloud cover: " + cloudCover + "<br>";
    message = message + "Precipitation: " + precipitation + "<br>";
    message = message + "Precipitation Type: " + precipitation_type + "<br>";
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
                    <option value="Shattered">Shattered</option>
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
