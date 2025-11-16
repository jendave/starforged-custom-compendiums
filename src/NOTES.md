# Text Manipulation Tips

Some small tips to manipulate the text

## Foundry Tips

## Dice

```
Action Roll 2d10cs<(1d6 + mod)
Progress Roll 2d10cs<(mod)
```

## Utilities

```bash
pdftotext -table -nodiag Starsmith-Expanded-Oracles-Dec-17-22.pdf Starsmith-Expanded-Oracles-Dec-17-22-4.txt # export PDF text to text file
jq -r '.items[] | {name,_id}' starsmith-expanded-oracles-export.json
jq -r '.items[] | {name,_id} | join(", Compendium.starsmith-expanded-oracles.starsmithexpandedoracles.RollTable.")' starsmith-expanded-oracles-export.json
jq -r '.items[] | "displayName: \'"+(.name)+" tables: Compendium.starsmith-expanded-oracles.starsmithexpandedoracles.RollTable."+(._id)' starsmith-expanded-oracles-export.json
```

```javascript
starforgedOracles.children[0].children.push({
  displayName: 'Backstory Prompts (1 - 2)',
  tables: ['Compendium.starsmith-expanded-oracles.starsmithexpandedoracles.RollTable.bROdhxvU3ConRO7w'],
  children: []
})
```

## VIM Tips

```vi
:g/^\s*$/d # Remove blank space
:%s/\s\+$//e # Remove trailing blanks
ggVG :left # Remove leading blanks
:%s/^L//g # ^L using ctrl-V ctrl-L # Remove form feeds
Visual block mode for copying column text - ctrl-V and use arrow keys
:%s/13-14/13\r14\r/g # Find string '13-14' and put carriage returns between the numbers and after '-'
:.,.+99s/ \+/\r/g # Replace spaces with carriage return for current and following 99 lines
:/\<[A-Z]\+\> # Find ALL CAPS words
:/\v<[A-Z]+> # Find ALL CAPS words very magic
:s/\<\(\w\)\(\S*\)/\u\1\L\2/g # Title Case
:s#\v(\w)(\S*)#\u\1\L\2#g # title Case very magic
:%!jq . # Format file as multiline json
:%!jq -c . # Format file as single-line json
:g/^$/d # Remove blank lines
g~w # toggle case of current word
:s/\<./\u&/g # capitalize each word of a line
. repeat last command
```

## Rolltable Links

```html
<a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Core/Descriptor"><i class="fa fa-caret-right"></i> Descriptor</a> + <a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Core/Focus"><i class="fa fa-caret-right"></i> Focus</a>

<a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Location_Themes"><i class="fa fa-caret-right"></i> Location Themes</a>

<a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Characters/Role"><i class="fa fa-caret-right"></i> Character Role</a>

<a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Core/Action"><i class="fa fa-caret-right"></i> Action</a> + <a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Core/Theme"><i class="fa fa-caret-right"></i> Theme</a>

<a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Vaults"><i class="fa fa-caret-right"></i> Precursor Vault</a>
```

## Notes for Github workflows

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
     # Create zip file
      - run: zip -r ./module.zip packs module.json README.md CHANGELOG.md LICENSE LICENSE-Oracles
      
     # Substitute tag for changelog
      - name: Substitute tag
        id: substitute_tag
        uses: ashley-taylor/regex-property-action@1.3
        with:
          value: ${{github.event.release.tag_name}}
          regex: "[v.]"
          flags: "g"
          replacement: ""
          
      - name: Get current date
        id: date
        run: echo "::set-output name=date::$(date +'%Y-%m-%d')"

      # Update release with zip file
      - name: Update Release with Files
        id: create_version_release
        uses: ncipollo/release-action@v1
        with:
          allowUpdates: true
          artifacts: './module.zip, module.json'
          body: "Changelog: https://github.com/jendave/starsmith-expanded-oracles/blob/develop/CHANGELOG.md#${{steps.substitute_tag.outputs.value}}---${{steps.date.outputs.date}}"
          omitDraftDuringUpdate: true
          omitPrereleaseDuringUpdate: true



name: Release Creation

on:
  release:
    types: [published]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # Substitute the Manifest and Download URLs in the module.json
      - name: Substitute Manifest and Download Links For Versioned Ones
        id: sub_manifest_link_version
        uses: microsoft/variable-substitution@v1
        with:
          files: "module.json"
        env:
          version: ${{github.event.release.tag_name}}
          url: https://github.com/${{github.repository}}
          manifest: https://github.com/${{github.repository}}/releases/latest/download/module.json
          download: https://github.com/${{github.repository}}/releases/download/${{github.event.release.tag_name}}/module.zip

      # Create a zip file with all files required by the module to add to the release
      - run: zip -r ./module.zip module.json packs/ LICENSE OGL.txt

      # Create a release for this specific version
      - name: Update Release with Files
        id: create_version_release
        uses: ncipollo/release-action@v1
        with:
          allowUpdates: true Set this to false if you want to prevent updating existing releases
          name: ${{ github.event.release.name }}
          draft: false
          prerelease: false
          token: ${{ secrets.GITHUB_TOKEN }}
          artifacts: "./module.json, ./module.zip"
          tag: ${{ github.event.release.tag_name }}
          body: ${{ github.event.release.body }}
