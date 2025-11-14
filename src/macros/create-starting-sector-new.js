// ============================================================================
// CONFIGURATION
// ============================================================================

const SECTOR_CONFIG = {
    // Module IDs
    MODULES: {
        TOKEN_ATTACHER: "token-attacher",
        JB2A_DND5E: "JB2A_DnD5e",
        SEQUENCER: "sequencer",
    },

    // Roll Table Configuration
    ROLL_TABLES: {
        PREFIX: "Compendium.foundry-ironsworn.starforgedoracles.RollTable.",
        SECTOR_PREFIX: ["306501658d12dbad"],
        SECTOR_SUFFIX: ["0b2b7f507f8901cc"],
        SECTOR_TROUBLE: ["f6764b50761b77eb"],
        SETTLEMENT_NAME: ["c25eade4d8daa0bc"],
        SETTLEMENT_KLASS: "68efb47a93ee8925",
        AUTHORITY: ["2c3224921966f200"],
        SETTLEMENT_PROJECT: ["eb909255e1df463b"],
        PLANETARY_CLASS: ["affbef437e01ef10"],
        STELLAR_OBJECT: ["f2bba7a759c5871a"],
        FIRST_LOOK: ["5ff0f4816e9338b4"],
        SETTLEMENT_TROUBLE: ["b42abc2bc10cd38b"],
        ACTION: ["b347a87fb81a3abb"],
        THEME: ["0c5ce82c7adbb4e2"],
        DESCRIPTOR: ["e2bae1632870e2d2"],
        FOCUS: ["9d920a9da68abf62"],
        CHARACTER_ROLE: ["fbb49cabf7e9596c"],
        CHARACTER_FIRST_LOOK: ["e422399eb54ed7b1"],
        CHARACTER_GOAL: ["a707e132902305f0"],
        REVEALED_CHARACTER_ASPECT: ["4c4b6c28ff08ad98"],
        CHARACTER_GIVEN_NAME: ["2ac8af92c0509f72"],
        CHARACTER_FAMILY_NAME: ["f94e58504ac34af8"],
        CHARACTER_CALLSIGN: ["76cd6f5340a4978a"],
    },

    // Region Settings
    REGIONS: {
        TERMINUS: {
            settlements: 4,
            passages: 3,
            populationOracle: "473250ed66f4c411",
        },
        OUTLANDS: {
            settlements: 3,
            passages: 2,
            populationOracle: "8d5220c3ac5a5199",
        },
        EXPANSE: {
            settlements: 2,
            passages: 1,
            populationOracle: "058fd93e957c6804",
        },
    },

    // Planetary Details Arrays by Class
    PLANET_TABLES: {
        desert: {
            name: ["d9ccce4a55cf1ba3"],
            atmosphere: ["f42af77272694d08"],
            observedFromSpace: ["ed4e3e57470dd927"],
            planetsideFeature: ["88fd2037f0802836"],
        },
        furnace: {
            name: ["0ab38c2349ec8e2b"],
            atmosphere: ["b7b9ee078847e834"],
            observedFromSpace: ["7083695541c913d9"],
            planetsideFeature: ["de35c746982df2bc"],
        },
        grave: {
            name: ["b39ab4b43d2df736"],
            atmosphere: ["c18d325e41207e90"],
            observedFromSpace: ["7520168fe11e73f4"],
            planetsideFeature: ["9eca6bc0a308c58f"],
        },
        ice: {
            name: ["f45c90ceb8432000"],
            atmosphere: ["c274f74ecf7ce593"],
            observedFromSpace: ["c56edfcd0c123ee3"],
            planetsideFeature: ["0370e0b345eeddb7"],
        },
        jovian: {
            name: ["fbb7cb653d8543a0"],
            atmosphere: ["32962e84047f17b5"],
            observedFromSpace: ["fc741bbc131b5a0b"],
            planetsideFeature: ["6a7ee7ca3f72a34f"],
        },
        jungle: {
            name: ["d231589442f1e296"],
            atmosphere: ["d5ac3f9b20d9f5dc"],
            observedFromSpace: ["3dfa3974fd38aa41"],
            planetsideFeature: ["315dd67fb3d71259"],
        },
        ocean: {
            name: ["3ab55ec64f9f711d"],
            atmosphere: ["8c593f0f2ac6527a"],
            observedFromSpace: ["efc010d3643bed54"],
            planetsideFeature: ["a36493cd810f2c37"],
        },
        rocky: {
            name: ["0aea1078fd7f3f1e"],
            atmosphere: ["5c0e2dc25a949b14"],
            observedFromSpace: ["e03b485571f904d3"],
            planetsideFeature: ["189900171ce9133f"],
        },
        shattered: {
            name: ["1bb3d31309da3f83"],
            atmosphere: ["00e404023a5dc5ba"],
            observedFromSpace: ["96bc7309f47d4af6"],
            planetsideFeature: ["1fdde544c04e021a"],
        },
        tainted: {
            name: ["ce83758fc30fecc5"],
            atmosphere: ["98cf03d0bdf9af1b"],
            observedFromSpace: ["b6761b93d9f1fc4d"],
            planetsideFeature: ["eeb02365a93c8965"],
        },
        vital: {
            name: ["9d429eda4f215791"],
            atmosphere: ["3b83c11a94c70b87"],
            observedFromSpace: ["88ca6ad4d5965c0b"],
            planetsideFeature: ["bcc68163e523f6c9"],
            diversity: ["2ccc456d0af8d199"],
            biomes: ["85e11dcd94c71ef2"],
        },
    },

    // Folder Names
    FOLDERS: {
        SECTORS: "Sectors",
        SECTORS_TERMINUS: "Sectors: Terminus",
        SECTORS_OUTLANDS: "Sectors: Outlands",
        SECTORS_EXPANSE: "Sectors: Expanse",
        SECTOR_DATA: "Sector Data",
        SECTOR_DATA_TERMINUS: "Sector Data: Terminus",
        SECTOR_DATA_OUTLANDS: "Sector Data: Outlands",
        SECTOR_DATA_EXPANSE: "Sector Data: Expanse",
        LOCATIONS: "Sector Locations",
        LOCATIONS_TERMINUS: "Locations: Terminus",
        LOCATIONS_OUTLANDS: "Locations: Outlands",
        LOCATIONS_EXPANSE: "Locations: Expanse",
    },

    // Scene Configuration
    SCENE: {
        GRID_SIZE: 170,
        INITIAL_SCALE: 0.386,
        INITIAL_X: 2428,
        INITIAL_Y: 1417,
        FOREGROUND_ELEVATION: 20,
        GRID_TYPE: 2,
        GRID_COLOR: "ffffff",
        GRID_ALPHA: 0.35,
        BACKGROUND_COLOR: "000000",
    },

    // Asset Paths
    ASSETS: {
        SECTORS_PATH: "systems/foundry-ironsworn/assets/sectors/1.webp",
        SETTLEMENT_BASE:
            "systems/foundry-ironsworn/assets/locations/settlement-",
        PLANET_BASE:
            "systems/foundry-ironsworn/assets/planets/Starforged-Planet-Token-",
        STELLAR_OBJECT_BASE:
            "systems/foundry-ironsworn/assets/stellar-objects/Starforged-Stellar-Token-",
        STELLAR_OBJECT_FALLBACK:
            "systems/foundry-ironsworn/assets/icons/stellar-object.svg",
    },

    // Token Scales
    TOKEN_SCALES: {
        SETTLEMENT: 2,
        PLANET: 1,
        STELLAR_OBJECT: 1,
    },

    // Hex Grid Configuration
    HEX_GRID: {
        SETTLEMENT_COL_SPACING: 20,
        SETTLEMENT_ROW_MIN: 2,
        SETTLEMENT_ROW_MAX: 14,
        PLANET_ROW_OFFSET: 1,
    },

    // Stellar Object Types
    STELLAR_OBJECT_TYPES: [
        {
            value: "smoldering red star",
            imgKey: "Red-Star",
            label: "Smoldering Red Star",
        },
        {
            value: "glowing orange star",
            imgKey: "Orange-Star",
            label: "Glowing Orange Star",
        },
        {
            value: "burning yellow star",
            imgKey: "Yellow-Star",
            label: "Burning Yellow Star",
        },
        {
            value: "blazing blue star",
            imgKey: "Blue-Star",
            label: "Blazing Blue Star",
        },
        {
            value: "young star incubating in a molecular cloud",
            imgKey: "Star-In-Incubating-Cloud",
            label: "Young Star",
        },
        {
            value: "white dwarf shining with spectral light",
            imgKey: "White-Dwarf",
            label: "White Dwarf",
        },
        {
            value: "corrupted star radiating with unnatural light",
            imgKey: "Corrupted-Star",
            label: "Corrupted Star",
        },
        {
            value: "neutron star surrounded by intense magnetic fields",
            imgKey: "Neutron-Star",
            label: "Neutron Star",
        },
        {
            value: "two stars in close orbit connected by fiery tendrils of energy",
            imgKey: "Binary-Star",
            label: "Binary Stars",
        },
        {
            value: "black hole allows nothing to escape—not even light",
            imgKey: "Black-Hole",
            label: "Black Hole",
        },
        {
            value: "hypergiant star generating turbulent solar winds",
            imgKey: "Hypergiant",
            label: "Hypergiant",
        },
        {
            value: "artificial star constructed by a long-dead civilization",
            imgKey: null,
            label: "Artificial Star",
        },
        {
            value: "unstable star showing signs of impending supernova",
            imgKey: "Unstable-Star",
            label: "Unstable Star",
        },
    ],
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Prints a message to the chat
 * @param {string} message - The message to print
 */
function printMessage(message) {
    const chatData = { content: message };
    ChatMessage.applyRollMode(chatData, game.settings.get("core", "rollMode"));
    ChatMessage.create(chatData, {});
}

/**
 * Returns a random item from an array
 * @param {Array} array - The array to select from
 * @returns {*} A random element from the array
 */
function randomArrayItem(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

/**
 * Returns a random integer between min and max (inclusive)
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random integer
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Extracts a substring between two delimiters
 * @param {string} fullString - The full string to search
 * @param {string} startString - The starting delimiter
 * @param {string} endString - The ending delimiter
 * @returns {string|null} The extracted substring or null if not found
 */
function getStringBetween(fullString, startString, endString) {
    const startIndex = fullString.indexOf(startString);
    if (startIndex === -1) {
        return null;
    }

    const endIndex = fullString.indexOf(
        endString,
        startIndex + startString.length
    );
    if (endIndex === -1) {
        return null;
    }
    return fullString.substring(startIndex + startString.length, endIndex);
}

/**
 * Returns the list of stellar object types
 * @returns {Array} Array of stellar object type definitions
 */
function getStellarObjectTypes() {
    return SECTOR_CONFIG.STELLAR_OBJECT_TYPES;
}

// ============================================================================
// HELPER CLASSES
// ============================================================================

/**
 * Handles all table rolling operations with error handling
 */
class TableRoller {
    constructor(prefix) {
        this.prefix = prefix;
        this.cache = new Map();
    }

    /**
     * Rolls a table by UUID
     * @param {string} uuid - Full UUID or suffix to append to prefix
     * @returns {Promise<Object>} The roll result
     */
    async rollTable(uuid) {
        try {
            const fullUuid = uuid.startsWith("Compendium.")
                ? uuid
                : this.prefix + uuid;

            // Check cache first
            if (this.cache.has(fullUuid)) {
                const table = this.cache.get(fullUuid);
                if (!table) {
                    throw new Error(`Table not found in cache: ${uuid}`);
                }
                return await table.roll();
            }

            const table = await fromUuid(fullUuid);
            if (!table) {
                throw new Error(
                    `Table not found: ${uuid} (full UUID: ${fullUuid})`
                );
            }
            this.cache.set(fullUuid, table);
            return await table.roll();
        } catch (error) {
            console.error(`Error rolling table ${uuid}:`, error);
            throw new Error(`Failed to roll table: ${uuid} - ${error.message}`);
        }
    }

    /**
     * Rolls a table from an array of UUIDs (randomly selects one)
     * @param {Array<string>} uuidArray - Array of UUID suffixes
     * @returns {Promise<Object>} The roll result
     */
    async rollFromArray(uuidArray) {
        const uuid = randomArrayItem(uuidArray);
        return await this.rollTable(uuid);
    }

    /**
     * Gets the text result from a roll
     * @param {Object} roll - The roll result
     * @returns {string} The text content
     */
    getRollText(roll) {
        return roll.results[0]?.text || "";
    }
}

/**
 * Manages folder creation and retrieval with memoization
 */
class FolderManager {
    constructor() {
        this.cache = new Map();
    }

    /**
     * Gets or creates a folder
     * @param {string} name - Folder name
     * @param {string} type - Folder type (Scene, JournalEntry, Actor)
     * @param {string|null} parentId - Parent folder ID (optional)
     * @returns {Promise<Folder>} The folder document
     */
    async getOrCreateFolder(name, type, parentId = null) {
        const cacheKey = `${name}:${type}:${parentId || ""}`;

        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }

        // Find folder by name and parent - search all folders to find one with matching name, type, and parent
        let folder = null;
        const foldersWithName = game.folders.filter(f => f.name === name && f.type === type);
        
        // Normalize parent ID for comparison
        let targetParentId = null;
        if (parentId) {
            // Extract ID if it's a folder object, otherwise use as string
            if (typeof parentId === 'object' && parentId.id) {
                targetParentId = String(parentId.id);
            } else {
                targetParentId = String(parentId);
            }
        }
        
        // Find the folder with the correct parent (must be a direct child)
        for (const f of foldersWithName) {
            // Get the folder's parent ID - f.folder should be a string ID in Foundry
            let folderParentId = null;
            if (f.folder) {
                // Handle both string IDs and potential object references
                if (typeof f.folder === 'string') {
                    folderParentId = f.folder;
                } else if (typeof f.folder === 'object' && f.folder.id) {
                    folderParentId = String(f.folder.id);
                } else {
                    folderParentId = String(f.folder);
                }
            }
            
            // Compare parent IDs (both should be strings or both null)
            if (folderParentId === targetParentId) {
                folder = f;
                break;
            }
        }

        if (!folder) {
            // Safety check: ensure we're not creating a folder with the same name as its parent
            if (parentId) {
                const parentFolderId = typeof parentId === 'object' && parentId.id ? parentId.id : parentId;
                const parentFolder = game.folders.get(parentFolderId);
                if (parentFolder && parentFolder.name === name) {
                    console.warn(`Warning: Attempted to create folder "${name}" inside parent folder with the same name. This may cause nesting issues.`);
                }
            }
            
            const folderData = { name, type };
            if (parentId) {
                // Ensure we always pass the ID string, not a folder object
                folderData.folder = typeof parentId === 'object' && parentId.id ? parentId.id : parentId;
            }
            folder = await Folder.create(folderData);
        }

        this.cache.set(cacheKey, folder);
        return folder;
    }

    /**
     * Gets region-specific folders
     * @param {string} region - Region name
     * @returns {Promise<Object>} Object containing all region folders
     */
    async getRegionFolders(region) {
        const sectorsFolder = await this.getOrCreateFolder(
            SECTOR_CONFIG.FOLDERS.SECTORS,
            "Scene"
        );

        const sectorFolderName = `Sectors: ${region}`;
        const sectorFolder = await this.getOrCreateFolder(
            sectorFolderName,
            "Scene",
            sectorsFolder.id
        );

        const sectorDataFolder = await this.getOrCreateFolder(
            SECTOR_CONFIG.FOLDERS.SECTOR_DATA,
            "JournalEntry"
        );

        const sectorDataFolderName = `Sector Data: ${region}`;
        const sectorDataRegionFolder = await this.getOrCreateFolder(
            sectorDataFolderName,
            "JournalEntry",
            sectorDataFolder.id
        );

        const locationsFolder = await this.getOrCreateFolder(
            SECTOR_CONFIG.FOLDERS.LOCATIONS,
            "Actor"
        );

        const locationsFolderName = `Locations: ${region}`;
        const locationsRegionFolder = await this.getOrCreateFolder(
            locationsFolderName,
            "Actor",
            locationsFolder.id
        );

        return {
            sector: sectorFolder,
            sectorData: sectorDataRegionFolder,
            locations: locationsRegionFolder,
            baseSectors: sectorsFolder,
            baseSectorData: sectorDataFolder,
            baseLocations: locationsFolder,
        };
    }
}

/**
 * Handles hex grid calculations and token positioning
 */
class TokenPlacer {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.rowHeight = gridSize * (Math.sqrt(3) / 2);
        this.colWidth = gridSize;
    }

    /**
     * Converts pixel coordinates to hex coordinates (col, row)
     * @param {number} x - X pixel coordinate
     * @param {number} y - Y pixel coordinate
     * @returns {Object} Object with col, row hex coordinates
     */
    pixelToHex(x, y) {
        // Account for even row offset
        const row = Math.round(y / this.rowHeight);
        let col;
        
        if (row % 2 === 0) {
            // Even row: offset by half a column
            col = (x - this.colWidth / 2) / this.colWidth;
        } else {
            // Odd row: no offset
            col = x / this.colWidth;
        }
        
        return { col: Math.round(col), row };
    }

    /**
     * Converts offset hex coordinates to cube coordinates for distance calculation
     * @param {number} col - Column coordinate
     * @param {number} row - Row coordinate
     * @returns {Object} Object with x, y, z cube coordinates
     */
    offsetToCube(col, row) {
        // Convert offset coordinates (even rows offset) to cube coordinates
        // For even rows offset: x = col, z = row - (col + (col & 1)) / 2
        const x = col;
        const z = row - Math.floor((col + (col & 1)) / 2);
        const y = -x - z;
        return { x, y, z };
    }

    /**
     * Calculates hex distance between two positions
     * @param {number} x1 - First position x coordinate
     * @param {number} y1 - First position y coordinate
     * @param {number} x2 - Second position x coordinate
     * @param {number} y2 - Second position y coordinate
     * @returns {number} Hex distance between the two positions
     */
    hexDistance(x1, y1, x2, y2) {
        const hex1 = this.pixelToHex(x1, y1);
        const hex2 = this.pixelToHex(x2, y2);
        
        const cube1 = this.offsetToCube(hex1.col, hex1.row);
        const cube2 = this.offsetToCube(hex2.col, hex2.row);
        
        // Calculate distance using cube coordinates
        return (Math.abs(cube1.x - cube2.x) + Math.abs(cube1.y - cube2.y) + Math.abs(cube1.z - cube2.z)) / 2;
    }

    /**
     * Checks if a position is at least minDistance hexes from all edges
     * @param {number} col - Column coordinate
     * @param {number} row - Row coordinate
     * @param {number} sceneWidth - Scene width in pixels
     * @param {number} sceneHeight - Scene height in pixels
     * @param {number} minDistance - Minimum distance from edges in hexes
     * @returns {boolean} True if position is valid
     */
    isPositionAwayFromEdges(col, row, sceneWidth, sceneHeight, minDistance) {
        const maxRow = Math.floor(sceneHeight / this.rowHeight) - 1;
        const maxCol = Math.floor(sceneWidth / this.colWidth) - 1;
        
        return row >= minDistance && 
               row <= maxRow - minDistance &&
               col >= minDistance && 
               col <= maxCol - minDistance;
    }

    /**
     * Calculates hex coordinates for a settlement
     * @param {number} index - Settlement index (0-based)
     * @param {number} totalSettlements - Total number of settlements
     * @param {number} sceneWidth - Scene width in pixels
     * @param {number} sceneHeight - Scene height in pixels
     * @param {Array<Object>} existingPositions - Array of existing settlement positions {x, y}
     * @param {number} minDistanceFromOthers - Minimum hex distance from other settlements
     * @returns {Object} Object with col, row, x, y coordinates
     */
    calculateSettlementPosition(index, totalSettlements, sceneWidth, sceneHeight, existingPositions = [], minDistanceFromOthers = 7) {
        const edgeBuffer = 4; // Minimum hexes from edge
        const maxRow = Math.floor(sceneHeight / this.rowHeight) - 1;
        const maxCol = Math.floor(sceneWidth / this.colWidth) - 1;
        
        // Valid range for rows and columns (at least 4 hexes from edges)
        const minRow = edgeBuffer;
        const maxRowValid = maxRow - edgeBuffer;
        const minCol = edgeBuffer;
        const maxColValid = maxCol - edgeBuffer;
        
        let attempts = 0;
        const maxAttempts = 1000;
        let targetHexCol, targetHexRow, x, y;
        
        do {
            // Start with a base position based on index
            const baseCol = ((index + 1) * SECTOR_CONFIG.HEX_GRID.SETTLEMENT_COL_SPACING) / (totalSettlements + 1);
            const baseRow = (minRow + maxRowValid) / 2;
            
            // Add random variation
            targetHexCol = baseCol + getRandomInt(-Math.floor((maxColValid - minCol) / 3), Math.floor((maxColValid - minCol) / 3));
            targetHexRow = getRandomInt(minRow, maxRowValid);
            
            // Clamp to valid range
            targetHexCol = Math.max(minCol, Math.min(maxColValid, targetHexCol));
            targetHexRow = Math.max(minRow, Math.min(maxRowValid, targetHexRow));
            
            // Convert to pixel coordinates
            x = targetHexCol * this.colWidth;
            y = targetHexRow * this.rowHeight;
            
            // Offset for even rows
            if (Math.floor(targetHexRow) % 2 === 0) {
                x += this.colWidth / 2;
            }
            
            // Check if position is valid (away from edges and other settlements)
            const isAwayFromEdges = this.isPositionAwayFromEdges(targetHexCol, targetHexRow, sceneWidth, sceneHeight, edgeBuffer);
            let isAwayFromOthers = true;
            
            if (isAwayFromEdges && existingPositions.length > 0) {
                for (const existingPos of existingPositions) {
                    const distance = this.hexDistance(x, y, existingPos.x, existingPos.y);
                    if (distance < minDistanceFromOthers) {
                        isAwayFromOthers = false;
                        break;
                    }
                }
            }
            
            attempts++;
            
            if (isAwayFromEdges && isAwayFromOthers) {
                break;
            }
        } while (attempts < maxAttempts);
        
        if (attempts >= maxAttempts) {
            console.warn(`Could not find valid position for settlement ${index + 1} after ${maxAttempts} attempts. Using best available position.`);
        }
        
        return { col: targetHexCol, row: targetHexRow, x, y };
    }

    /**
     * Calculates hex coordinates for a planet (below settlement)
     * @param {number} settlementCol - Settlement column (can be fractional)
     * @param {number} settlementRow - Settlement row
     * @returns {Object} Object with col, row, x, y coordinates
     */
    calculatePlanetPosition(settlementCol, settlementRow) {
        const targetHexRow = settlementRow + SECTOR_CONFIG.HEX_GRID.PLANET_ROW_OFFSET;
        let x = settlementCol * this.colWidth;
        let y = targetHexRow * this.rowHeight;

        // Offset for even rows
        if (targetHexRow % 2 === 0) {
            x -= this.colWidth / 2;
        }

        return { col: settlementCol, row: targetHexRow, x, y };
    }

    /**
     * Calculates hex coordinates one hex to the left of a given position
     * @param {number} x - Current x coordinate
     * @param {number} y - Current y coordinate
     * @returns {Object} Object with x, y coordinates for one hex to the left
     */
    calculateLeftHexPosition(x, y) {
        // In a hex grid, going one hex to the left (west) means subtracting colWidth
        const leftX = x - this.colWidth;
        return { x: leftX, y: y };
    }

    /**
     * Calculates hex coordinates one row above and half a hex to the left
     * @param {number} x - Current x coordinate
     * @param {number} y - Current y coordinate
     * @returns {Object} Object with x, y coordinates for one row above and half hex left
     */
    calculateAboveLeftHexPosition(x, y) {
        // One row above: subtract rowHeight
        // Half a hex to the left: subtract colWidth / 2
        const newX = x - this.colWidth / 2;
        const newY = y - this.rowHeight;
        return { x: newX, y: newY };
    }

    /**
     * Calculates marker positions on scene edges (inner edge)
     * @param {number} sceneWidth - Scene width
     * @param {number} sceneHeight - Scene height
     * @returns {Array<Object>} Array of marker positions with {x, y, edge} for each edge
     */
    calculateEdgeMarkerPositions(sceneWidth, sceneHeight) {
        const cornerBuffer = 3; // 3 hexes from corner

        // Calculate max row and column based on scene dimensions
        const maxRow = Math.floor(sceneHeight / this.rowHeight) - 1;
        const maxCol = Math.floor(sceneWidth / this.colWidth) - 1;

        const markers = [];

        // Coreward (top edge) - targetHexRow = 0
        const targetHexRow = 0;
        const minCol = cornerBuffer;
        const maxColForTop = maxCol - cornerBuffer;
        const targetHexCol = getRandomInt(minCol, maxColForTop);

        let x = targetHexCol * this.colWidth;
        let y = targetHexRow * this.rowHeight;

        // Offset for even rows
        if (targetHexRow % 2 === 0) {
            x += this.colWidth / 2;
        }

        markers.push({ x, y, edge: "coreward" });

        // Rimward (bottom edge) - targetHexRow = max row
        const rimwardHexRow = maxRow;
        const minColForBottom = cornerBuffer;
        const maxColForBottom = maxCol - cornerBuffer;
        const rimwardHexCol = getRandomInt(minColForBottom, maxColForBottom);

        let rimwardX = rimwardHexCol * this.colWidth;
        let rimwardY = rimwardHexRow * this.rowHeight;

        // Offset for even rows
        if (rimwardHexRow % 2 === 0) {
            rimwardX += this.colWidth / 2;
        }

        markers.push({ x: rimwardX, y: rimwardY, edge: "rimward" });

        // Spinward (left edge) - targetHexCol = 0
        const targetHexColLeft = 0;
        const minRow = cornerBuffer;
        const maxRowForLeft = maxRow - cornerBuffer;
        const targetHexRowLeft = getRandomInt(minRow, maxRowForLeft);

        let spinwardX = targetHexColLeft * this.colWidth;
        let spinwardY = targetHexRowLeft * this.rowHeight;

        // Offset for even rows
        if (targetHexRowLeft % 2 === 0) {
            spinwardX += this.colWidth / 2;
        }

        markers.push({ x: spinwardX, y: spinwardY, edge: "spinward" });

        // Trailing (right edge) - targetHexCol = max col
        const trailingHexCol = maxCol;
        const minRowForRight = cornerBuffer;
        const maxRowForRight = maxRow - cornerBuffer;
        const trailingHexRow = getRandomInt(minRowForRight, maxRowForRight);

        let trailingX = trailingHexCol * this.colWidth;
        let trailingY = trailingHexRow * this.rowHeight;

        // Offset for even rows
        if (trailingHexRow % 2 === 0) {
            trailingX += this.colWidth / 2;
        }

        markers.push({ x: trailingX, y: trailingY, edge: "trailing" });

        return markers;
    }
}

