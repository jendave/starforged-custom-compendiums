/**
 * Sheet for the Faction Actor subtype.
 *
 * The system's Location sheet is a Vue application built on classes it does not export, so this is a plain
 * ApplicationV2 sheet that imitates the same workflow: pick a type, roll the oracles that describe the
 * faction, and collect the results in a rich-text description.
 *
 * Which set of oracles those are is the faction's own: a Starsmith faction rolls the supplement's tables and
 * offers its nine types, a Sundered Isles one rolls three oracles for its type where the others roll one, and
 * everything else about the sheet is the same. Which fields and which oracle buttons a faction gets are the
 * set's to say, so the sheet asks it rather than holding a list of its own.
 */

import { MODULE_ID } from "./constants.js";
import { factionSource } from "./faction-sources.js";
import { plainText } from "./oracle-tables.js";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

/** How many oracle buttons sit side by side in the oracle table. */
const ORACLE_COLUMNS = 2;

export class FactionSheet extends HandlebarsApplicationMixin(ActorSheetV2) {
    /** @inheritDoc */
    static DEFAULT_OPTIONS = {
        classes: [MODULE_ID, "faction", "sheet", "actor"],
        position: { width: 560, height: 640 },
        window: { contentClasses: ["standard-form"], resizable: true },
        form: { submitOnChange: true, closeOnSubmit: false },
        actions: {
            rollDetails: FactionSheet.#onRollDetails,
            rollField: FactionSheet.#onRollField,
            rollOracle: FactionSheet.#onRollOracle
        }
    };

    /** @inheritDoc */
    static PARTS = {
        sheet: {
            template: `modules/${MODULE_ID}/templates/faction-sheet.hbs`,
            root: true
        }
    };

    /* -------------------------------------------- */

    /** @returns {typeof import("./faction-source.js").FactionOracleSource} The oracle set this faction rolls. */
    get source() {
        return factionSource(this.actor.system.oracles);
    }

    /** @returns {string[]} The oracles this faction's description is built from, which its type has a say in. */
    get descriptionOracles() {
        return this.source.descriptionOracles(this.actor.system.type);
    }

    /* -------------------------------------------- */

    /** @inheritDoc */
    async _prepareContext(options) {
        const context = await super._prepareContext(options);
        const system = this.actor.system;

        return Object.assign(context, {
            system,
            systemFields: system.schema.fields,
            systemSource: context.source.system,
            descriptionHTML: await foundry.applications.ux.TextEditor.implementation.enrichHTML(
                system.description,
                { secrets: this.actor.isOwner, relativeTo: this.actor }
            ),
            typeOptions: await this.source.typeChoices(),
            hasAspect: this.source.hasAspect(system.type),
            aspectLabel: this.source.hasAspect(system.type) ? this.source.aspectLabel(system.type) : "",
            hasLeadership: this.source.hasLeadership(system.type),
            oracleRows: chunk(
                this.descriptionOracles.map((key) => ({ key, label: `SFCC.FACTION.ORACLE.${key}` })),
                ORACLE_COLUMNS
            )
        });
    }

    /* -------------------------------------------- */

    /**
     * Choosing a type from the select leaves the faction in the same state its die would: the aspect, and the
     * leadership of the types that have it, come from oracles the type names, so both are rolled again.
     *
     * The rolls go into the submitted data rather than into an update of their own, because the form still
     * carries the values on screen and would write them back over anything updated ahead of it.
     * @inheritDoc
     */
    async _processSubmitData(event, form, submitData, options) {
        const type = submitData.system?.type;
        if (type && type !== this.actor.system.type) {
            Object.assign(submitData.system, await this.#typeRolls(type));
        }
        return super._processSubmitData(event, form, submitData, options);
    }

    /* -------------------------------------------- */
    /*  Actions                                     */
    /* -------------------------------------------- */

    /**
     * Roll everything that describes a faction at first glance.
     * @this {FactionSheet}
     * @returns {Promise<void>}
     */
    static async #onRollDetails() {
        // The aspect is left alone: it is the Faction Type sub-oracle's own result, rolled with the type.
        if (this.source.hasLeadership(this.actor.system.type)) await this.#rollField("leadership");
        for (const key of this.descriptionOracles) await this.#appendOracle(key);
    }

