/**
 * Shared identifiers for the code side of this module.
 *
 * The module id and the directory name differ, so the id is kept here rather than derived from a path.
 */

export const MODULE_ID = "starforged-custom-oracles";

export const SYSTEM_ID = "foundry-ironsworn";

/** The supplement supplying the expanded faction oracles, which the Starsmith Faction button needs. */
export const STARSMITH_ID = "starsmith-expanded-oracles";

/**
 * Prefix of the system's own settings for the rulesets its Configuration dialog turns on and off, one per
 * ruleset id: `ruleset-starforged`, `ruleset-sundered_isles`.
 *
 * The Sundered Isles oracles ship with the system rather than with a module of their own, so its ruleset being
 * enabled is what says a world plays with them.
 */
export const RULESET_SETTING_PREFIX = "ruleset-";

/**
 * Foundry namespaces module-provided Document subtypes with the id of the module that declared them, so
 * the Actor type is not simply "faction". This must match the key under `documentTypes.Actor` in
 * module.json.
 */
export const FACTION_TYPE = `${MODULE_ID}.faction`;

/** The world settings that turn the Faction buttons on and off. */
export const FACTION_SETTING = "factionActor";

export const FACTION_STARSMITH_SETTING = "factionStarsmithActor";

export const FACTION_SUNDERED_ISLES_SETTING = "factionSunderedIslesActor";
