/**
 * The Faction oracles from the Sundered Isles rulebook, which the system ships alongside the Starforged ones.
 *
 * These describe a faction differently from the Starforged sets: instead of one aspect oracle per type there are
 * three, and their results are lists rather than single phrases — a Society is read for two or three Chronicles
 * and up to three Touchstones. So the sheet keeps none of them in a field of its own; they all go to the
 * description, along with the Cursed oracles every faction here may be read for.
 *
 * Names work differently too. The one oracle this set needs and the rulebook does not print is the template
 * saying how the name oracles are arranged, so that one is a table of this module's own — see
 * {@link FactionSunderedIslesOracles.NAME_TEMPLATE_TABLES} — and reading it is what {@link rollName} does.
 */

import { MODULE_ID, SYSTEM_ID } from "./constants.js";
import { FactionOracleSource } from "./faction-source.js";
import { plainText, rowMarkup } from "./oracle-tables.js";

const DSID = "oracle_rollable:sundered_isles/faction";

/** The pack this module ships its own oracles in, which is where the name templates live. */
const CUSTOM_PACK = `${MODULE_ID}.starforgedcustomoracles`;

/**
 * A link in a name template, along with the Aspect or Persona that may follow one to the Theme Type oracle.
 *
 * A template is written the way a rulebook prints one — "Theme Type Aspect Empire Identity" — with each oracle
 * a link to its table, so the words between the links are the ones the name keeps verbatim.
 */
const TEMPLATE_LINK = /@\w+\[([^\]]+)]\{([^}]*)}(?:\s+(aspect|persona)\b)?/gi;

/** The themes a faction name can be built around, each with an Aspect and a Persona oracle of its own. */
const THEMES = [
    "affluence",
    "craft",
    "curses",
    "discovery",
    "faith",
    "loyalty",
    "mysticism",
    "rebellion",
    "secrecy",
    "war"
];

/** Every theme's Aspect and Persona oracle, as ORACLES entries. */
const THEME_ORACLES = Object.fromEntries(
    THEMES.flatMap((theme) => [
        [`theme_${theme}_aspect`, `${DSID}/name/themes/${theme}/aspect`],
        [`theme_${theme}_persona`, `${DSID}/name/themes/${theme}/persona`]
    ])
);

export class FactionSunderedIslesOracles extends FactionOracleSource {
    /** @override */
    static PACK = `${SYSTEM_ID}.sunderedislesoracles`;

    /** @override */
    static ORACLES = {
        type: `${DSID}/type`,
        influence: `${DSID}/influence`,
        relationship: `${DSID}/relationship`,
        society_chronicles: `${DSID}/society/chronicles`,
        society_overseers: `${DSID}/society/overseers`,
        society_touchstones: `${DSID}/society/touchstones`,
        organization_type: `${DSID}/organization/type`,
        organization_methods: `${DSID}/organization/methods`,
        organization_secrets: `${DSID}/organization/secrets`,
        empire_leadership: `${DSID}/empire/leadership`,
        empire_tactics: `${DSID}/empire/tactics`,
        empire_vulnerabilities: `${DSID}/empire/vulnerabilities`,
        cursed_role: `${DSID}/cursed/role`,
        cursed_aspects: `${DSID}/cursed/aspects`,
        culture: `${DSID}/name/culture`,
        identity_society: `${DSID}/name/identity_society`,
        identity_organization: `${DSID}/name/identity_organization`,
        identity_empire: `${DSID}/name/identity_empire`,
        theme_type: `${DSID}/name/themes/type`,
        ...THEME_ORACLES
    };

    /** @override */
    static TYPES = ["society", "organization", "empire"];

    /** A type here is described by the three oracles of its own collection, so there is no single aspect. */
    static ASPECT_TYPES = [];

    /** @override */
    static LEADERSHIP_TYPES = [];

    /** The oracles read for every faction, whatever its type. */
    static DESCRIPTION_ORACLES = ["influence", "relationship"];

    /** The three oracles that describe a faction of each type. */
    static TYPE_DETAILS = {
        society: ["society_chronicles", "society_overseers", "society_touchstones"],
        organization: ["organization_type", "organization_methods", "organization_secrets"],
        empire: ["empire_leadership", "empire_tactics", "empire_vulnerabilities"]
    };

    /**
     * The Cursed oracles, read last.
     *
     * They are offered for every faction rather than only for the cursed, because whether a faction is one of
     * the cursed is the reader's call and the oracles are how that call gets made.
     */
    static CURSED_ORACLES = ["cursed_role", "cursed_aspects"];

    /**
     * The Cursed oracles describe a faction that is one of the cursed, which not every faction is, so the
     * description says as much above them rather than reading as though the cursed were the rule.
     * @override
     */
    static ORACLE_HEADINGS = { cursed_role: "SFCC.FACTION.HEADING.cursed" };

    /** @override */
    static DRAW_COUNTS = {
        society_chronicles: { min: 2, max: 3 },
        society_touchstones: { min: 1, max: 3 },
        organization_methods: { min: 1, max: 2 },
        organization_secrets: { min: 1, max: 2 },
        empire_tactics: { min: 2, max: 3 },
        empire_vulnerabilities: { min: 1, max: 2 },
        cursed_aspects: { min: 1, max: 2 }
    };