    /**
     * Roll the single field named by the button's `data-field` attribute.
     * @this {FactionSheet}
     * @param {PointerEvent} event      The originating click event.
     * @param {HTMLElement} target      The button that was clicked.
     * @returns {Promise<void>}
     */
    static async #onRollField(event, target) {
        await this.#rollField(target.dataset.field);
    }

    /**
     * Roll the oracle named by the button's `data-oracle` attribute and append its result.
     * @this {FactionSheet}
     * @param {PointerEvent} event      The originating click event.
     * @param {HTMLElement} target      The button that was clicked.
     * @returns {Promise<void>}
     */
    static async #onRollOracle(event, target) {
        await this.#appendOracle(target.dataset.oracle);
    }

    /* -------------------------------------------- */
    /*  Rolling                                     */
    /* -------------------------------------------- */

    /**
     * Replace the value of one field with a fresh oracle roll.
     * @param {"name"|"type"|"aspect"|"leadership"} field   The field to roll.
     * @returns {Promise<void>}
     */
    async #rollField(field) {
        const { source } = this;
        const { type } = this.actor.system;

        switch (field) {
            case "name": {
                const name = await source.rollName(type);
                if (name) await this.#rename(name);
                return;
            }
            case "type": {
                const rolled = await source.rollType();
                await this.actor.update({ system: { type: rolled, ...(await this.#typeRolls(rolled)) } });
                return;
            }
            case "aspect":
                await this.#store("system.aspect", await source.drawAspect(type));
                return;
            case "leadership":
                await this.#store("system.leadership", await source.drawLeadership(type));
                return;
        }
    }

    /**
     * Roll the oracles a faction type names, for a faction that has just become that type: the table behind the
     * aspect, and the leadership table that only some types have.
     *
     * Rolling them together with the type is what stops the sheet showing a faction that is half one type and
     * half another. A type without a leadership oracle clears the field rather than rolling it, since its row is
     * hidden and a value left there would reappear on switching back; and a missing oracle empties its field
     * rather than leaving a result from the type that has just gone.
     * @param {string} type   A faction type of this sheet's oracle set.
     * @returns {Promise<{aspect: string, leadership: string}>} System changes to apply alongside the new type.
     */
    async #typeRolls(type) {
        return {
            aspect: await this.source.drawAspect(type),
            leadership: await this.source.drawLeadership(type)
        };
    }

    /**
     * Store one rolled value, leaving the field as it was where the oracle gave nothing: an empty field reads
     * as a faction still to be rolled, which is not what a failed lookup means.
     * @param {string} path   A field path on the Actor.
     * @param {string} text   The rolled text.
     * @returns {Promise<void>}
     */
    async #store(path, text) {
        if (text) await this.actor.update({ [path]: text });
    }

    /**
     * Roll an oracle and append the result to the faction's description.
     * @param {string} oracleKey    An oracle key of this sheet's oracle set.
     * @returns {Promise<void>}
     */
    async #appendOracle(oracleKey) {
        const { name, description: text } = await this.source.draw(oracleKey);
        if (!name && !text) return;

        // Influence is the one oracle here that names its result as well as describing it, and both halves
        // are worth reading. Its description arrives as a paragraph of its own, which cannot nest inside the
        // one built below, so it is reduced to text; the oracles that carry no name are appended untouched.
        const result = name ? `${name} — ${plainText(text)}` : text;

        // The heading goes with the result rather than being written when the oracle is offered, so that it
        // appears above a Cursed Role rolled on its own as well as above one rolled with the rest.
        const heading = this.source.oracleHeading(oracleKey);
        const title = heading ? `<p><strong>${heading}:</strong></p>` : "";

        const label = game.i18n.localize(`SFCC.FACTION.ORACLE.${oracleKey}`);
        const description =
            `${this.actor.system.description}${title}<p><strong>${label}:</strong> ${result}</p>`;
        await this.actor.update({ "system.description": description });
    }

    /**
     * Rename the faction, carrying the new name to its prototype token and any placed tokens, the way the
     * system's own Location sheet does.
     * @param {string} name   The new name.
     * @returns {Promise<void>}
     */
    async #rename(name) {
        await this.actor.update({ name });
        await this.actor.prototypeToken.update({ name });

        const updates = this.actor.getActiveTokens().map((token) => ({ _id: token.id, name }));
        if (updates.length) await canvas.scene?.updateEmbeddedDocuments("Token", updates);
    }
}

/**
 * Split a list into rows of at most `size` items, so a template can lay them out as a table.
 * @template T
 * @param {T[]} items    The list to split.
 * @param {number} size  The greatest number of items a row may hold.
 * @returns {T[][]}
 */
function chunk(items, size) {
    return Array.from({ length: Math.ceil(items.length / size) }, (_row, i) =>
        items.slice(i * size, (i + 1) * size)
    );
}