```

## Fonts

### From Starforged

* PosterGothicRoundATF
* ProximaNovaCond
* StarforgedSymbols

### From Starsmith

* Xolonium as the table title
* Nunito Sans for the table values

### Google Fonts

* Eric Bright Starsmith
  * Oxanium as the table title
  * Nunito Sans for the table values
* Shawn Tomkin
  * [Discord](https://discord.com/channels/437120373436186625/470610967823384577/1183073518573846538)
  * Teko as Header
    * Normal for oracle titles "INITIAL CONTACT"
    * Medium for Section titles "STARSHIPS"
  * Encode Sans as body 
    * Normal for Oracle entry
* Jendave
  * Teko Semi Bold for Main titles 30pt - Title
  * Teko Semi Bold for Section headings 24pt - Heading 1
  * Nunito Sans Normal 10pt for book text - text
  * Teko Medium 14pt for table title - Heading 2
  * Encode Sans Normal for table entry 10pt - Normal Text
  * Capitalize Title, headings

## Package submission

https://foundryvtt.com/creators/submit/

## Javascript Tips

Get UUIDs in Compendium
game.packs
const pack = game.packs.get("starforged-custom-oracles.starforgedcustomoracles");
const uuids = pack.index.map(i => [i.name, i.uuid]);

## Star Icons

Red Star
https://www.space.com/22842-arcturus.html (CC BY-SA 4.0)
(Image credit: PABLO CARLOS BUDASSI/WIKICOMMS/CC BY-SA 4.0)

https://commons.wikimedia.org/wiki/File:Artist%E2%80%99s_impression_of_the_red_supergiant_star_Antares.jpg (CC BY 4.0)
https://www.eso.org/public/images/eso1726b/ (CC BY 4.0)
Credit:
ESO/M. Kornmesser

Orange Star
https://commons.wikimedia.org/wiki/Category:Stars#/media/File:The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA's_Solar_Dynamics_Observatory_-_20100819.jpg (Public Domain)

Yellow Star
https://commons.wikimedia.org/wiki/Category:Sun#/media/File:Our_Sun_at_a_distance_of_150_Mio._km.jpg (CC BY-SA 4.0)
https://www.eso.org/public/images/ann15040e/ Credit: NASA/SDO/M. Kornmesser/L. Calçada/ESO (CC BY 4.0)

Blue Star
https://space-fact-file-gwiontomos.fandom.com/wiki/Pistol_Star?file=Blue_Sun.jpg (CC-BY-SA)
https://www.eso.org/public/images/eso2009a/
https://cdn.eso.org/images/screen/eso2009a.jpg Credit: ESO/L. Calçada, INAF-Padua/S. Zaggia (CC BY 4.0)

Young Star incubating in cloud
https://en.wikipedia.org/wiki/IC_2631#/media/File:Young_star_lights_up_reflection_nebula_IC_2631.jpg (CC BY 4.0)

White dwarf
https://commons.wikimedia.org/wiki/Category:Sirius_B#/media/File:Artist's_impression_of_the_sizes_of_Sirius_B_and_the_Earth.jpg (CC BY 4.0)

Corrupted star
https://www.deviantart.com/eaglshadow/art/The-Dying-Sun-168224372
https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/7c0eae9a-a8cd-4516-a4a5-cab4ce434bf8/d2s5mr8-317be7fe-712b-4254-8023-f643255f41ac.png/v1/fill/w_894,h_894,q_70,strp/the_dying_sun_by_eaglshadow_d2s5mr8-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTEwMCIsInBhdGgiOiJcL2ZcLzdjMGVhZTlhLWE4Y2QtNDUxNi1hNGE1LWNhYjRjZTQzNGJmOFwvZDJzNW1yOC0zMTdiZTdmZS03MTJiLTQyNTQtODAyMy1mNjQzMjU1ZjQxYWMucG5nIiwid2lkdGgiOiI8PTExMDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.riraUOSz51th2Tl90JmQZ1WSQWeHhBBiDQ0Pb_4JJZM
Mario Kotlar / Eaglshadow
Creative Commons Attribution-NonCommercial-ShareAlike 3.0 License

Neutron Star
https://science.psu.edu/news/possible-closest-neutron-star-earth-found (CC BY-NC 3.0)
https://commons.wikimedia.org/wiki/File:Artist%E2%80%99s_impression_of_the_magnetar_in_the_extraordinary_star_cluster_Westerlund_1.jpg (CC BY 4.0)
https://cdn.eso.org/images/screen/eso1034a.jpg Credit: ESO/L. Calçada (CC BY 4.0)

Binary
https://www.eso.org/public/images/eso1916a/ (CC BY 4.0)
https://cdn.eso.org/images/screen/eso1916a.jpg 
Credit: ALMA (ESO/NAOJ/NRAO), Alves et al.

Black Hole
https://commons.wikimedia.org/wiki/File:Black_hole%27s_accretion_disk_blank.jpg (CC BY-SA 4.0)
Credit: NASA’s Goddard Space Flight Center/Jeremy Schnittman, cmglee

Hypergiant
https://www.eso.org/public/images/eso1409b/ (CC BY 4.0)
https://cdn.eso.org/images/screen/eso1409b.jpg
Credit: ESO (CC BY 4.0)

https://esahubble.org/images/opo2109a/
https://cdn.esahubble.org/archives/images/large/opo2109a.jpg
Credit:
NASA, ESA, and R. Humphreys (University of Minnesota), and J. Olmsted (STScI) (CC BY 4.0)

Artificial Star

Unstable star with signs of supernova
https://www.eso.org/public/images/eso0927a/ (CC BY 4.0)
https://cdn.eso.org/images/screen/eso0927a.jpg
Credit: ESO/L. Calçada (CC BY 4.0)

Current icons
stellar object placeholder: systems/foundry-ironsworn/assets/icons/stellar-object.svg
planets: systems/foundry-ironsworn/assets/planets/Starforged-Planet-Token-Grave-01.webp

Size webp 576px ~50kb

### GIF Creation

`ffmpeg -i starforged.mov -s 600x400 -pix_fmt rgb24 -r 10 -f gif - | gifsicle --optimize=3 --delay=10 > build-starting-sector-macro.gif`
