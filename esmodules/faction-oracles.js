/**
 * The Faction oracles from the Starforged rulebook, which the Ironsworn & Starforged system ships.
 */

import { SYSTEM_ID } from "./constants.js";
import { FactionOracleSource } from "./faction-source.js";

const DSID = "oracle_rollable:starforged/faction";

export class FactionOracles extends FactionOracleSource {
    /** @override */
    static PACK = `${SYSTEM_ID}.starforgedoracles`;

    /** @override */
    static ORACLES = {
        type: `${DSID}/type`,
        influence: `${DSID}/influence`,
        dominion: `${DSID}/dominion`,
        guild: `${DSID}/guild`,
        fringe_group: `${DSID}/fringe_group`,
        leadership: `${DSID}/dominion_leadership`,
        projects: `${DSID}/projects`,
        relationships: `${DSID}/relationships`,
        quirks: `${DSID}/quirks`,
        rumors: `${DSID}/rumors`,
        legacy: `${DSID}/name/legacy`,
        affiliation: `${DSID}/name/affiliation`,
        identity: `${DSID}/name/identity`
    };

    /** @override */
    static TYPES = ["dominion", "guild", "fringe_group"];
}
