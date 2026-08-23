/**
 * The set of oracles a Faction sheet rolls, and the behaviour shared by every such set.
 *
 * There are three: the ones in the Starforged rulebook, which the system ships; the expanded ones from the
 * Starsmith supplement, which add six further faction types; and the Sundered Isles ones, also shipped with the
 * system, which describe a faction through several oracles per type instead of one. A subclass states which pack
 * holds its oracles, which Datasworn ids name them, and which types and fields it offers, and inherits
 * everything that acts on those.
 */

import { MODULE_ID } from "./constants.js";
import { drawOracleTable, oracleTable, oracleTables, plainText, splitLinkedRow } from "./oracle-tables.js";

/** The parts of a name template: `{legacy}`, `{identity}` and the like. */
const TEMPLATE_PART = /\{(\w+)}/g;

/**
 * Namespace of the localization keys naming faction types and labelling their aspects.
 *
 * One namespace covers every set: the types the sets share are named the same in each, so a second copy would
 * only be a chance for them to drift apart.
 */
const I18N = "SFCC.FACTION";

/**
 * @typedef {object} FactionType
 * @property {string} key    The value stored in the Actor's `system.type`.
 * @property {string} label  The type's name, as its oracle row gives it.
 * @property {string} text   The phrase the oracle row describes the type with.
 */

export class FactionOracleSource {
    /** The pack holding these oracles, as `<module or system id>.<pack name>`. */
    static PACK = "";

    /** Datasworn ids of every oracle this set can roll, keyed by the name this module uses for it. */
    static ORACLES = {};

    /** Oracles that live in a pack other than {@link PACK}, keyed the same way as {@link ORACLES}. */
    static PACK_OVERRIDES = {};

    /**
     * The faction types this set offers, in rulebook order.
     *
     * Each key is the value stored on the Actor, and — for the sets whose types name an aspect oracle — the
     * {@link ORACLES} key of the oracle behind it: the Dominion, Guild or Corporation table that says what kind
     * of thing the faction is.
     */
    static TYPES = [];

    /**
     * Types whose own {@link ORACLES} entry is the oracle behind the sheet's aspect field.
     *
     * Every type of the Starforged sets has one; a set that describes its types some other way declares none,
     * and its sheet drops the field.
     */
    static get ASPECT_TYPES() {
        return this.TYPES;
    }

    /** Types with a leadership oracle of their own, whose sheet shows the extra field. */
    static LEADERSHIP_TYPES = ["dominion"];

    /** Oracles whose results the sheet appends to the description rather than storing in a field. */
    static DESCRIPTION_ORACLES = ["influence", "projects", "relationships", "quirks", "rumors"];

    /**
     * Oracles the description gets a heading above, keyed the same way as {@link ORACLES}.
     *
     * A heading is for the oracles that only apply under some condition, which their own labels do not say.
     */
    static ORACLE_HEADINGS = {};

    /**
     * Oracles the rulebook asks for more than one result from, as an inclusive range of draws.
     *
     * The count is picked with `Math.random` rather than a `Roll` for the same reason the tables themselves are:
     * how many results an oracle is read for is not a roll the table talks about, and putting it in the dice log
     * would bury the rolls that are.
     */
    static DRAW_COUNTS = {};

    /**
     * The Faction Name Template oracle, as templates over this set's own name oracles, each `{part}` naming an
     * {@link ORACLES} key. A set whose templates are an oracle of their own overrides {@link rollName} instead.
     */
    static NAME_TEMPLATES = [
        { ceiling: 40, template: "{legacy} {affiliation}" },
        { ceiling: 55, template: "{legacy} {identity}" },
        { ceiling: 70, template: "{identity} of the {legacy} {affiliation}" },
        { ceiling: 100, template: "{affiliation} of the {legacy} {identity}" }
    ];

    /* -------------------------------------------- */

    /** The type a faction falls back to when its own could not be rolled. */
    static get defaultType() {
        return this.TYPES[0];
    }

    /**
     * Whether the given type names an oracle for the sheet's aspect field.
     * @param {string} type   A member of {@link TYPES}.
     * @returns {boolean}
     */
    static hasAspect(type) {
        return this.ASPECT_TYPES.includes(type);
    }

