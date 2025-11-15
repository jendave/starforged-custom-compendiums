# Ironsworn: Starforged Custom Compendiums

![GitHub all releases](https://img.shields.io/github/downloads/jendave/starforged-custom-compendiums/total)
[![Latest Version](https://img.shields.io/github/v/release/jendave/starforged-custom-compendiums?display_name=tag&sort=semver&label=Latest%20Version)](https://github.com/jendave/starforged-custom-compendiums/releases/latest)
![Foundry Version](https://img.shields.io/endpoint?url=https://foundryshields.com/version?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjendave%2Fstarforged-custom-compendiums%2Fmain%2Fmodule.json)
[![License](https://img.shields.io/github/license/jendave/starforged-custom-compendiums)](LICENSE)

## About

A FoundryVTT compendium of homebrew resources for the Ironsworn: Starforged system.

## Contact

* [Ironsworn/Starforged Discord Server - FoundryVTT Channel](https://discord.com/channels/437120373436186625/867434336201605160) (jendave)
* [FoundryVTT Discord Server - Module Discussion Channel](https://discord.com/channels/170995199584108546/513918036919713802) (jendave)
* [VOID Affiliate Network Discord Server - Game Hacks Channel](https://discord.com/channels/1222986351272787990/1222986351792619687) (jendave)
* [GitHub Repository](https://github.com/jendave/augmented-reality-foundry)
* [Itch.io](https://jendave.itch.io/)

## Features and Notes

* Oracle tables contributed by fans are included in the compendium.
* Read the documentation in the journal compendium to locate resources by author, utility type, genre and theme.
* Want your Oracle included? Contact us on the [Ironsworn/Starforged Discord Server](https://discord.com/channels/437120373436186625/867434336201605160)!
* The Oracle/Rolltable compendiums are system-agnostic. The other compendiums are only available for the [Ironsworn & Starforged](https://foundryvtt.com/packages/foundry-ironsworn).

## Module Installation

To install the module, search for `Starforged` in the `Add-On Modules` tab of of the Foundry VTT game setup screen. Then click on `Install`.

Or use this URL and click on `Install`:

```bash
https://github.com/jendave/starforged-custom-compendiums/releases/latest/download/module.json
```

### Use Custom Folders to add Oracles, Assets and Moves to the Character Sheet

* Use the following method to integrate the `Starforged Custom Oracles` into the character sheet.
  * If it does not already exist, create a `Custom Oracles` folder in `Rollable Tables` tab called:
    * `Custom Oracles` - EN
    * `Oráculos personalizados` - ES
    * `Oracles personnalisés` - FR
    * `Własne Wyrocznie` - PL
    * `Свои оракулы` - RU
  * Open the `Starforged Custom Oracles` compendium and copy the folders into the `Rollable Tables` `Custom Oracles` folder.
    * ![Rollable Tables - Custom Oracles](https://github.com/jendave/starforged-custom-compendiums/blob/main/docs/custom-oracles-rollable-tables.jpg?raw=true)
  * The Oracles will be available in the Character sheet under `Custom Oracles`.
    * ![Character Sheet - Custom Oracles](https://github.com/jendave/starforged-custom-compendiums/blob/main//docs/custom-oracles-character-sheet.jpg?raw=true)
* Use the following method to integrate the `Starforged Custom Assets` into the character sheet.
  * Create a `Custom Assets` folder in the `Items` tab called:
    * `Custom Assets` - EN
    * `Recursos Personalizados` - ES
    * `Ressources personnalisées` - FR
    * `Własne Aspekty` - PL
  * Open the `Starforged Custom Assets` compendium and copy the Items into the `Items` `Custom Assets` folder.
    * ![Items - Custom Assets](https://github.com/jendave/starforged-custom-compendiums/blob/main/docs/custom-assets-items.jpg?raw=true)
  * The Assets will be available in the Character sheet under `Custom Assets`.
    * ![Character Sheet - Custom Assets](https://github.com/jendave/starforged-custom-compendiums/blob/main/docs/custom-assets-character-sheet.jpg?raw=true)
* Use the following method to integrate the `Starforged Custom Moves` into the character sheet.
  * Create a `Custom Moves` folder in the `Items` tab called:
    * `Custom Moves` - EN
    * `Movimientos personalizados` - ES
    * `Actions personnalisées` - FR
    * `Własne Ruchy` - PL
  * Open the `Starforged Custom Moves` compendium and copy the Items into the `Items` `Custom Moves` folder.
    * ![Items - Custom Moves](https://github.com/jendave/starforged-custom-compendiums/blob/main/docs/custom-moves-items.jpg?raw=true)
  * The Moves will be available in the Character sheet under `Custom Moves`.
    * ![Character Sheet - Custom Moves](https://github.com/jendave/starforged-custom-compendiums/blob/main/docs/custom-moves-character-sheet.jpg?raw=true)
* Reload the current FoundryVTT session by pressing CTRL-R (Windows/Linux) or CMD-R (Mac).
* Note that when using Custom Resources that refer to other Custom Resources, the character sheet may not scroll to other custom resources like it does with system resources.

### Macros

* Drag and drop macros from the `Starforged Custom Macros` compendium to the macro bar. Macros use the current `Roll Mode` when executed.

#### Build Starting Sector Macro

* Try out the [starting sector generation macro](https://github.com/jendave/starforged-custom-compendiums/blob/main/src/macros/jendave/build-starting-sector.js) to generate an entire starting sector with settlements, planets, stars, passages and a connection.
* For full functionality, include the following modules:
  * [Token Attacher](https://foundryvtt.com/packages/token-attacher) - for attaching planets to settlements.
  * [JB2A - Jules&Ben's Animated Assets](https://foundryvtt.com/packages/JB2A_DnD5e) - for creating passages between settlements.
  * [Sequencer](https://foundryvtt.com/packages/sequencer) - for creating passages between settlements.

### Dependencies

* The oracle arrays depend on the oracles in the following FoundryVTT modules in addition to the [Starforged Oracles](https://foundryvtt.com/packages/foundry-ironsworn).
  * [Ironsworn and Ironsworn: Delve](https://foundryvtt.com/packages/foundry-ironsworn)
  * [Ironsmith Expanded Oracles for Ironsworn](https://foundryvtt.com/packages/ironsmith-expanded-oracles)
  * [Starsmith Expanded Oracles for Ironsworn: Starforged](https://foundryvtt.com/packages/starsmith-expanded-oracles)
  * [Augmented Reality Cyberpunk City Kit](https://foundryvtt.com/packages/augmented-reality-foundry)

## Credits

Oracles, Assets and Journal Entries

* [Positive Plot Twists Oracle](https://discord.com/channels/437120373436186625/473169644698468352/1128160532113932349) by dukethesquirrelking is used with permission from the author.
* [Gender Expression Oracles](https://gender-oracle.neocities.org) by kindfulkirby is used with permission from the author.
* [Starforged Gear Oracle](https://illinalta.itch.io/starforged-gear-oracle) by illinalta is used with permission from the author.
* [Better + Moons](https://ellie-valkyrie.itch.io/sfbm) by ellie-valkyrie is used with permission from the author.
* [Iron City](https://vishae.itch.io/ironcity-district-generator) oracles by vishae are licensed for use under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA)](https://creativecommons.org/licenses/by-nc-sa/4.0/).
* [The Starforged Sojourner](https://rossum.itch.io/the-starforged-sojourner) oracle by rossum is used with permission granted to copy for personal use only.
* [Exploration Oracle Arrays](https://castelviator.itch.io/exploration-oracle-arrays) by Castelviator used with permission from the author.
* [Star Wars Oracles](https://cdoghusk.itch.io/star-wars-oracles-for-solo-co-op-roleplay) by cdoghusk used with permission from the author. You can [buy his books from Amazon](https://www.amazon.com/stores/Chad-Huskins/author/B0CPRJ113D?ref=ap_rdr&isDramIntegrated=true&shoppingPortalEnabled=true).
* [Time Traveller](https://lemunde.itch.io/ironsworn-starforged-time-traveler) by [lemunde](https://lemunde.itch.io) is licensed for use under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA)](https://creativecommons.org/licenses/by-nc-sa/4.0/).
* [Spacefaring Waypoints](https://cdn.discordapp.com/attachments/468867952033136652/1366915141106663545/si_waypoints_for_starforged_v1_0.pdf?ex=6813572d&is=681205ad&hm=5e4bfe0e0145a3172264d7f5c56eab06dbe00452cbf9b910216c1732e37badcb&) by [yourGMJack](https://yourgmjack.itch.io/) used with permission from the author.
* Ask the Oracle macros were contributed by Ben Straub.
* [Voidforged](https://kerys.itch.io/voidforged) by [Kerys](https://kerys.itch.io) is licensed for use under the [Creative Commons Attribution 4.0 International License (CC BY)](https://creativecommons.org/licenses/by/4.0/).
* [Ironsworn 1.5-ish E](https://discord.com/channels/437120373436186625/970326580909973525/1359736960393941085) by Iceyman is used with permission from the author.
* [Moments Forged - Starforged Adventure Starters](https://margot-hutton.itch.io/moments-forged-starforged-adventure-starters) by [Margot Hutton](https://margot-hutton.itch.io/) is licensed for use under the [Creative Commons Attribution 4.0 International License (CC BY)](https://creativecommons.org/licenses/by/4.0/).
* [Legacy Iron (Starforged Asset Pack)](https://www.drivethrurpg.com/en/product/534886/legacy-iron-starforged-asset-pack) by [Ludic Pen](https://www.drivethrurpg.com/en/publisher/14520/ludic-pen) used with permission from the author.

The following resources by [Shawn Tomkin](https://tomkinpress.com/) are licensed for use under the [Creative Commons Attribution 4.0 International License (CC-BY)](https://creativecommons.org/licenses/by/4.0/).

* [Ship Classes in Starforged](https://www.ironswornrpg.com/post/ship-classes-in-starforged)
* [Moves from *Learning From Your Failures in Starforged*](https://tomkinpress.com/blogs/news/learn-from-your-failures-in-starforged)
* [Spacefaring Interludes](https://tomkinpress.com/blogs/news/spacefaring-interludes)

The following resources by David Hudson (jendave) are used licensed under the [Creative Commons Attribution 4.0 International License (CC-BY)](https://creativecommons.org/licenses/by/4.0/)

* [Critical Successes](https://jendave.itch.io/critical-success-oracles)
* [I Owe My Soul to the Company Planet](https://jendave.itch.io/i-owe-my-soul-to-the-company-planet)
* [I'll Be Home for Life Day!](https://jendave.itch.io/ill-be-home-for-life-day)
* [The City on the Breeze](https://jendave.itch.io/the-city-on-the-breeze)
* [Creature Rank Generator](https://jendave.itch.io/creature-rank-generator)

The following resources by Julius Hennig (birb-nerb) are used with permission from the author.

* [Hearten Oracle](https://birb-nerb.itch.io/hearten-oracle)
* [Cultural Reference and Artifacts From Earth Oracle](https://birb-nerb.itch.io/cultural-references-and-artifacts-from-earth-oracle-for-ironsworn-starforged)
* [Forging Festivities](https://birb-nerb.itch.io/forging-festivities-oracle-starforged)

The following resources by wilsonam are used with permission from the author for non-commercial use.

* [NPC and Plots Oracles](https://wilsonam.itch.io/npcs-and-plots-for-starforged)
* [She Cannae Take It!](https://wilsonam.itch.io/she-cannae-take-it)
* [Settlement Detailing](https://wilsonam.itch.io/settlement-detailing-for-starforged)
* [Settlement Weather](https://wilsonam.itch.io/settlement-weather-oracles-for-starforged)

The following resources by lm77 are licensed under the [CC BY-NC 4.0 DEED](https://creativecommons.org/licenses/by-nc/4.0/deed.en_) for non-commercial use.

* [MegaCorp Hot Sauce](https://abalone-cushion-e6c.notion.site/MegaCorp-Hot-Sauce-214602dd86d04a5887f6c28ba879660c)
* [Creature Tags Hot Sauce](https://abalone-cushion-e6c.notion.site/Creature-Tags-Hot-Sauce-eae6966d71524611a17e68a4d425ba9b)
* [Sojourn Hot Sauce](https://abalone-cushion-e6c.notion.site/Soujourn-Hot-Sauce-Oracle-03997a33bea84fa68fa0c61a919fb875)

The following resources by nqjasmine are used with permission from the author.

* [Ironforged V1](https://nqjasmine.itch.io/ironforged-v1)
* [Crimes Oracle](https://nqjasmine.itch.io/crimes-oracle)

The following resources by mjatthijs are used with permission from the author.

* [Exotic Planets](https://mjatthijs.itch.io/exoticplanetoracles)
* [Sundered Isles Underwater Oracles](https://mjatthijs.itch.io/sundered-isles-underwater-oracles)

Module by David Hudson and licensed for use under the [MIT license](https://opensource.org/license/mit/).

All resources have been converted from their original format into a format comaptible with FoundryVTT.

Licenses and permissions for the macros are listed in the source code.

## Resources

Many great Ironsworn and Starforged Resources can be found at the links below.

* [Awesome Ironsworn](https://github.com/Billiam/awesome-ironsworn)
* [Starforged 2022 Jam](https://itch.io/jam/starforged-2022-jam)
* [Starforged 2023 Jam](https://itch.io/jam/starforged-2023-jam)
* [Starforged: Ancient Connections Jam](https://itch.io/jam/starforged-ancient-connections/entries)
* [Ironsworn Jam 1](https://itch.io/jam/ironsworn-jam-1/entries)
* [Coalitions of Ironsworn and Starforged Jam](https://itch.io/jam/coalitions-of-ironsworn-and-starforged)
* [Elsewhere](https://itch.io/jam/ironsworn-elsewhere/entries)

## Acknowledgements

Created for the incredible [Ironsworn and Ironsworn: Starforged](https://tomkinpress.com/) family of games.

Many thanks to Ben Straub for his fantastic [Ironsworn & Starforged Game System](https://foundryvtt.com/packages/foundry-ironsworn).

Many thanks to graygeist (Discord) for help with finding Oracles to add and getting permission from the authors.

### Modules

The following modules were used in the development process

* [Foundry VTT Content Parser](https://foundryvtt.com/packages/foundry-vtt-content-parser)
* [DF Manual Rolls](https://foundryvtt.com/packages/df-manual-rolls)
* [Game-icons.net](https://foundryvtt.com/packages/game-icons-net)

## FoundryVTT Modules and Other Resources

Please check out my other modules and resources for Ironsworn, Ironsworn: Starforged and other systems.

### [FoundryVTT](https://foundryvtt.com/community/david-hudson/packages) Modules

* [Starforged Custom Compendiums](https://foundryvtt.com/packages/starforged-custom-oracles)
* [Starsmith Compendiums for Ironsworn: Starforged](https://foundryvtt.com/packages/starsmith-expanded-oracles)
* [Ironsmith Expanded Oracles for Ironsworn](https://foundryvtt.com/packages/ironsmith-expanded-oracles)
* [Augmented Reality Cyberpunk City Kit](https://foundryvtt.com/packages/augmented-reality-foundry)
* [Token Note Hover](https://github.com/jendave/token-note-hover)
* [Token Action HUD Ironsworn](https://foundryvtt.com/packages/token-action-hud-ironsworn)
* [VOID 1680 AM for FoundryVTT](https://foundryvtt.com/packages/void-1680-am)
* [Ancient Wonders](https://foundryvtt.com/packages/ancient-wonders)
* [Rise & Shiningstar - An Adventure for Ironsworn: Starforged](https://foundryvtt.com/packages/rise-and-shining-star)
* [Roll Table Importer](https://foundryvtt.com/packages/roll-table-importer)

### [Itch.io](https://jendave.itch.io/) Resources

* [The City on the Breeze - Cyberpunk-inspired Oracle arrays](https://jendave.itch.io/the-city-on-the-breeze)
* [I'll Be Home for Life Day! - Star Wars Life Day Oracle](https://jendave.itch.io/ill-be-home-for-life-day)
* [Critical Success Oracles](https://jendave.itch.io/critical-success-oracles)
* [I Owe My Soul to the Company Planet Oracles](https://jendave.itch.io/i-owe-my-soul-to-the-company-planet)
* [Creature Rank Generator](https://jendave.itch.io/creature-rank-generator)
