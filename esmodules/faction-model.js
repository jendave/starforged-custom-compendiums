/**
 * Data model for the Faction Actor subtype.
 *
 * Kept deliberately close to the system's own Location model: a handful of fields that drive the sheet's
 * oracle choices, and a rich-text description that the remaining oracle results are appended to. Influence
 * lives in that description rather than in a field of its own, because its oracle gives both a level and a
 * sentence describing it and only the pair is worth reading.
 */

import { DEFAULT_SOURCE, FACTION_SOURCES, factionTypes } from "./faction-sources.js";

export class FactionModel extends foundry.abstract.TypeDataModel {
    /** @override */
    static defineSchema() {
        const fields = foundry.data.fields;
        return {
            /**
             * Which set of faction oracles this faction was built from, and the one its sheet keeps rolling.
             * Factions created before there was a choice have no value here and take the rulebook's set.
             */
            oracles: new fields.StringField({
                required: true,
                blank: false,
                initial: DEFAULT_SOURCE,
                choices: Object.keys(FACTION_SOURCES)
            }),
            /**
             * The faction type. Every set's types are accepted, because one subtype holds factions from all of
             * them; the sheet offers only those of the set the faction itself uses.
             */
            type: new fields.StringField({
                required: true,
                blank: false,
                initial: "dominion",
                choices: factionTypes()
            }),
            /** The result of the oracle behind the faction's type: its territory, field, specialty and so on. */
            aspect: new fields.StringField({ required: true, blank: true, initial: "" }),
            /** Dominion leadership; unused by the faction types that have no leadership oracle. */
            leadership: new fields.StringField({ required: true, blank: true, initial: "" }),
            description: new fields.HTMLField({ required: true, blank: true, initial: "" })
        };
    }
}
