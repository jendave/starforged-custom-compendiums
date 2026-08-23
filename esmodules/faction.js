/**
 * Entry point for the Faction Actor subtype.
 *
 * Foundry lets a module contribute Document subtypes: the manifest declares them under `documentTypes` and
 * the module supplies the matching data model and sheet at `init`. No hook into the Ironsworn & Starforged
 * system is needed, and the system does not have to know this module exists.
 *
 * There is one subtype however many sets of faction oracles there are. A Starsmith or Sundered Isles faction
 * differs only in which tables its sheet rolls, which the Actor records in `system.oracles`.
 */

import { FACTION_TYPE, MODULE_ID, SYSTEM_ID } from "./constants.js";
import { FactionModel } from "./faction-model.js";
import {
    isFactionEnabled,
    isFactionStarsmithEnabled,
    isFactionSunderedIslesEnabled,
    registerFactionSettings
} from "./faction-settings.js";
import { FactionSheet } from "./faction-sheet.js";

// Imported for its hook registration; it is a no-op unless the system's create dialog is on screen.
import "./faction-create-button.js";

Hooks.once("init", () => {
    // The Faction is an Ironsworn & Starforged concept and its sheet rolls the system's oracles, so it has
    // nothing to offer any other system — including the settings, which would only be clutter there.
    if (game.system.id !== SYSTEM_ID) return;

    registerFactionSettings();

    // Any one button is reason enough to register the subtype, and turning them all off is what withdraws it.
    if (!isFactionEnabled() && !isFactionStarsmithEnabled() && !isFactionSunderedIslesEnabled()) return;

    CONFIG.Actor.dataModels[FACTION_TYPE] = FactionModel;
    CONFIG.Actor.typeLabels[FACTION_TYPE] = `TYPES.Actor.${FACTION_TYPE}`;
    CONFIG.Actor.typeIcons[FACTION_TYPE] = "fa-solid fa-flag-swallowtail";

    foundry.documents.collections.Actors.registerSheet(MODULE_ID, FactionSheet, {
        types: [FACTION_TYPE],
        label: "SFCC.FACTION.Sheet",
        makeDefault: true
    });

    console.log(`${MODULE_ID} | Registered the "${FACTION_TYPE}" Actor subtype`);
});
