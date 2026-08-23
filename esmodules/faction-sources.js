/**
 * The oracle sets a Faction can be rolled from, and the key each is stored under.
 *
 * A Faction is one Actor subtype whichever set it uses: the sets differ only in which tables the sheet rolls,
 * which is data rather than structure. The Actor records its set in `system.oracles`, so a world can hold
 * factions of every kind side by side and each sheet rolls the tables its own faction was built from.
 */

import { FactionOracles } from "./faction-oracles.js";
import { FactionStarsmithOracles } from "./faction-starsmith-oracles.js";
import { FactionSunderedIslesOracles } from "./faction-sundered-isles-oracles.js";

/** Keyed by the value stored in `system.oracles`. */
export const FACTION_SOURCES = {
    starforged: FactionOracles,
    starsmith: FactionStarsmithOracles,
    sundered_isles: FactionSunderedIslesOracles
};

/** The set a faction uses when it does not say, which is every faction created before there was a choice. */
export const DEFAULT_SOURCE = "starforged";

/**
 * The oracle set a faction rolls from.
 * @param {string} key   A key of {@link FACTION_SOURCES}.
 * @returns {typeof FactionOracles} The rulebook's set where the key is unknown, which is what a faction from a
 *                                 supplement that has since been removed falls back to.
 */
export function factionSource(key) {
    return FACTION_SOURCES[key] ?? FACTION_SOURCES[DEFAULT_SOURCE];
}

/**
 * Every faction type any of the sets offers, which is what the model's `type` field has to accept: one subtype
 * holds factions from all of them, so the field cannot be narrowed to any one set's list.
 * @returns {string[]}
 */
export function factionTypes() {
    return [...new Set(Object.values(FACTION_SOURCES).flatMap((source) => source.TYPES))];
}