/**
 * Generates locations (settlements, planets, stellar objects)
 */
class LocationGenerator {
    constructor(tableRoller, folderManager) {
        this.tableRoller = tableRoller;
        this.folderManager = folderManager;
    }

    /**
     * Creates a settlement actor
     * @param {string} name - Settlement name
     * @param {string} folderId - Folder ID for the settlement
     * @param {string} klass - Settlement class
     * @param {string} description - Settlement description
     * @returns {Promise<Actor>} The created settlement actor
     */
    async createSettlement(name, folderId, klass, description) {
        try {
            const settlement = await CONFIG.IRONSWORN.actorClass.create({
                type: "location",
                name,
                folder: folderId,
                system: {
                    subtype: "settlement",
                    klass,
                    description,
                },
                img: `${SECTOR_CONFIG.ASSETS.SETTLEMENT_BASE}${klass.replace(
                    /\s+/g,
                    ""
                )}.webp`,
                prototypeToken: {
                    displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
                    actorLink: true,
                    "texture.scaleX": SECTOR_CONFIG.TOKEN_SCALES.SETTLEMENT,
                    "texture.scaleY": SECTOR_CONFIG.TOKEN_SCALES.SETTLEMENT,
                },
            });
            return settlement;
        } catch (error) {
            console.error(`Error creating settlement ${name}:`, error);
            throw error;
        }
    }