    /**
     * The Faction Name oracles, one per type, which this module ships in its own pack.
     *
     * Sundered Isles gives the name oracles but no template oracle arranging them, the way the Starforged sets
     * have, so these tables supply that. They are held by document id rather than by Datasworn id because they
     * are this module's own content: the ids are authored in the pack's source, so they outlive a rebuild,
     * and nothing generated them from Datasworn to carry an id of that kind.
     */
    static NAME_TEMPLATE_TABLES = {
        society: "K77VFo8d1qwDKW0Q",
        organization: "gbisiVcz4HISg1zy",
        empire: "2SlwMddgLG7GM53K"
    };

    /**
     * The oracles a name template links to, by the text of the link naming them.
     *
     * Matching on the link text rather than on what it points at keeps these rolls on the Datasworn ids the
     * rest of the sheet uses, which survive the system rebuilding its packs where a document id does not. A
     * link to anything else still works — see {@link drawLinked} — so a template can name an oracle this
     * module has never heard of.
     */
    static NAME_ORACLES = {
        "Faction Name: Culture": "culture",
        "Faction Name: Society Identity": "identity_society",
        "Faction Name: Organization Identity": "identity_organization",
        "Empire Identity": "identity_empire",
        "Theme Type": "theme_type"
    };

    /* -------------------------------------------- */

    /** @override */
    static descriptionOracles(type) {
        return [...this.DESCRIPTION_ORACLES, ...(this.TYPE_DETAILS[type] ?? []), ...this.CURSED_ORACLES];
    }

    /**
     * Roll a name from the Faction Name oracle for the faction's type, which is a template rather than a name:
     * its row links the oracles the name is built from and spells out the words between them.
     * @override
     */
    static async rollName(type) {
        const table = await this.nameTemplateTable(type);
        if (!table) {
            console.warn(`${MODULE_ID} | No Faction Name oracle found for the "${type}" type`);
            return "";
        }

        const { results } = await table.draw({ displayChat: false });
        const template = rowMarkup(results[0]?.description);
        return template ? this.fillNameTemplate(template) : "";
    }

    /**
     * Roll the oracles a name template links, keeping everything it spells out between them.
     *
     * A link to the Theme Type oracle followed by "Aspect" or "Persona" is the rulebook's shorthand for two
     * rolls: the theme first, then that theme's own table. One theme serves the whole name, so that a name
     * holding both an Aspect and a Persona reads as one idea rather than two.
     * @param {string} template   The drawn row, as {@link rowMarkup} reads it.
     * @returns {Promise<string>} The assembled name, empty if any oracle it names was unavailable.
     */
    static async fillNameTemplate(template) {
        let name = "";
        let end = 0;
        let theme;

        for (const match of template.matchAll(TEMPLATE_LINK)) {
            const [markup, uuid, label, part] = match;
            name += template.slice(end, match.index);
            end = match.index + markup.length;

            const key = this.NAME_ORACLES[label.trim()];
            let text;
            if (key === "theme_type" && part) {
                theme ??= await this.rollTheme();
                text = theme ? await this.drawText(`theme_${theme}_${part.toLowerCase()}`) : "";
            } else {
                text = key ? await this.drawText(key) : await this.drawLinked(uuid);

                // Following an oracle other than Theme Type, the word is one the name spells out after it.
                if (text && part) text += ` ${part}`;
            }

            // A name missing one of its parts would read as a mistake rather than as a shorter name.
            if (!text) return "";
            name += text;
        }

        return `${name}${template.slice(end)}`.replace(/\s+/g, " ").trim();
    }

    /**
     * The Faction Name oracle for one type.
     * @param {string} type   A member of {@link TYPES}.
     * @returns {Promise<RollTable|null>} Null where the pack is disabled or holds no such table.
     */
    static async nameTemplateTable(type) {
        const id = this.NAME_TEMPLATE_TABLES[type];
        const pack = game.packs.get(CUSTOM_PACK);
        if (!id || !pack) return null;
        return pack.getDocument(id);
    }

    /**
     * Roll an oracle a name template links to that {@link NAME_ORACLES} does not name, by following the link.
     * @param {string} uuid   The document the link points at.
     * @returns {Promise<string>} Plain text, empty if the link led nowhere.
     */
    static async drawLinked(uuid) {
        const table = await fromUuid(uuid);
        if (table?.documentName !== "RollTable") {
            console.warn(`${MODULE_ID} | A Faction Name template links to "${uuid}", which is not an oracle`);
            return "";
        }

        const { results } = await table.draw({ displayChat: false });
        return plainText(results[0]?.description);
    }

    /**
     * Roll the theme a name is built around.
     * @returns {Promise<string>} A member of {@link THEMES}, or an empty string if the oracle was unavailable.
     */
    static async rollTheme() {
        const table = await this.table("theme_type");
        if (!table) return "";

        const { results } = await table.draw({ displayChat: false });
        const theme = this.rowKey(results[0]?.description);
        return THEMES.includes(theme) ? theme : "";
    }
}
