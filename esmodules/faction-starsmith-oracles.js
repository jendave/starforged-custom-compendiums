/**
 * The Faction oracles from the Starsmith supplement, which add six faction types to the rulebook's three and
 * give each of them an aspect oracle of its own: a Corporation has a Field, a Military a Specialty, an AI Hive
 * a Prime Directive.
 *
 * Each of these oracles is split across three tables named "(1 - 2)", "(3 - 4)" and "(5 - 6)" — a d6 chooses
 * between them before the table's own d100 is rolled — and all three carry one Datasworn id, so a lookup finds
 * the set and the draw picks one of them.
 */

import { FactionOracles } from "./faction-oracles.js";
import { FactionOracleSource } from "./faction-source.js";

const DSID = "oracle_rollable:starforged/faction";

export class FactionStarsmithOracles extends FactionOracleSource {
    /** @override */
    static PACK = "starsmith-expanded-oracles.starsmithexpandedoracles";

    /** @override */
    static ORACLES = {
        type: `${DSID}/type_starsmith`,
        // The supplement expands the faction types but not their influence, so that one oracle is the
        // rulebook's, borrowed from the system's own pack through PACK_OVERRIDES below.
        influence: `${DSID}/influence`,
        dominion: `${DSID}/dominion_starsmith`,
        guild: `${DSID}/guild_starsmith`,
        fringe_group: `${DSID}/fringe_group_starsmith`,
        corporation: `${DSID}/corporation_field_starsmith`,
        military: `${DSID}/military_specialty_starsmith`,
        religious: `${DSID}/religious_role_starsmith`,
        research_group: `${DSID}/research_field_of_study_starsmith`,
        data_harvesters: `${DSID}/data_harvesters_role_starsmith`,
        ai_hive: `${DSID}/ai_hive_prime_directive_starsmith`,
        leadership: `${DSID}/dominion_leadership_starsmith`,
        projects: `${DSID}/projects_starsmith`,
        relationships: `${DSID}/relationships_starsmith`,
        quirks: `${DSID}/quirks_starsmith`,
        rumors: `${DSID}/rumors_starsmith`,
        legacy: `${DSID}/name/legacy_starsmith`,
        affiliation: `${DSID}/name/affiliation_starsmith`,
        identity: `${DSID}/name/identity_starsmith`
    };

    /** @override */
    static PACK_OVERRIDES = {
        influence: FactionOracles.PACK
    };

    /** @override */
    static TYPES = [
        "dominion",
        "guild",
        "fringe_group",
        "corporation",
        "military",
        "religious",
        "research_group",
        "data_harvesters",
        "ai_hive"
    ];
}
