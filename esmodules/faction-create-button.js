/**
 * Adds the Faction buttons to the system's "Create Actor" dialog, below the Location button.
 *
 * The system replaces Foundry's own `Actor.createDialog` with a `CreateActorDialog` whose buttons come from
 * a private array, so a module-provided Actor subtype cannot reach that dialog by declaration alone.
 * Appending the buttons when the dialog renders is the least invasive way in: nothing in the system is
 * patched, and if the system ever reworks the dialog this hook finds no anchor and quietly does nothing.
 *
 * Every button creates the same Actor subtype. They differ in the set of oracles the new faction is built from,
 * which they record on it.
 */

import { FACTION_TYPE, MODULE_ID } from "./constants.js";
import {
    isFactionEnabled,
    isFactionStarsmithEnabled,
    isFactionSunderedIslesEnabled,
    isRulesetEnabled
} from "./faction-settings.js";
import { factionSource } from "./faction-sources.js";

/** The system's Location button, which the Faction buttons are inserted after where the dialog offers it. */
const ANCHOR_SELECTOR = ".ironsworn__sflocation__create";

/**
 * The buttons this module offers the dialog, in the order they appear.
 *
 * Every image is a blank heraldic standard, from the game-icons.net art this module already ships.
 * Deliberately blank: they are a starting point the player replaces with the faction's own emblem, so they
 * must not imply an identity.
 */
const BUTTONS = [
    {
        oracles: "starforged",
        label: "SFCC.FACTION.Create",
        img: "dark-squad.svg",
        ruleset: "starforged",
        enabled: isFactionEnabled
    },
    {
        oracles: "starsmith",
        label: "SFCC.FACTION.CreateStarsmith",
        img: "dark-squad.svg",
        ruleset: "starforged",
        enabled: isFactionStarsmithEnabled
    },
    {
        oracles: "sundered_isles",
        label: "SFCC.FACTION.CreateSunderedIsles",
        img: "black-flag.svg",
        ruleset: "sundered_isles",
        enabled: isFactionSunderedIslesEnabled
    }
];

/**
 * The system's `DEFAULT_OPTIONS.id` for its create dialog.
 *
 * `renderApplicationV2` is used rather than the per-class `render<ClassName>` hook because Foundry derives
 * that hook name from the runtime class name, and the system's bundler rewrites the class to
 * `_CreateActorDialog` when it lowers static members — so `renderCreateActorDialog` never fires. The
 * options id is authored, not generated, so it survives any rebuild.
 */
const DIALOG_ID = "new-actor-dialog";

Hooks.on("renderApplicationV2", (app, element) => {
    if (app.id !== DIALOG_ID) return;

    let anchor = findAnchor(element);
    if (!anchor) return;

    let added = 0;
    for (const button of BUTTONS) {
        // Each button belongs to the ruleset whose oracles it rolls, and the dialog is where that is read: which
        // rulesets a world plays with is a setting the system's Configuration dialog changes as the game goes on.
        if (!button.enabled() || !isRulesetEnabled(button.ruleset)) continue;

        const className = buttonClass(button);
        if (element.querySelector(`.${className}`)) continue;

        const row = buildButtonRow(button, className);
        anchor.insertAdjacentElement("afterend", row);
        row.querySelector(`.${className}`).addEventListener("click", () => void createFaction(app, button));

        added += row.offsetHeight;

        // Keeps the declared order: each button goes below the one before it rather than above.
        anchor = row;
    }

    // The dialog computes its height from the number of buttons it knows about, so make room for ours.
    if (added) app.setPosition({ height: app.position.height + added });
});

/**
 * The row the Faction buttons are inserted after.
 *
 * Location is the anchor where the dialog offers it, which keeps the Faction buttons among the Starforged ones.
 * A world playing Sundered Isles need not have the Starforged ruleset enabled at all, though, and the dialog
 * then offers nothing but its Character row — so the last row of the last group is the fallback, which is that
 * row when it is the only one.
 * @param {HTMLElement} element   The dialog's rendered element.
 * @returns {HTMLElement|null}
 */
function findAnchor(element) {
    const location = element.querySelector(ANCHOR_SELECTOR)?.closest(".boxrow");
    if (location) return location;

    const groups = element.querySelectorAll(".boxgroup");
    const rows = groups[groups.length - 1]?.querySelectorAll(":scope > .boxrow");
    return rows?.[rows.length - 1] ?? null;
}

/**
 * The class marking one button, which is what stops it being added twice.
 * @param {{oracles: string}} button   The button's configuration.
 * @returns {string}
 */
function buttonClass(button) {
    return `${MODULE_ID}__faction-${button.oracles}__create`;
}

/**
 * Build a button row matching the ones the system's create dialog renders from its own template.
 * @param {object} button        The button's configuration.
 * @param {string} className     The class marking the button.
 * @returns {HTMLDivElement}
 */
function buildButtonRow(button, className) {
    const src = imagePath(button);

    const row = document.createElement("div");
    row.className = "flexcol nogrow boxrow";

    const box = document.createElement("div");
    box.className = "flexcol box";
    row.append(box);

    const clickable = document.createElement("div");
    clickable.className = `flexrow clickable block no-border ${className}`;
    clickable.style.alignItems = "center";
    clickable.dataset.img = src;
    box.append(clickable);

    const img = document.createElement("img");
    img.className = "nogrow";
    img.src = src;
    img.width = 50;
    img.height = 50;
    img.alt = "";
    clickable.append(img);

    const heading = document.createElement("h3");
    heading.style.cssText = "border: none; margin: 0; padding: 0.5rem;";
    heading.textContent = game.i18n.localize(button.label);
    clickable.append(heading);

    return row;
}

/**
 * Create a Faction and open its sheet, the way the system's own buttons do.
 * @param {ApplicationV2} app   The create dialog, which holds the folder the user created from.
 * @param {object} button       The button's configuration, which names the oracles the faction is built from.
 * @returns {Promise<void>}
 */
async function createFaction(app, button) {
    const actor = await Actor.create({
        name: game.i18n.localize(CONFIG.Actor.typeLabels[FACTION_TYPE]),
        img: imagePath(button),
        type: FACTION_TYPE,
        // The type comes from the set as well: the sets do not all offer the same types, so the field's own
        // initial value would leave a new faction as a type its sheet has no oracles for.
        system: { oracles: button.oracles, type: factionSource(button.oracles).defaultType },
        prototypeToken: { actorLink: true },
        folder: app.folder || undefined
    });

    await actor?.sheet?.render({ force: true });
    await app.close();
}

/**
 * @param {{img: string}} button   The button's configuration.
 * @returns {string} The path to the button's artwork, which is also the new Actor's portrait.
 */
function imagePath(button) {
    return `modules/${MODULE_ID}/assets/${button.img}`;
}
