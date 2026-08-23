/**
 * Finding and drawing from the oracle RollTables the Faction sheets use.
 *
 * Oracles ship as RollTables in compendium packs, each tagged with the Datasworn id it was generated from
 * (`flags.foundry-ironsworn.dsid`). Looking a table up by that id rather than by document id keeps this
 * module working across releases of the packs, which renumber their documents whenever they are rebuilt.
 *
 * One dsid can name several tables. The Starsmith supplement splits an oracle across three of them — "Faction
 * Quirks (1 - 2)", "(3 - 4)" and "(5 - 6)", which a d6 chooses between before the d100 is rolled — and all
 * three carry the same dsid. A lookup therefore finds a set, and drawing picks one of them at random.
 */

import { SYSTEM_ID } from "./constants.js";

/** Matches Foundry's enricher syntax, `@Compendium[id]{Label}`, so a row's label can be read out of it. */
const LINK_LABEL = /@\w+\[[^\]]+]\{([^}]*)}/g;

/** The row that stands for two further draws on the same table, which most faction oracles end with. */
const ROLL_TWICE = "roll twice";

/** How many rows a chain of "Roll twice" rows may expand to before it is cut short. */
const MAX_ROWS = 4;

/** How many times a draw is retried when it repeats a row already taken. */
const MAX_ATTEMPTS = 20;

/**
 * @typedef {object} OracleResult
 * @property {string} name         The name of the drawn row, which most oracles leave empty.
 * @property {string} description  The row's text, as HTML.
 */

/**
 * @typedef {object} LinkedRow
 * @property {string} label  The row's first paragraph, reduced to the text of any link it holds.
 * @property {string} text   Whatever paragraphs follow it, as plain text.
 */

/**
 * Reduce oracle result markup to text suitable for a plain input or an Actor name.
 * @param {string} html   Result text, which may be wrapped in paragraph tags.
 * @returns {string}
 */
export function plainText(html) {
    // DOMParser documents are inert, so markup in a result cannot load resources or run scripts.
    return new DOMParser().parseFromString(html ?? "", "text/html").body.textContent.trim();
}

/**
 * Read a row as one line, keeping the enricher markup its links are written in.
 *
 * Unlike {@link plainText} this is not for display: it is for the rows that are instructions rather than
 * results — a name template, whose links say which oracles to roll — so the links have to survive. Paragraphs
 * are run together with a space, since a template split across two of them still reads as one name.
 * @param {string} html   The row's text.
 * @returns {string}
 */
export function rowMarkup(html) {
    const { body } = new DOMParser().parseFromString(html ?? "", "text/html");
    const paragraphs = Array.from(body.children, (el) => el.textContent.trim()).filter(Boolean);

    const text = paragraphs.length ? paragraphs.join(" ") : plainText(html);
    return text.replace(/\s+/g, " ").trim();
}

/**
 * Split a row that names its subject in one paragraph and describes it in the next, the shape every Faction
 * Type oracle uses: a link to the sub-oracle behind the type, then the phrase that sums the type up.
 * @param {string} html   The row's text.
 * @returns {LinkedRow}
 */
export function splitLinkedRow(html) {
    const { body } = new DOMParser().parseFromString(html ?? "", "text/html");
    const paragraphs = Array.from(body.children, (el) => el.textContent.trim()).filter(Boolean);

    // A row that is not split into paragraphs is all label and no text.
    const [label = plainText(html), ...rest] = paragraphs;

    // The label arrives as a link to the sub-oracle, which is of no use outside enriched HTML.
    return { label: label.replace(LINK_LABEL, "$1").trim(), text: rest.join(" ") };
}

/**
 * Datasworn ids to the documents carrying them, one entry per pack.
 *
 * Built on first use and kept, because the alternative is fetching a pack's whole index again for every oracle
 * a single "roll the details" button rolls. Nothing invalidates it: a pack's contents cannot change while the
 * world runs unless someone edits it by hand, and a stale entry costs a re-roll rather than an error.
 *
 * The promise is what is cached, not the map it resolves to, so that a second lookup arriving while the index
 * is still being fetched waits for it rather than reading a map that is not filled in yet.
 * @type {Map<string, Promise<Map<string, string[]>>>}
 */
const INDEXES = new Map();