    /**
     * Whether the given type has a leadership oracle.
     * @param {string} type   A member of {@link TYPES}.
     * @returns {boolean}
     */
    static hasLeadership(type) {
        return this.LEADERSHIP_TYPES.includes(type);
    }

    /**
     * The oracles the sheet appends to a faction's description, which for some sets depends on its type.
     * @param {string} _type   A member of {@link TYPES}.
     * @returns {string[]} Keys of {@link ORACLES}, in the order the sheet offers and rolls them.
     */
    static descriptionOracles(_type) {
        return this.DESCRIPTION_ORACLES;
    }

    /**
     * The heading the description carries above one oracle's result.
     * @param {string} key   A key of {@link ORACLES}.
     * @returns {string} Empty for the oracles that need none, which is most of them.
     */
    static oracleHeading(key) {
        const label = this.ORACLE_HEADINGS[key];
        return label ? game.i18n.localize(label) : "";
    }

    /**
     * This set's own name for a faction type, used where its oracle cannot be reached.
     * @param {string} type   A member of {@link TYPES}.
     * @returns {string}
     */
    static typeLabel(type) {
        return game.i18n.localize(`${I18N}.TYPE.${type}`);
    }

    /**
     * What a type calls its aspect: a Dominion has a Territory, a Corporation a Field, a Military a Specialty.
     * @param {string} type   A member of {@link TYPES}.
     * @returns {string}
     */
    static aspectLabel(type) {
        return game.i18n.localize(`${I18N}.ASPECT.${type}`);
    }

    /* -------------------------------------------- */
    /*  Types                                       */
    /* -------------------------------------------- */

    /**
     * Read the Faction Type oracles, whose rows carry both halves of a type: a link naming it, then the phrase
     * describing it — "Dominion", "Governing power".
     *
     * Rows are matched to {@link TYPES} through the link's own text, which is the only part of a row that says
     * which type it is. A row naming a type this set does not declare is dropped rather than shown, since
     * nothing here would know which oracle to roll for its aspect.
     * @returns {Promise<FactionType[]>} In the order {@link TYPES} declares; empty if the pack is unreachable.
     */
    static async typeRows() {
        const tables = await oracleTables(this.PACK, this.ORACLES.type);

        const rows = tables.flatMap((table) =>
            table.results.map((result) => {
                const { label, text } = splitLinkedRow(result.description);
                return { key: slugify(label), label, text };
            })
        );

        return this.TYPES.map((key) => rows.find((row) => row.key === key)).filter(Boolean);
    }

    /**
     * Labels for the sheet's type select, reading the way each type's own oracle row does.
     *
     * The oracle is a better source than a label of this module's own, because it is the text the rulebook
     * prints. It is not guaranteed to be there, though — the pack can be disabled — so each type falls back to
     * its localized name.
     * @returns {Promise<Record<string, string>>} Keyed by type, in the order {@link TYPES} declares.
     */
    static async typeChoices() {
        const rows = await this.typeRows();

        return Object.fromEntries(
            this.TYPES.map((key) => {
                const row = rows.find((candidate) => candidate.key === key);
                const label = row?.label || this.typeLabel(key);
                return [key, row?.text ? `${label} — ${row.text}` : label];
            })
        );
    }

    /**
     * Roll a faction type.
     * @returns {Promise<string>} A member of {@link TYPES}; {@link defaultType} if the oracle was unavailable
     *                            or named a type this set does not declare.
     */
    static async rollType() {
        const table = await oracleTable(this.PACK, this.ORACLES.type);
        if (!table) {
            warnMissing(this, "type");
            return this.defaultType;
        }

        const { results } = await table.draw({ displayChat: false });
        const key = this.rowKey(results[0]?.description);
        return this.TYPES.includes(key) ? key : this.defaultType;
    }

    /**
     * The key an oracle row names, read from the link that opens the sub-oracle behind it: a Faction Type row
     * reading "Fringe Group" gives `fringe_group`, a Theme Type row reading "Affluence" gives `affluence`.
     * @param {string} description   The row's description.
     * @returns {string}
     */
    static rowKey(description) {
        return slugify(splitLinkedRow(description).label);
    }

    /* -------------------------------------------- */
    /*  Rolling                                     */
    /* -------------------------------------------- */