    /**
     * Creates a planet actor
     * @param {string} name - Planet name
     * @param {string} folderId - Folder ID for the planet
     * @param {string} klass - Planet class
     * @param {string} description - Planet description
     * @param {string} planetaryClass - Full planetary class name
     * @returns {Promise<Actor>} The created planet actor
     */
    async createPlanet(name, folderId, klass, description, planetaryClass) {
        try {
            const planet = await CONFIG.IRONSWORN.actorClass.create({
                type: "location",
                name,
                folder: folderId,
                system: {
                    subtype: "planet",
                    klass,
                    description,
                },
                img: `${SECTOR_CONFIG.ASSETS.PLANET_BASE}${
                    planetaryClass.split(" ")[0]
                }-0${getRandomInt(1, 2)}.webp`,
                prototypeToken: {
                    displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                    disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
                    actorLink: true,
                    "texture.scaleX": SECTOR_CONFIG.TOKEN_SCALES.PLANET,
                    "texture.scaleY": SECTOR_CONFIG.TOKEN_SCALES.PLANET,
                },
            });
            return planet;
        } catch (error) {
            console.error(`Error creating planet ${name}:`, error);
            throw error;
        }
    }
}

// ============================================================================
// MAIN GENERATION FUNCTIONS
// ============================================================================

