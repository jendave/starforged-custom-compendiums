/**
 * The world settings that turn the Faction buttons in the "Create Actor" dialog on and off.
 *
 * Every button makes the same Actor subtype, and turning them all off is what withdraws it. Foundry only accepts
 * Document subtypes at `init`, so the subtype cannot be added or removed while a world is running: the
 * settings ask for a reload when they change.
 */

import {
    FACTION_SETTING,
    FACTION_STARSMITH_SETTING,
    FACTION_SUNDERED_ISLES_SETTING,
    MODULE_ID,
    RULESET_SETTING_PREFIX,
    STARSMITH_ID,
    SYSTEM_ID
} from "./constants.js";

/**
 * Register the settings. Must run during `init`, before anything reads them.
 * @returns {void}
 */
export function registerFactionSettings() {
    game.settings.register(MODULE_ID, FACTION_SETTING, {
        name: "SFCC.SETTINGS.FactionActor.Name",
        hint: "SFCC.SETTINGS.FactionActor.Hint",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        requiresReload: true
    });

    // Offered only where its oracles are: without them the button's factions would have nothing to roll.
    if (isStarsmithAvailable()) {
        game.settings.register(MODULE_ID, FACTION_STARSMITH_SETTING, {
            name: "SFCC.SETTINGS.FactionStarsmithActor.Name",
            hint: "SFCC.SETTINGS.FactionStarsmithActor.Hint",
            scope: "world",
            config: true,
            type: Boolean,
            default: true,
            requiresReload: true
        });
    }

    // Registered whether or not the Sundered Isles ruleset is on. Which rulesets a world plays with is a setting
    // of the system's own that can be changed at any time, so hiding this one behind it would leave the button
    // unreachable until a reload; the button reads the ruleset itself, each time the dialog opens.
    game.settings.register(MODULE_ID, FACTION_SUNDERED_ISLES_SETTING, {
        name: "SFCC.SETTINGS.FactionSunderedIslesActor.Name",
        hint: "SFCC.SETTINGS.FactionSunderedIslesActor.Hint",
        scope: "world",
        config: true,
        type: Boolean,
        default: true,
        requiresReload: true
    });
}

/**
 * Whether the Starsmith supplement is supplying its packs to this world.
 *
 * Being active is the test rather than being installed, because an inactive module contributes no compendium
 * packs and the expanded oracles could not be rolled.
 * @returns {boolean}
 */
export function isStarsmithAvailable() {
    return game.modules.get(STARSMITH_ID)?.active === true;
}

/**
 * Whether this world offers factions built from the rulebook's oracles.
 *
 * The system check comes first because the settings are only registered once it passes, and asking Foundry for
 * an unregistered setting throws.
 * @returns {boolean}
 */
export function isFactionEnabled() {
    return game.system.id === SYSTEM_ID && game.settings.get(MODULE_ID, FACTION_SETTING) === true;
}

/**
 * Whether this world offers factions built from the Starsmith supplement's oracles.
 * @returns {boolean}
 */
export function isFactionStarsmithEnabled() {
    return (
        game.system.id === SYSTEM_ID &&
        isStarsmithAvailable() &&
        game.settings.get(MODULE_ID, FACTION_STARSMITH_SETTING) === true
    );
}

/**
 * Whether this world offers factions built from the Sundered Isles oracles.
 *
 * The ruleset those oracles belong to is deliberately not part of the answer: this is read at `init` to decide
 * whether the Actor subtype exists at all, and a subtype withdrawn because the ruleset happened to be off would
 * leave a world's factions unopenable until it was turned back on and the page reloaded. Whether the button is
 * offered is the ruleset's business, and the create dialog asks {@link isRulesetEnabled} when it opens.
 * @returns {boolean}
 */
export function isFactionSunderedIslesEnabled() {
    return (
        game.system.id === SYSTEM_ID &&
        game.settings.get(MODULE_ID, FACTION_SUNDERED_ISLES_SETTING) === true
    );
}

/**
 * Whether the world plays with one of the system's rulesets, as its Configuration dialog sets them.
 *
 * The system registers its rulesets in an `init` hook of its own, and asking Foundry for an unregistered setting
 * throws, so the answer is only reliable once both packages have initialized — which is why nothing reads it
 * before the create dialog opens.
 * @param {string} ruleset   A ruleset id: "starforged", "sundered_isles".
 * @returns {boolean}
 */
export function isRulesetEnabled(ruleset) {
    const setting = `${RULESET_SETTING_PREFIX}${ruleset}`;
    if (!game.settings.settings.has(`${SYSTEM_ID}.${setting}`)) return false;
    return game.settings.get(SYSTEM_ID, setting) === true;
}
