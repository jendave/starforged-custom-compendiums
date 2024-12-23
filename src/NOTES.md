# Text Manipulation Tips
Some small tips to manipulate the text

# Foundry Tips

## Dice
```
Action Roll 2d10cs<(1d6 + mod)
Progress Roll 2d10cs<(mod)
```

## Utilities
```
pdftotext -table -nodiag Starsmith-Expanded-Oracles-Dec-17-22.pdf Starsmith-Expanded-Oracles-Dec-17-22-4.txt # export PDF text to text file
jq -r '.items[] | {name,_id}' starsmith-expanded-oracles-export.json
jq -r '.items[] | {name,_id} | join(", Compendium.starsmith-expanded-oracles.starsmithexpandedoracles.RollTable.")' starsmith-expanded-oracles-export.json
jq -r '.items[] | "displayName: \'"+(.name)+" tables: Compendium.starsmith-expanded-oracles.starsmithexpandedoracles.RollTable."+(._id)' starsmith-expanded-oracles-export.json

	starforgedOracles.children[0].children.push({
		displayName: 'Backstory Prompts (1 - 2)',
		tables: ['Compendium.starsmith-expanded-oracles.starsmithexpandedoracles.RollTable.bROdhxvU3ConRO7w'],
		children: []
	})
```
## VIM Tips
```
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
```
<a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Core/Descriptor"><i class="fa fa-caret-right"></i> Descriptor</a> + <a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Core/Focus"><i class="fa fa-caret-right"></i> Focus</a>

<a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Location_Themes"><i class="fa fa-caret-right"></i> Location Themes</a>

<a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Characters/Role"><i class="fa fa-caret-right"></i> Character Role</a>

<a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Core/Action"><i class="fa fa-caret-right"></i> Action</a> + <a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Core/Theme"><i class="fa fa-caret-right"></i> Theme</a>

<a class="entity-link oracle-category-link" data-dfid="Starforged/Oracles/Vaults"><i class="fa fa-caret-right"></i> Precursor Vault</a>
```

## Notes for Github workflows
```
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