/**
 * Gets region configuration
 * @param {string} region - Region name
 * @returns {Object} Region configuration
 */
function getRegionConfig(region) {
    const regionUpper = region.toUpperCase();
    const config = SECTOR_CONFIG.REGIONS[regionUpper];

    if (!config) {
        console.warn(`Unknown region ${region}, defaulting to Terminus`);
        return SECTOR_CONFIG.REGIONS.TERMINUS;
    }

    return {
        ...config,
        populationOracle:
            SECTOR_CONFIG.ROLL_TABLES.PREFIX + config.populationOracle,
    };
}

/**
 * Creates a sector scene
 * @param {string} region - Region name
 * @param {string} sectorName - Sector name
 * @param {Folder} sectorFolder - Folder for the sector
 * @returns {Promise<Scene>} The created scene
 */
async function createSectorScene(region, sectorName, sectorFolder) {
    try {
        const result = await FilePicker.browse(
            "data",
            SECTOR_CONFIG.ASSETS.SECTORS_PATH
        );

        if (result.files.length === 0) {
            throw new Error("No sector image files found");
        }

        const sceneData = [];
        for (const file of result.files) {
            const { width, height } = await loadTexture(file);
            sceneData.push({
                folder: sectorFolder.id,
                name: sectorName,
                fogExploration: false,
                "flags.foundry-ironsworn.region": region.toLowerCase(),
                tokenVision: false,
                navigation: false,
                "grid.type": SECTOR_CONFIG.SCENE.GRID_TYPE,
                "grid.color": SECTOR_CONFIG.SCENE.GRID_COLOR,
                "grid.alpha": SECTOR_CONFIG.SCENE.GRID_ALPHA,
                "grid.size": SECTOR_CONFIG.SCENE.GRID_SIZE,
                "background.src": file,
                backgroundColor: SECTOR_CONFIG.SCENE.BACKGROUND_COLOR,
                padding: 0,
                "initial.scale": SECTOR_CONFIG.SCENE.INITIAL_SCALE,
                "initial.x": SECTOR_CONFIG.SCENE.INITIAL_X,
                "initial.y": SECTOR_CONFIG.SCENE.INITIAL_Y,
                foregroundElevation: SECTOR_CONFIG.SCENE.FOREGROUND_ELEVATION,
                width,
                height,
            });
        }

        const scenes = await Scene.createDocuments(sceneData);
        console.log("Created sector:", scenes[0].name);
        return scenes[0];
    } catch (error) {
        console.error("Error creating sector scene:", error);
        throw error;
    }
}

/**
 * Generates settlement description
 * @param {TableRoller} tableRoller - Table roller instance
 * @param {string} populationOracle - Population oracle UUID
 * @returns {Promise<Object>} Settlement details
 */
async function generateSettlementDetails(tableRoller, populationOracle) {
    const nameRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.SETTLEMENT_NAME
    );
    const settlementName = tableRoller.getRollText(nameRoll);

    const klassRoll = await tableRoller.rollTable(
        SECTOR_CONFIG.ROLL_TABLES.SETTLEMENT_KLASS
    );
    const settlementKlass = tableRoller.getRollText(klassRoll).toLowerCase();

    const populationRoll = await tableRoller.rollTable(populationOracle);
    const population = tableRoller.getRollText(populationRoll);

    const authorityRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.AUTHORITY
    );
    const authority = tableRoller.getRollText(authorityRoll);

    let settlementProject = "";
    const projectCount = getRandomInt(1, 2);
    for (let i = 0; i < projectCount; i++) {
        const projectRoll = await tableRoller.rollFromArray(
            SECTOR_CONFIG.ROLL_TABLES.SETTLEMENT_PROJECT
        );
        let projectText = tableRoller.getRollText(projectRoll);

        // Check if result contains "Action" and "Theme" - if so, roll on those tables
        if (projectText.includes("Action") && projectText.includes("Theme")) {
            const actionRoll = await tableRoller.rollFromArray(
                SECTOR_CONFIG.ROLL_TABLES.ACTION
            );
            const action = tableRoller.getRollText(actionRoll);

            const themeRoll = await tableRoller.rollFromArray(
                SECTOR_CONFIG.ROLL_TABLES.THEME
            );
            const theme = tableRoller.getRollText(themeRoll);

            // Concatenate with space
            projectText = `${action} ${theme}`;
        }

        settlementProject += projectText + "<br>";
    }

    const description = `<p><strong>Population:</strong> ${population}</p>
        <p><strong>Authority:</strong> ${authority}</p>
        <p><strong>Settlement projects:</strong> ${settlementProject}</p>`;

    return {
        name: settlementName,
        klass: settlementKlass,
        description,
    };
}

/**
 * Generates planet details
 * @param {TableRoller} tableRoller - Table roller instance
 * @returns {Promise<Object>} Planet details
 */
async function generatePlanetDetails(tableRoller) {
    const classRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.PLANETARY_CLASS
    );
    const rollText = tableRoller.getRollText(classRoll);

    const planetaryClass =
        getStringBetween(rollText, "</i>", "</a>")?.trim() || rollText.trim();
    const planetaryKlass = planetaryClass.split(" ")[0].toLowerCase();

    const planetTables =
        SECTOR_CONFIG.PLANET_TABLES[planetaryKlass] ||
        SECTOR_CONFIG.PLANET_TABLES.vital;

    if (!planetTables || !planetTables.name) {
        console.error(`No planet tables found for class: ${planetaryKlass}`);
        return {
            name: "Unknown Planet",
            klass: planetaryKlass,
            class: planetaryClass,
        };
    }

    const nameRoll = await tableRoller.rollFromArray(planetTables.name);
    const planetaryName = tableRoller.getRollText(nameRoll);

    return {
        name: planetaryName,
        klass: planetaryKlass,
        class: planetaryClass,
        tables: planetTables, // Include full tables object for future use
    };
}

/**
 * Generates stellar object details
 * @param {TableRoller} tableRoller - Table roller instance
 * @param {string} settlementName - Settlement name for naming
 * @returns {Promise<Object>} Stellar object details
 */
async function generateStellarObjectDetails(tableRoller, settlementName) {
    const typeRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.STELLAR_OBJECT
    );
    const stellarObjectTypeDescription = tableRoller.getRollText(typeRoll);

    const star = getStellarObjectTypes().find(
        (item) =>
            item.value.toLowerCase() ===
            stellarObjectTypeDescription.toLowerCase()
    );

    return {
        name: `${settlementName}'s Star`,
        klass: stellarObjectTypeDescription.toLowerCase(),
        imgKey: star?.imgKey || null,
    };
}

/**
 * Creates a stellar object actor
 * @param {string} name - Stellar object name
 * @param {string} folderId - Folder ID for the stellar object
 * @param {string} klass - Stellar object class
 * @param {string} description - Stellar object description
 * @param {string|null} imgKey - Image key for the stellar object
 * @returns {Promise<Actor>} The created stellar object actor
 */
async function createStellarObject(name, folderId, klass, description, imgKey) {
    try {
        const img = imgKey
            ? `${SECTOR_CONFIG.ASSETS.STELLAR_OBJECT_BASE}${imgKey}-01.webp`
            : SECTOR_CONFIG.ASSETS.STELLAR_OBJECT_FALLBACK;

        const stellarObject = await CONFIG.IRONSWORN.actorClass.create({
            type: "location",
            name,
            folder: folderId,
            system: {
                subtype: "star",
                klass,
                description,
            },
            img,
            prototypeToken: {
                displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
                actorLink: true,
                "texture.scaleX": SECTOR_CONFIG.TOKEN_SCALES.STELLAR_OBJECT,
                "texture.scaleY": SECTOR_CONFIG.TOKEN_SCALES.STELLAR_OBJECT,
            },
        });
        return stellarObject;
    } catch (error) {
        console.error(`Error creating stellar object ${name}:`, error);
        throw error;
    }
}

/**
 * Generates connection (foe) details
 * @param {TableRoller} tableRoller - Table roller instance
 * @param {string} settlementName - Settlement name for context
 * @returns {Promise<Object>} Connection details
 */