/**
 * The document ids in a pack, grouped by the Datasworn id they carry.
 * @param {string} packId   A pack id, as `<module or system id>.<pack name>`.
 * @returns {Promise<Map<string, string[]>>} Empty if the pack is absent.
 */
function dsidIndex(packId) {
    if (!INDEXES.has(packId)) INDEXES.set(packId, buildIndex(packId));
    return INDEXES.get(packId);
}

/**
 * Read a pack's index once and group it by Datasworn id.
 * @param {string} packId   A pack id, as `<module or system id>.<pack name>`.
 * @returns {Promise<Map<string, string[]>>}
 */
async function buildIndex(packId) {
    const byDsid = new Map();

    const pack = game.packs.get(packId);
    if (!pack) return byDsid;

    for (const entry of await pack.getIndex({ fields: ["flags"] })) {
        const dsid = entry.flags?.[SYSTEM_ID]?.dsid;
        if (!dsid) continue;
        if (!byDsid.has(dsid)) byDsid.set(dsid, []);
        byDsid.get(dsid).push(entry._id);
    }
    return byDsid;
}

/**
 * Every table in a pack carrying the given Datasworn id.
 * @param {string} packId   A pack id, as `<module or system id>.<pack name>`.
 * @param {string} dsid     A Datasworn `oracle_rollable:` id.
 * @returns {Promise<RollTable[]>} Empty if the pack is absent, which it is when its module is not installed.
 */
export async function oracleTables(packId, dsid) {
    const ids = (await dsidIndex(packId)).get(dsid) ?? [];
    const pack = game.packs.get(packId);
    return Promise.all(ids.map((id) => pack.getDocument(id)));
}

/**
 * One table for the given Datasworn id, chosen at random where an oracle is split across several.
 *
 * Choosing at random rather than rolling is deliberate: the split is a d6 the player would roll before the
 * table's own d100, and a second set of dice in the log for every oracle would drown out the results.
 * @param {string} packId   A pack id, as `<module or system id>.<pack name>`.
 * @param {string} dsid     A Datasworn `oracle_rollable:` id.
 * @returns {Promise<RollTable|undefined>}
 */
export async function oracleTable(packId, dsid) {
    const ids = (await dsidIndex(packId)).get(dsid) ?? [];
    if (!ids.length) return undefined;
    return game.packs.get(packId).getDocument(ids[Math.floor(Math.random() * ids.length)]);
}

/**
 * Draw from a table without posting to chat, resolving the "Roll twice" row into the rows it stands for.
 *
 * Where more than one row is drawn they are joined into one result, since every field these oracles fill
 * holds a single line of text. Only the name of a lone row is kept: the rows that carry one, Influence among
 * them, have no "Roll twice" to expand.
 * @param {RollTable} table   The table to draw from.
 * @returns {Promise<OracleResult>} Empty strings if nothing could be drawn.
 */
export async function drawOracleTable(table) {
    const rows = [];
    await drawRow(table, rows);

    if (!rows.length) return { name: "", description: "" };
    if (rows.length === 1) return rows[0];
    return { name: "", description: rows.map((row) => plainText(row.description)).join(", ") };
}

/**
 * Draw one row into `rows`, replacing a "Roll twice" row with the two rows it stands for and skipping any
 * row already taken, the way a player rolling twice on a table would.
 * @param {RollTable} table         The table to draw from.
 * @param {OracleResult[]} rows     Collects the rows drawn so far.
 * @returns {Promise<void>}
 */
async function drawRow(table, rows) {
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        const { results } = await table.draw({ displayChat: false });
        const [result] = results;
        if (!result) return;

        const row = { name: result.name ?? "", description: result.description ?? "" };

        if (isRollTwice(row)) {
            // A chain of these can in principle run forever, so it is only followed while it stays short.
            if (rows.length >= MAX_ROWS) return;
            await drawRow(table, rows);
            await drawRow(table, rows);
            return;
        }

        if (!rows.some((seen) => seen.description === row.description)) {
            rows.push(row);
            return;
        }
    }
}

/**
 * Whether a row is the "Roll twice" instruction rather than a result.
 * @param {OracleResult} row   The drawn row.
 * @returns {boolean}
 */
function isRollTwice(row) {
    return plainText(row.description.replace(LINK_LABEL, "$1")).toLowerCase() === ROLL_TWICE;
}