    /**
     * Roll the oracle behind a type's aspect.
     * @param {string} type   A member of {@link TYPES}.
     * @returns {Promise<string>} Plain text, empty where the type names no such oracle or it was unavailable.
     */
    static drawAspect(type) {
        return this.hasAspect(type) ? this.drawText(type) : Promise.resolve("");
    }

    /**
     * Roll a type's leadership oracle.
     * @param {string} type   A member of {@link LEADERSHIP_TYPES}.
     * @returns {Promise<string>} Plain text, empty where the type has no such oracle.
     */
    static drawLeadership(type) {
        return this.hasLeadership(type) ? this.drawText("leadership") : Promise.resolve("");
    }

    /**
     * Roll one oracle for its text alone.
     * @param {string} key   A key of {@link ORACLES}.
     * @returns {Promise<string>} Plain text, empty if the oracle was unavailable.
     */
    static async drawText(key) {
        const { description } = await this.draw(key);
        return plainText(description);
    }

    /**
     * Roll one oracle, keeping both halves of the row it draws.
     *
     * Most of these oracles carry their result in the description alone, but a few — Influence among them —
     * name the row as well: "Forsaken", "Banished or forgotten". The oracles read for several results give up
     * their names instead, since a list of results has no one name to carry.
     * @param {string} key   A key of {@link ORACLES}.
     * @returns {Promise<import("./oracle-tables.js").OracleResult>} Empty strings if the oracle was unavailable.
     */
    static async draw(key) {
        const table = await this.table(key);
        if (!table) {
            warnMissing(this, key);
            return { name: "", description: "" };
        }

        const count = this.drawCount(key);
        if (count === 1) return drawOracleTable(table);

        const texts = [];
        for (let draw = 0; draw < count; draw++) {
            const { description } = await drawOracleTable(table);
            const text = plainText(description);
            if (text && !texts.includes(text)) texts.push(text);
        }
        return { name: "", description: texts.join(", ") };
    }

    /**
     * How many results to read one oracle for.
     * @param {string} key   A key of {@link ORACLES}.
     * @returns {number}
     */
    static drawCount(key) {
        const { min = 1, max = 1 } = this.DRAW_COUNTS[key] ?? {};
        return min + Math.floor(Math.random() * (max - min + 1));
    }

    /**
     * Roll a faction name from the Faction Name oracles.
     * @param {string} _type   The faction's type, which some sets name differently for.
     * @returns {Promise<string>} The assembled name, or an empty string if the oracles were unavailable.
     */
    static async rollName(_type) {
        const roll = await new Roll("1d100").evaluate();
        const { template } = this.NAME_TEMPLATES.find((row) => roll.total <= row.ceiling);

        const keys = [...new Set(Array.from(template.matchAll(TEMPLATE_PART), ([, key]) => key))];

        const parts = {};
        for (const key of keys) parts[key] = await this.drawText(key);

        // A name missing one of its parts would read as a mistake rather than as a shorter name.
        if (keys.some((key) => !parts[key])) return "";

        return template.replace(TEMPLATE_PART, (_match, key) => parts[key]);
    }

    /* -------------------------------------------- */

    /**
     * The table one oracle names, from whichever pack holds it.
     * @param {string} key   A key of {@link ORACLES}.
     * @returns {Promise<RollTable|undefined>}
     */
    static async table(key) {
        const dsid = this.ORACLES[key];
        if (!dsid) return undefined;
        return oracleTable(this.PACK_OVERRIDES[key] ?? this.PACK, dsid);
    }
}

/**
 * Report an oracle that could not be reached, which happens when its pack is disabled or empty, or its module
 * has been updated in a way that renames the id.
 *
 * A function rather than a method of the class: a private static member belongs to the class that declares it
 * and throws when reached through a subclass, and every set here but the rulebook's own is a subclass.
 * @param {typeof FactionOracleSource} source   The set whose oracle is missing.
 * @param {string} key                         A key of the set's `ORACLES`.
 */
function warnMissing(source, key) {
    const pack = source.PACK_OVERRIDES[key] ?? source.PACK;
    console.warn(`${MODULE_ID} | No oracle table found in ${pack} for "${key}" (${source.ORACLES[key]})`);
}

/**
 * Reduce an oracle row's label to the key this module stores it under: "Fringe Group" to `fringe_group`.
 * @param {string} label   The label read out of a row.
 * @returns {string}
 */
function slugify(label) {
    return label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/^_|_$/g, "");
}