async function generateConnectionDetails(tableRoller, settlementName) {
    // Generate all three name types
    const givenNameRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.CHARACTER_GIVEN_NAME
    );
    const givenName = tableRoller.getRollText(givenNameRoll);

    const familyNameRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.CHARACTER_FAMILY_NAME
    );
    const familyName = tableRoller.getRollText(familyNameRoll);

    const callsignRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.CHARACTER_CALLSIGN
    );
    const callsign = tableRoller.getRollText(callsignRoll);

    // Concatenate name in format: "given_name family_name / callsign"
    const connectionName = `${givenName} ${familyName} (${callsign})`;

    // Roll for role
    const roleRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.CHARACTER_ROLE
    );
    let role = tableRoller.getRollText(roleRoll);

    // Check if result contains "roll twice" - if so, roll twice and ensure no duplicates
    if (role.toLowerCase().includes("roll twice")) {
        const roleResults = [];
        let attempts = 0;
        const maxAttempts = 20; // Prevent infinite loops

        while (roleResults.length < 2 && attempts < maxAttempts) {
            const roleRoll2 = await tableRoller.rollFromArray(
                SECTOR_CONFIG.ROLL_TABLES.CHARACTER_ROLE
            );
            let roleText = tableRoller.getRollText(roleRoll2);

            // Process Action/Theme if needed
            if (roleText.includes("Action") && roleText.includes("Theme")) {
                const actionRoll = await tableRoller.rollFromArray(
                    SECTOR_CONFIG.ROLL_TABLES.ACTION
                );
                const action = tableRoller.getRollText(actionRoll);

                const themeRoll = await tableRoller.rollFromArray(
                    SECTOR_CONFIG.ROLL_TABLES.THEME
                );
                const theme = tableRoller.getRollText(themeRoll);

                roleText = `${action} ${theme}`;
            }

            // Skip if it's a duplicate or another "roll twice"
            if (
                !roleText.toLowerCase().includes("roll twice") &&
                !roleResults.includes(roleText)
            ) {
                roleResults.push(roleText);
            }
            attempts++;
        }

        role = roleResults.join("<br>");
    } else {
        // Check if result contains "Action" and "Theme" - if so, roll on those tables
        if (role.includes("Action") && role.includes("Theme")) {
            const actionRoll = await tableRoller.rollFromArray(
                SECTOR_CONFIG.ROLL_TABLES.ACTION
            );
            const action = tableRoller.getRollText(actionRoll);

            const themeRoll = await tableRoller.rollFromArray(
                SECTOR_CONFIG.ROLL_TABLES.THEME
            );
            const theme = tableRoller.getRollText(themeRoll);

            // Concatenate with space
            role = `${action} ${theme}`;
        }
    }

    // Roll for first look
    const firstLookRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.CHARACTER_FIRST_LOOK
    );
    const firstLook = tableRoller.getRollText(firstLookRoll);

    // Roll for goal
    const goalRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.CHARACTER_GOAL
    );
    let goal = tableRoller.getRollText(goalRoll);

    // Check if result contains "roll twice" - if so, roll twice and ensure no duplicates
    if (goal.toLowerCase().includes("roll twice")) {
        const goalResults = [];
        let attempts = 0;
        const maxAttempts = 20; // Prevent infinite loops

        while (goalResults.length < 2 && attempts < maxAttempts) {
            const goalRoll2 = await tableRoller.rollFromArray(
                SECTOR_CONFIG.ROLL_TABLES.CHARACTER_GOAL
            );
            let goalText = tableRoller.getRollText(goalRoll2);

            // Process Action/Theme if needed
            if (goalText.includes("Action") && goalText.includes("Theme")) {
                const actionRoll = await tableRoller.rollFromArray(
                    SECTOR_CONFIG.ROLL_TABLES.ACTION
                );
                const action = tableRoller.getRollText(actionRoll);

                const themeRoll = await tableRoller.rollFromArray(
                    SECTOR_CONFIG.ROLL_TABLES.THEME
                );
                const theme = tableRoller.getRollText(themeRoll);

                goalText = `${action} ${theme}`;
            }

            // Skip if it's a duplicate or another "roll twice"
            if (
                !goalText.toLowerCase().includes("roll twice") &&
                !goalResults.includes(goalText)
            ) {
                goalResults.push(goalText);
            }
            attempts++;
        }

        goal = goalResults.join("<br>");
    } else {
        // Check if result contains "Action" and "Theme" - if so, roll on those tables
        if (goal.includes("Action") && goal.includes("Theme")) {
            const actionRoll = await tableRoller.rollFromArray(
                SECTOR_CONFIG.ROLL_TABLES.ACTION
            );
            const action = tableRoller.getRollText(actionRoll);

            const themeRoll = await tableRoller.rollFromArray(
                SECTOR_CONFIG.ROLL_TABLES.THEME
            );
            const theme = tableRoller.getRollText(themeRoll);

            // Concatenate with space
            goal = `${action} ${theme}`;
        }
    }

    // Roll for revealed aspect
    const aspectRoll = await tableRoller.rollFromArray(
        SECTOR_CONFIG.ROLL_TABLES.REVEALED_CHARACTER_ASPECT
    );
    const aspect = tableRoller.getRollText(aspectRoll);

    return {
        name: connectionName,
        givenName,
        familyName,
        callsign,
        role,
        firstLook,
        goal,
        aspect,
    };
}

/**
 * Creates a connection (foe) actor
 * @param {string} name - Connection name
 * @param {string} folderId - Folder ID for the connection
 * @param {string} description - Connection description
 * @returns {Promise<Actor>} The created connection actor
 */
async function createConnection(name, folderId, description) {
    try {
        const connection = await CONFIG.IRONSWORN.actorClass.create({
            type: "foe",
            img: "icons/svg/mystery-man.svg",
            name,
            folder: folderId,
            system: {
                description,
            },
            prototypeToken: {
                name,
                displayName: CONST.TOKEN_DISPLAY_MODES.ALWAYS,
                disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
                actorLink: true,
                "texture.scaleX": SECTOR_CONFIG.TOKEN_SCALES.STELLAR_OBJECT,
                "texture.scaleY": SECTOR_CONFIG.TOKEN_SCALES.STELLAR_OBJECT,
                "texture.src": "icons/svg/mystery-man.svg",
            },
        });
        return connection;
    } catch (error) {
        console.error(`Error creating connection ${name}:`, error);
        throw error;
    }
}

/**
 * Creates a settlement with associated planet and stellar object
 * @param {Object} params - Parameters object
 * @returns {Promise<Object>} Created entities and UUIDs
 */
async function createSettlementWithLocation(params) {
    const {
        index,
        totalSettlements,
        tableRoller,
        locationGenerator,
        tokenPlacer,
        scene,
        folderManager,
        locationsSectorFolder,
        populationOracle,
        generateStars,
        useTokenAttacher,
    } = params;

    // Generate settlement details
    const settlementDetails = await generateSettlementDetails(
        tableRoller,
        populationOracle
    );

    // Create a folder for this settlement
    const settlementFolder = await folderManager.getOrCreateFolder(
        settlementDetails.name,
        "Actor",
        locationsSectorFolder.id
    );

    const settlement = await locationGenerator.createSettlement(
        settlementDetails.name,
        settlementFolder.id,
        settlementDetails.klass,
        settlementDetails.description
    );

    // Calculate settlement position
    const settlementPos = tokenPlacer.calculateSettlementPosition(
        index,
        totalSettlements,
        scene.width,
        scene.height,
        params.existingPositions || [],
        7 // Minimum 7 hexes from other settlements
    );
    const tokenDataSettlement = await settlement.getTokenDocument();

    scene.activate();
    const tokenSettlement = await scene.createEmbeddedDocuments("Token", [
        {
            ...tokenDataSettlement.toObject(),
            x: settlementPos.x,
            y: settlementPos.y,
            sort: 2,
        },
    ]);

    const uuidSettlement = `@UUID[${settlement.uuid}]{${settlement.name}}`;
    const conjunction =
        settlementDetails.klass === "deep space"
            ? "is a deep space settlement"
            : settlementDetails.klass === "orbital"
            ? "is an orbital settlement of planet"
            : "is a planetside settlement on planet";

    let planet = null;
    let uuidPlanet = "";
    let uuidStellarObject = "";

    // Create planet if not deep space
    if (settlementDetails.klass !== "deep space") {
        const planetDetails = await generatePlanetDetails(tableRoller);
        const planetDescription = `<p><b>Settlement:</b> ${uuidSettlement}</p>`;

        planet = await locationGenerator.createPlanet(
            planetDetails.name,
            settlementFolder.id,
            planetDetails.klass,
            planetDescription,
            planetDetails.class
        );

        uuidPlanet = `@UUID[${planet.uuid}]{${planet.name}}`;

        // Update settlement with planet link
        settlement.system.description += `\n<p><b>Planet:</b> ${uuidPlanet}</p>`;
        await CONFIG.IRONSWORN.actorClass.updateDocuments([
            {
                _id: settlement._id,
                system: { description: settlement.system.description },
            },
        ]);

        // Place planet token
        const planetPos = tokenPlacer.calculatePlanetPosition(
            settlementPos.col,
            settlementPos.row
        );
        const tokenDataPlanet = await planet.getTokenDocument();

        console.log(
            `Placing planet ${planet.name} at (x: ${planetPos.x}, y: ${planetPos.y})`
        );

        const tokenPlanet = await scene.createEmbeddedDocuments("Token", [
            {
                ...tokenDataPlanet.toObject(),
                x: planetPos.x,
                y: planetPos.y,
            },
        ]);

        // Attach tokens if requested
        if (
            useTokenAttacher &&
            game.modules.get(SECTOR_CONFIG.MODULES.TOKEN_ATTACHER)?.active
        ) {
            const targetTokenSettlement = canvas.tokens.get(
                tokenSettlement[0].id
            );
            const targetTokenPlanet = canvas.tokens.get(tokenPlanet[0].id);

            targetTokenPlanet.setTarget(true, {
                user: game.user,
                releaseOthers: true,
            });
            tokenAttacher.attachElementToToken(
                targetTokenPlanet,
                targetTokenSettlement
            );
            targetTokenPlanet.setTarget(false, {
                user: game.user,
                releaseOthers: true,
            });
        }
    }

    // Create stellar object if requested
    if (generateStars) {
        const stellarDetails = await generateStellarObjectDetails(
            tableRoller,
            settlementDetails.name
        );
        const stellarDescription =
            `<p><b>Settlement:</b> ${uuidSettlement}</p>` +
            (uuidPlanet ? `\n<p><b>Planet:</b> ${uuidPlanet}</p>` : "");

        const stellarObject = await createStellarObject(
            stellarDetails.name,
            settlementFolder.id,
            stellarDetails.klass,
            stellarDescription,
            stellarDetails.imgKey
        );

        uuidStellarObject = `@UUID[${stellarObject.uuid}]{${stellarObject.name}}`;

        // Update settlement with star link
        settlement.system.description += `\n<p><b>Star:</b> ${uuidStellarObject}</p>`;
        await CONFIG.IRONSWORN.actorClass.updateDocuments([
            {
                _id: settlement._id,
                system: { description: settlement.system.description },
            },
        ]);

        // Update planet with star link if it exists
        if (planet) {
            planet.system.description += `\n<p><b>Star:</b> ${uuidStellarObject}</p>`;
            await CONFIG.IRONSWORN.actorClass.updateDocuments([
                {
                    _id: planet._id,
                    system: { description: planet.system.description },
                },
            ]);
        }
    }

    // Build description string for journal
    let description;
    if (settlementDetails.klass !== "deep space") {
        description =
            `${uuidSettlement} ${conjunction} ${uuidPlanet}` +
            (generateStars
                ? ` in the ${uuidStellarObject} stellar system.`
                : ".");
    } else {
        description =
            `${uuidSettlement} ${conjunction}` +
            (generateStars
                ? ` in the ${uuidStellarObject} stellar system.`
                : ".");
    }

    return { 
        description, 
        settlement, 
        settlementToken: tokenSettlement[0],
        position: { x: settlementPos.x, y: settlementPos.y }
    };
}

/**
 * Generates all settlements for a sector
 * @param {Object} params - Parameters object
 * @returns {Promise<Object>} Object with descriptions array and settlements array
 */
async function generateSettlements(params) {
    const {
        numberOfSettlements,
        region,
        sectorName,
        tableRoller,
        locationGenerator,
        tokenPlacer,
        scene,
        folderManager,
        populationOracle,
        generateStars,
        useTokenAttacher,
    } = params;

    const folders = await folderManager.getRegionFolders(region);
    const locationsSectorFolder = await folderManager.getOrCreateFolder(
        sectorName,
        "Actor",
        folders.locations.id
    );

    const descriptions = [];
    const settlements = [];
    const settlementTokens = [];
    const existingPositions = []; // Track positions to ensure minimum distance

    for (let i = 0; i < numberOfSettlements; i++) {
        try {
            const result = await createSettlementWithLocation({
                index: i,
                totalSettlements: numberOfSettlements,
                tableRoller,
                locationGenerator,
                tokenPlacer,
                scene,
                folderManager,
                locationsSectorFolder,
                populationOracle,
                generateStars,
                useTokenAttacher,
                existingPositions: existingPositions, // Pass existing positions
            });
            descriptions.push(result.description);
            settlements.push(result.settlement);
            if (result.settlementToken) {
                settlementTokens.push(result.settlementToken);
            }
            // Add this settlement's position to the list for next iteration
            if (result.position) {
                existingPositions.push(result.position);
            }
        } catch (error) {
            console.error(`Error creating settlement ${i + 1}:`, error);
            ui.notifications.error(`Failed to create settlement ${i + 1}`);
        }
    }

    return { descriptions, settlements, settlementTokens };
}

/**
 * Creates a sector journal entry
 * @param {string} sectorName - Sector name
 * @param {string} region - Region name
 * @param {string} sectorTrouble - Sector trouble description
 * @param {Array<string>} locationDescriptions - Array of location descriptions
 * @param {Folder} journalFolder - Folder for the journal
 * @returns {Promise<JournalEntry>} The created journal entry
 */
async function createSectorJournal(
    sectorName,
    region,
    sectorTrouble,
    locationDescriptions,
    journalFolder
) {
    try {
        const journal = await JournalEntry.create({
            name: sectorName,
            folder: journalFolder.id,
            pages: [
                {
                    name: "Overview",
                    text: {
                        content: `${sectorName} is located in the ${region}.`,
                    },
                },
                {
                    name: "Sector Trouble",
                    text: { content: `${sectorTrouble}.` },
                },
                {
                    name: "Sector Locations",
                    text: {
                        content:
                            locationDescriptions
                                .sort((a, b) =>
                                    a.localeCompare(b, undefined, {
                                        sensitivity: "base",
                                    })
                                )
                                .join("<br>") + `</p>`,
                    },
                },
            ],
        });
        return journal;
    } catch (error) {
        console.error("Error creating sector journal:", error);
        throw error;
    }
}

/**
 * Zooms in on a settlement (generates additional details)
 * @param {TableRoller} tableRoller - Table roller instance
 * @param {Array<Actor>} settlements - Array of settlement actors
 */
async function zoomInOnASettlement(tableRoller, settlements) {
    try {
        if (!settlements || settlements.length === 0) {
            console.warn("No settlements available for zoom in");
            return;
        }

        // Choose a random settlement
        const randomSettlement = randomArrayItem(settlements);
        console.log(`Zooming in on settlement: ${randomSettlement.name}`);

        // Roll on First Look table 1-2 times
        const firstLookCount = getRandomInt(1, 2);
        const firstLooks = [];
        for (let i = 0; i < firstLookCount; i++) {
            let firstLook;
            let attempts = 0;
            const maxAttempts = 10; // Prevent infinite loops

            do {
                const firstLookRoll = await tableRoller.rollFromArray(
                    SECTOR_CONFIG.ROLL_TABLES.FIRST_LOOK
                );
                firstLook = tableRoller.getRollText(firstLookRoll);
                attempts++;

                // Check if result contains "Descriptor" and "Focus" - if so, roll on those tables
                if (
                    firstLook.includes("Descriptor") &&
                    firstLook.includes("Focus")
                ) {
                    const descriptorRoll = await tableRoller.rollFromArray(
                        SECTOR_CONFIG.ROLL_TABLES.DESCRIPTOR
                    );
                    const descriptor = tableRoller.getRollText(descriptorRoll);

                    const focusRoll = await tableRoller.rollFromArray(
                        SECTOR_CONFIG.ROLL_TABLES.FOCUS
                    );
                    const focus = tableRoller.getRollText(focusRoll);

                    // Concatenate with space
                    firstLook = `${descriptor} ${focus}`;
                }

                // If this is the second roll and it matches the first, re-roll
                if (
                    i === 1 &&
                    firstLook === firstLooks[0] &&
                    attempts < maxAttempts
                ) {
                    continue;
                }
                break;
            } while (attempts < maxAttempts);

            firstLooks.push(firstLook);
        }

        // Roll once on Settlement Trouble table
        const troubleRoll = await tableRoller.rollFromArray(
            SECTOR_CONFIG.ROLL_TABLES.SETTLEMENT_TROUBLE
        );
        let settlementTrouble = tableRoller.getRollText(troubleRoll);

        // Check if result contains "Action" and "Theme" - if so, roll on those tables
        if (
            settlementTrouble.includes("Action") &&
            settlementTrouble.includes("Theme")
        ) {
            const actionRoll = await tableRoller.rollFromArray(
                SECTOR_CONFIG.ROLL_TABLES.ACTION
            );
            const action = tableRoller.getRollText(actionRoll);

            const themeRoll = await tableRoller.rollFromArray(
                SECTOR_CONFIG.ROLL_TABLES.THEME
            );
            const theme = tableRoller.getRollText(themeRoll);

            // Concatenate with space
            settlementTrouble = `${action} ${theme}`;
        }

        // Build the additional description text
        let additionalDescription = "<p><strong>First Look:</strong> ";
        additionalDescription += firstLooks.join("<br>");
        additionalDescription += "</p>";
        additionalDescription += `<p><strong>Settlement Trouble:</strong> ${settlementTrouble}</p>`;

        // If settlement is planetside or orbital, add planet details
        const settlementKlass = randomSettlement.system.klass;
        if (settlementKlass !== "deep space") {
            // Extract planet UUID from settlement description (look for Planet: line)
            const planetUuidMatch = randomSettlement.system.description.match(
                /<b>Planet:<\/b>\s*@UUID\[([^\]]+)\]/
            );
            if (planetUuidMatch) {
                try {
                    const planet = await fromUuid(planetUuidMatch[1]);
                    if (planet && planet.system && planet.system.klass) {
                        const planetKlass = planet.system.klass.toLowerCase();
                        const planetTables =
                            SECTOR_CONFIG.PLANET_TABLES[planetKlass];

                        if (planetTables) {
                            // Roll on Atmosphere table (once)
                            const atmosphereRoll =
                                await tableRoller.rollFromArray(
                                    planetTables.atmosphere
                                );
                            const atmosphere =
                                tableRoller.getRollText(atmosphereRoll);

                            // Roll on Observed From Space table (1-2 times, no duplicates)
                            const observedCount = getRandomInt(1, 2);
                            const observedResults = [];
                            for (let i = 0; i < observedCount; i++) {
                                let observed;
                                let attempts = 0;
                                const maxAttempts = 10;

                                do {
                                    const observedRoll =
                                        await tableRoller.rollFromArray(
                                            planetTables.observedFromSpace
                                        );
                                    observed =
                                        tableRoller.getRollText(observedRoll);
                                    attempts++;

                                    // If this is the second roll and it matches the first, re-roll
                                    if (
                                        i === 1 &&
                                        observed === observedResults[0] &&
                                        attempts < maxAttempts
                                    ) {
                                        continue;
                                    }
                                    break;
                                } while (attempts < maxAttempts);

                                observedResults.push(observed);
                            }

                            // Roll on Planetside Features table (1-2 times, no duplicates)
                            const featureCount = getRandomInt(1, 2);
                            const featureResults = [];
                            for (let i = 0; i < featureCount; i++) {
                                let feature;
                                let attempts = 0;
                                const maxAttempts = 10;

                                do {
                                    const featureRoll =
                                        await tableRoller.rollFromArray(
                                            planetTables.planetsideFeature
                                        );
                                    feature =
                                        tableRoller.getRollText(featureRoll);
                                    attempts++;

                                    // If this is the second roll and it matches the first, re-roll
                                    if (
                                        i === 1 &&
                                        feature === featureResults[0] &&
                                        attempts < maxAttempts
                                    ) {
                                        continue;
                                    }
                                    break;
                                } while (attempts < maxAttempts);

                                featureResults.push(feature);
                            }

                            let planetDescription = planet.system.description;
                            planetDescription += `\n<p><strong>Atmosphere:</strong> ${atmosphere}</p>`;
                            planetDescription += `<p><strong>Observed From Space:</strong> ${observedResults.join(
                                "<br>"
                            )}</p>`;
                            planetDescription += `<p><strong>Planetside Features:</strong> ${featureResults.join(
                                "<br>"
                            )}</p>`;

                            // If the planet is "vital", roll on Diveristy and Biomes tables and add those as well
                            if (planetKlass === "vital") {
                                // Roll once on Diversity
                                let diversityStr = "";
                                let biomesStr = "";

                                if (planetTables.diversity) {
                                    const diversityRoll =
                                        await tableRoller.rollFromArray(
                                            planetTables.diversity
                                        );
                                    const diversity =
                                        tableRoller.getRollText(diversityRoll);
                                    diversityStr = diversity;
                                }

                                // Roll once on Biomes
                                if (planetTables.biomes) {
                                    const biomesRoll =
                                        await tableRoller.rollFromArray(
                                            planetTables.biomes
                                        );
                                    const biomes =
                                        tableRoller.getRollText(biomesRoll);
                                    biomesStr = biomes;
                                }

                                planetDescription += `<p><strong>Diversity:</strong> ${diversityStr}</p>`;
                                planetDescription += `<p><strong>Biomes:</strong> ${biomesStr}</p>`;
                            }

                            // Update the planet's description
                            await CONFIG.IRONSWORN.actorClass.updateDocuments([
                                {
                                    _id: planet._id,
                                    system: { description: planetDescription },
                                },
                            ]);

                            console.log(
                                `Updated planet ${
                                    planet.name
                                } with Atmosphere, Observed From Space, and Planetside Features${
                                    planetKlass === "vital"
                                        ? ", Diversity, Biomes"
                                        : ""
                                }`
                            );
                        }
                    }
                } catch (error) {
                    console.error(
                        `Error finding planet for settlement ${randomSettlement.name}:`,
                        error
                    );
                }
            }
        }

        // Update the settlement's description
        randomSettlement.system.description += "\n" + additionalDescription;
        await CONFIG.IRONSWORN.actorClass.updateDocuments([
            {
                _id: randomSettlement._id,
                system: { description: randomSettlement.system.description },
            },
        ]);

        console.log(
            `Updated settlement ${randomSettlement.name} with First Look and Settlement Trouble details`
        );
    } catch (error) {
        console.error("Error in zoomInOnASettlement:", error);
    }
}

/**
 * Finds the nearest marker token to a given settlement token
 * @param {TokenDocument} settlementToken - The settlement token to find nearest marker for
 * @param {Array} markerTokens - Array of marker token documents
 * @returns {TokenDocument|null} The nearest marker token, or null if none found
 */
function findNearestMarker(settlementToken, markerTokens) {
    if (!markerTokens || markerTokens.length === 0) {
        return null;
    }

    let nearestMarker = null;
    let minDistance = Infinity;

    for (const markerToken of markerTokens) {
        const dx = markerToken.x - settlementToken.x;
        const dy = markerToken.y - settlementToken.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
            minDistance = distance;
            nearestMarker = markerToken;
        }
    }

    return nearestMarker;
}

/**
 * Creates passage animations on the sector scene
 * @param {number} numberOfPassages - Number of passages to create
 * @param {Scene} scene - The scene to create passages on
 * @param {Array} settlementTokens - Array of settlement token documents
 * @param {Array} markerTokens - Array of marker token documents
 */
async function createPassageAnimations(numberOfPassages, scene, settlementTokens, markerTokens) {
    if (game.modules.get(SECTOR_CONFIG.MODULES.JB2A_DND5E)?.active && game.modules.get(SECTOR_CONFIG.MODULES.SEQUENCER)?.active) {
        if (!settlementTokens || settlementTokens.length === 0) {
            console.warn("No settlement tokens available for passage animations");
            return;
        }

        scene.activate();

        // Create one passage from a settlement to the nearest marker
        if (markerTokens && markerTokens.length > 0 && numberOfPassages > 0) {
            // Select a random settlement
            const sourceSettlementToken = randomArrayItem(settlementTokens);
            const nearestMarker = findNearestMarker(sourceSettlementToken, markerTokens);

            if (nearestMarker) {
                const canvasToken = canvas.tokens.get(sourceSettlementToken.id);
                const targetMarkerToken = canvas.tokens.get(nearestMarker.id);

                if (canvasToken && targetMarkerToken) {
                    let passageAnimation = new Sequence()
                        .effect()
                        .file("jb2a.energy_beam.normal.blue.01")
                        .attachTo(canvasToken)
                        .stretchTo(targetMarkerToken, { attachTo: true })
                        .persist()
                        .duration(1)
                        .scale({ x: 1.0, y: 0.3 })
                        .play();
                }
            }
        }

        // Create remaining passages between settlements
        const remainingPassages = numberOfPassages - 1;
        
        // Only create passages between settlements if there are remaining passages to create
        if (remainingPassages > 0) {
            // Need at least 2 tokens to create passages between them
            if (settlementTokens.length < 2) {
                console.warn("Need at least 2 settlement tokens to create passages between settlements");
                return;
            }

            // Track connected pairs to prevent duplicates (normalized: smaller ID first)
            const connectedPairs = new Set();
            
            /**
             * Creates a normalized pair key (smaller ID first) to treat A->B and B->A as the same
             * @param {string} id1 - First token ID
             * @param {string} id2 - Second token ID
             * @returns {string} Normalized pair key
             */
            function getPairKey(id1, id2) {
                return id1 < id2 ? `${id1}-${id2}` : `${id2}-${id1}`;
            }
            let attempts = 0;
            const maxAttempts = remainingPassages * 10; // Prevent infinite loops

            for (let i = 0; i < remainingPassages && attempts < maxAttempts; attempts++) {
                // Select a random settlement token as the source
                const sourceSettlementToken = randomArrayItem(settlementTokens);
                
                // Filter out the source token and select a different random token as the target
                const availableTargetTokens = settlementTokens.filter(
                    token => token.id !== sourceSettlementToken.id
                );
                
                if (availableTargetTokens.length === 0) {
                    console.warn("No available target tokens, skipping passage");
                    break;
                }
                
                const targetSettlementToken = randomArrayItem(availableTargetTokens);
                
                // Check if this pair has already been connected
                const pairKey = getPairKey(sourceSettlementToken.id, targetSettlementToken.id);
                if (connectedPairs.has(pairKey)) {
                    // This pair is already connected, try again
                    continue;
                }

                // Get the actual token objects from canvas
                const canvasToken = canvas.tokens.get(sourceSettlementToken.id);
                const targetToken = canvas.tokens.get(targetSettlementToken.id);
                
                if (!canvasToken) {
                    console.warn(`Source token ${sourceSettlementToken.id} not found on canvas`);
                    continue;
                }
                
                if (!targetToken) {
                    console.warn(`Target token ${targetSettlementToken.id} not found on canvas`);
                    continue;
                }
                
                // Mark this pair as connected
                connectedPairs.add(pairKey);
                
                let passageAnimation = new Sequence()
                    .effect()
                    .file("jb2a.energy_beam.normal.blue.01")
                    .attachTo(canvasToken)
                    .stretchTo(targetToken, { attachTo: true })
                    .persist()
                    .duration(1)
                    .scale({ x: 1.0, y: 0.3 })
                    .play();
                
                // Only increment i when we successfully create a passage
                i++;
            }
            
            if (attempts >= maxAttempts) {
                console.warn(`Reached maximum attempts (${maxAttempts}) while creating passages. Created ${connectedPairs.size} unique passages.`);
            }
        }
    }
}

/**
 * Creates marker tokens on the scene edges
 * @param {Scene} scene - The scene to create markers on
 * @param {TokenPlacer} tokenPlacer - Token placer instance for calculations
 * @param {FolderManager} folderManager - Folder manager instance
 * @param {Folder} locationsSectorFolder - Sector-specific locations folder
 * @returns {Promise<Array>} Array of created marker token documents
 */
async function createMarkerTokens(scene, tokenPlacer, folderManager, locationsSectorFolder) {
    try {
        scene.activate();

        // Calculate marker positions on edges
        const markerPositions = tokenPlacer.calculateEdgeMarkerPositions(
            scene.width,
            scene.height
        );

        const edgeNames = {
            coreward: "Coreward",
            rimward: "Rimward",
            spinward: "Spinward",
            trailing: "Trailing",
        };

        // Get or create " Navigation Markers" folder (with leading space for sorting)
        const navigationMarkersFolder = await folderManager.getOrCreateFolder(
            "Navigation Markers",
            "Actor",
            locationsSectorFolder.id
        );

        // Create marker actors and tokens
        const markerTokens = [];
        for (let i = 0; i < markerPositions.length; i++) {
            const pos = markerPositions[i];
            const markerName = `${edgeNames[pos.edge]} Marker`;

            // Create marker actor
            const markerActor = await CONFIG.IRONSWORN.actorClass.create({
                type: "location",
                name: markerName,
                folder: navigationMarkersFolder.id,
                system: {
                    subtype: "marker",
                    description: `<p>Marker located on the ${pos.edge} edge of the sector.</p>`,
                },
                img: "modules/starforged-custom-oracles/assets/square.svg",
                prototypeToken: {
                    displayName: CONST.TOKEN_DISPLAY_MODES.NONE,
                    disposition: CONST.TOKEN_DISPOSITIONS.NEUTRAL,
                    actorLink: true,
                    lockRotation: true,
                    rotation: 0,
                    alpha: 0,
                },
            });

            // Get token document from actor
            const tokenData = await markerActor.getTokenDocument();

            // Create token data
            markerTokens.push({
                ...tokenData.toObject(),
                x: pos.x,
                y: pos.y,
                sort: 0, // Place markers at the bottom of the sort order
            });
        }

        // Create all tokens at once
        const createdTokens = await scene.createEmbeddedDocuments("Token", markerTokens);

        console.log(
            `Created ${markerPositions.length} marker tokens on scene edges`
        );

        return createdTokens;
    } catch (error) {
        console.error("Error creating marker tokens:", error);
        ui.notifications.warn("Failed to create marker tokens");
        return [];
    }
}

/**
 * Main function to create a starting sector
 * @param {string} region - Region name
 * @param {boolean} startingSector - Whether this is a starting sector
 * @param {boolean} useTokenAttacher - Whether to use token attacher
 * @param {boolean} createPassages - Whether to create passages
 * @param {boolean} generateStars - Whether to generate stellar objects
 */
async function createStartingSector(
    region,
    startingSector,
    useTokenAttacher,
    createPassages,
    generateStars
) {
    if (!region || region === "") {
        ui.notifications.warn("No region selected");
        return;
    }

    try {
        // Initialize helpers
        const tableRoller = new TableRoller(SECTOR_CONFIG.ROLL_TABLES.PREFIX);
        const folderManager = new FolderManager();
        const tokenPlacer = new TokenPlacer(SECTOR_CONFIG.SCENE.GRID_SIZE);
        const locationGenerator = new LocationGenerator(
            tableRoller,
            folderManager
        );

        // Get region configuration
        const regionConfig = getRegionConfig(region);

        // Roll for sector name and trouble
        const sectorPrefixRoll = await tableRoller.rollFromArray(
            SECTOR_CONFIG.ROLL_TABLES.SECTOR_PREFIX
        );
        const sectorPrefix = tableRoller.getRollText(sectorPrefixRoll);

        const sectorSuffixRoll = await tableRoller.rollFromArray(
            SECTOR_CONFIG.ROLL_TABLES.SECTOR_SUFFIX
        );
        const sectorSuffix = tableRoller.getRollText(sectorSuffixRoll);

        const sectorTroubleRoll = await tableRoller.rollFromArray(
            SECTOR_CONFIG.ROLL_TABLES.SECTOR_TROUBLE
        );
        const sectorTrouble = tableRoller.getRollText(sectorTroubleRoll);

        const sectorName = `${sectorPrefix} ${sectorSuffix}`;

        // Get folders
        const folders = await folderManager.getRegionFolders(region);

        // Create sector scene
        const scene = await createSectorScene(
            region,
            sectorName,
            folders.sector
        );

        // Get locations folder for markers (same as settlements)
        const locationsSectorFolder = await folderManager.getOrCreateFolder(
            sectorName,
            "Actor",
            folders.locations.id
        );

        // Create marker tokens on scene edges
        const markerTokens = await createMarkerTokens(scene, tokenPlacer, folderManager, locationsSectorFolder);

        // Generate settlements
        const { descriptions: locationDescriptions, settlements, settlementTokens } =
            await generateSettlements({
                numberOfSettlements: regionConfig.settlements,
                region,
                sectorName,
                tableRoller,
                locationGenerator,
                tokenPlacer,
                scene,
                folderManager,
                populationOracle: regionConfig.populationOracle,
                generateStars,
                useTokenAttacher,
            });

        // Check for token attacher module
        if (
            useTokenAttacher &&
            !game.modules.get(SECTOR_CONFIG.MODULES.TOKEN_ATTACHER)?.active
        ) {
            ui.notifications.info(
                `The module ${SECTOR_CONFIG.MODULES.TOKEN_ATTACHER} is not active.`
            );
        }

        // Create connection if starting sector
        if (startingSector && settlements.length > 0) {
            try {
                // Get a random settlement to associate the connection with
                const randomSettlement = randomArrayItem(settlements);
                const uuidSettlement = `@UUID[${randomSettlement.uuid}]{${randomSettlement.name}}`;

                // Generate connection details
                const connectionDetails = await generateConnectionDetails(
                    tableRoller,
                    randomSettlement.name
                );

                // Build connection description
                const connectionDescription = `<p><b>Settlement:</b> ${uuidSettlement}</p>
                    <p><strong>Given Name:</strong> ${connectionDetails.givenName}</p>
                    <p><strong>Family Name:</strong> ${connectionDetails.familyName}</p>
                    <p><strong>Callsign:</strong> ${connectionDetails.callsign}</p>
                    <p><strong>Role:</strong> ${connectionDetails.role}</p>
                    <p><strong>First Look:</strong> ${connectionDetails.firstLook}</p>
                    <p><strong>Goal:</strong> ${connectionDetails.goal}</p>
                    <p><strong>Revealed Aspect:</strong> ${connectionDetails.aspect}</p>`;

                // Get or create characters folder
                const charactersFolder = await folderManager.getOrCreateFolder(
                    "Characters",
                    "Actor"
                );
                const charactersSectorFolder =
                    await folderManager.getOrCreateFolder(
                        sectorName,
                        "Actor",
                        charactersFolder.id
                    );

                // Create connection actor
                const connection = await createConnection(
                    connectionDetails.name,
                    charactersSectorFolder.id,
                    connectionDescription
                );

                // Place connection token on scene to the left of the settlement
                scene.activate();
                const settlementTokens = scene.tokens.filter(
                    (token) => token.actor?.id === randomSettlement.id
                );

                if (settlementTokens.length > 0) {
                    const settlementToken = settlementTokens[0];
                    const tokenDataConnection =
                        await connection.getTokenDocument();

                    // Calculate position one hex to the left
                    const connectionPos = tokenPlacer.calculateLeftHexPosition(
                        settlementToken.x,
                        settlementToken.y
                    );

                    await scene.createEmbeddedDocuments("Token", [
                        {
                            ...tokenDataConnection.toObject(),
                            x: connectionPos.x,
                            y: connectionPos.y,
                            sort: 1,
                        },
                    ]);

                    // Update settlement with connection link
                    const uuidConnection = `@UUID[${connection.uuid}]{${connection.name}}`;
                    randomSettlement.system.description += `\n<p><b>Connection:</b> ${uuidConnection}</p>`;
                    await CONFIG.IRONSWORN.actorClass.updateDocuments([
                        {
                            _id: randomSettlement._id,
                            system: {
                                description:
                                    randomSettlement.system.description,
                            },
                        },
                    ]);
                }

                console.log(
                    `Created connection ${connection.name} for settlement ${randomSettlement.name}`
                );
            } catch (error) {
                console.error("Error creating connection:", error);
                ui.notifications.warn("Failed to create connection");
            }
        }

        // Create passages if requested
        if (createPassages) {
            await createPassageAnimations(regionConfig.passages, scene, settlementTokens, markerTokens);
        }

        // Zoom in on settlement if starting sector
        if (startingSector) {
            await zoomInOnASettlement(tableRoller, settlements);
        }

        // Create journal
        const journal = await createSectorJournal(
            sectorName,
            region,
            sectorTrouble,
            locationDescriptions,
            folders.sectorData
        );

        // Link journal to scene
        await scene.update({ journal: journal.id });

        ui.notifications.info(`Successfully created sector: ${sectorName}`);
    } catch (error) {
        console.error("Error creating starting sector:", error);
        ui.notifications.error(`Failed to create sector: ${error.message}`);
    }
}

// ============================================================================
// UI FUNCTIONS
// ============================================================================

/**
 * Creates and shows the configuration dialog
 */
function showSectorCreationDialog() {
    const tokenAttacherActive =
        game.modules.get(SECTOR_CONFIG.MODULES.TOKEN_ATTACHER)?.active || false;
    const jb2aActive =
        game.modules.get(SECTOR_CONFIG.MODULES.JB2A_DND5E)?.active || false;
    const sequencerActive =
        game.modules.get(SECTOR_CONFIG.MODULES.SEQUENCER)?.active || false;

    let region = "";
    let startingSector = false;
    let useTokenAttacher = false;
    let createPassages = false;
    let generateStars = false;
    let shouldCreate = false;

    new Dialog({
        title: "Select Region and Sector Type",
        content: `
        <form class="flexcol">
            <div class="form-group">
                <label for="selectRegion">Region</label>
                <select name="selectRegion">
                    <option value="Terminus">Terminus</option>
                    <option value="Outlands">Outlands</option>
                    <option value="Expanse">Expanse</option>
                </select>
            </div>
            <div class="checkbox">
                <label><input type="checkbox" name="selectStartingSector" checked> Starting Sector</label>
            </div>
            <div class="checkbox">
                <label><input type="checkbox" name="useTokenAttacher" ${
                    tokenAttacherActive ? "checked" : ""
                }> Use Token Attacher</label>
            </div>
            <div class="checkbox">
                <label><input type="checkbox" name="createPassages" ${
                    jb2aActive && sequencerActive ? "checked" : ""
                }> Create Passages</label>
            </div>
            <div class="checkbox">
                <label><input type="checkbox" name="generateStars"> Generate Stars</label>
            </div>
        </form>
        `,
        buttons: {
            cancel: {
                icon: '<i class="fas fa-times"></i>',
                label: "Cancel",
                callback: () => {
                    shouldCreate = false;
                },
            },
            create: {
                icon: '<i class="fas fa-check"></i>',
                label: "Create",
                callback: (html) => {
                    try {
                        region = html.find('[name="selectRegion"]').val();
                        startingSector = html
                            .find('[name="selectStartingSector"]')
                            .is(":checked");
                        useTokenAttacher = html
                            .find('[name="useTokenAttacher"]')
                            .is(":checked");
                        createPassages = html
                            .find('[name="createPassages"]')
                            .is(":checked");
                        generateStars = html
                            .find('[name="generateStars"]')
                            .is(":checked");
                        shouldCreate = true;
                    } catch (error) {
                        console.error("Error reading dialog values:", error);
                        shouldCreate = false;
                    }
                },
            },
        },
        default: "create",
        close: () => {
            try {
                if (shouldCreate && region) {
                    createStartingSector(
                        region,
                        startingSector,
                        useTokenAttacher,
                        createPassages,
                        generateStars
                    );
                }
            } catch (error) {
                console.error("Error in dialog close callback:", error);
            }
        },
    }).render(true);
}

// ============================================================================
// ENTRY POINT
// ============================================================================

try {
    showSectorCreationDialog();
} catch (error) {
    console.error("Error in sector creation macro:", error);
    ui.notifications.error("Failed to initialize sector creation dialog");
}
