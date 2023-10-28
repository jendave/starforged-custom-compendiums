// Macro by wilsonam used with permission by the author
// Modifications by David Hudson

function fPrintMessage(message){let chatData = {content : message,};
	ChatMessage.create(chatData,{})};

// ===== Random number function =====

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// ===== This is the main async function that does all the work =====

async function CoreFunction(Location,Enclosed,Region){

// Lookup the Tech Level

let TLtable = Location + " - Tech Level"
table = game.tables.getName(TLtable);
Roll = await table.roll();
TLDetail = Roll.results[0].data.text;
TL = TLDetail.substring(0,5);

message =  "<h3>Settlement Details </h3>" + Location + " (" + Enclosed + "), " + Region + "<br><br>" + TLDetail;

// Lookup the Settlement Type

let Typetable = TL + " Type";
table = game.tables.getName(Typetable);
Roll = await table.roll();
SettType = Roll.results[0].data.text;

message = message + "<br><br>Type: " + SettType;

// Settlement Look Descriptors x2

let Desctable = PS + " - " + SettType;
table = game.tables.getName(Desctable);
Roll = await table.roll();
SettDesc = Roll.results[0].data.text;
Roll = await table.roll();
SettDesc = SettDesc + " and " + Roll.results[0].data.text;

message = message + " with " + SettDesc;

// Lookup the overall population

let Poptable = "Settlement Population - " + Region;
table = game.tables.getName(Poptable);
Roll = await table.roll();
SettPop = Roll.results[0].data.text;
SettPopBase = SettPop.substring(0,3);

// Calc numeric base population

if (SettPopBase == "Few") {
SettPopBase = 2
SettPopSize = "S" }
else if (SettPopBase == "Doz") {
SettPopBase = 8
SettPopSize = "S" }
else if (SettPopBase == "Hun") {
SettPopBase = 80
SettPopSize = "ML" }
else if (SettPopBase == "Tho") {
SettPopBase = 800 
SettPopSize = "ML" }
else {
SettPopBase = 8000 
SettPopSize = "ML" };

// Calc Detailed Pop Number

SettPopDet = random(1,6);
SettPopDet = SettPopDet + random(1,6);
SettPopDet = SettPopDet * SettPopBase;

message = message + "<br><br>Population of about " + SettPopDet + " (" + SettPop + ")";

// Now do Settlement Senses x2

let Sensetable = "Senses - " + PS + "-" + Enclosed + "-" + SettPopSize;
table = game.tables.getName(Sensetable);
Roll = await table.roll();
SettSenses = Roll.results[0].data.text;
Roll = await table.roll();
SettSenses = SettSenses + "/" + Roll.results[0].data.text;

message = message + "<br><br>Sounds and smells: " + SettSenses;

// Now do Settlement Industries x2

let Indtable = "Industries - " + PS + "-" + Enclosed + "-" + SettPopSize;
table = game.tables.getName(Indtable);
Roll = await table.roll();
SettInd = Roll.results[0].data.text;
if (SettInd == "Manufacturing") {Manu = Manu +1};
Roll = await table.roll();
if (Roll.results[0].data.text == "Manufacturing") {Manu = Manu +1};
SettInd = SettInd + "/" + Roll.results[0].data.text;

message = message + "<br><br>Industries: " + SettInd;

// And now possible Settlement Manufacturing

if (Manu > 0)
{let Manutable = "Manufacturing - " + SettType;
table = game.tables.getName(Manutable);
Roll = await table.roll();
SettManu = Roll.results[0].data.text;

message = message + "<br><br>Manufacturing: " + SettManu;}

if (Manu > 1)
{Roll = await table.roll();
SettManu = Roll.results[0].data.text;

message = message + "/" + SettManu;}

// Finally print the message

fPrintMessage(message);

return;}

// ===== END of the main function =====

const myDialogOptions = {
  width: 1100,
  height: 120,
  scale: 1
};

let message = ""
let Location = ""
let Enclosed = ""
let Region = ""
let PS = ""
let table = ""
let Roll = ""
let TLDetail = ""
let TL = ""
let SettType = ""
let SettDesc = ""
let SettPop = ""
let SettPopBase = 0
let SettPopSize = ""
let SettPopDet = 0
let SettSenses = ""
let SettInd = ""
let Manu = 0
let SettManu = ""

// Start with dialog for location

new Dialog({
 title: "Input Location",
 content: "<p>Indicate whether the Settlement is <b>P</b>lanetside (<b>O</b>pen Air or <b>E</b>nclosed), <b>O</b>rbital or in <b>D</b>eep Space; also indicate whether it is in <b>TERM</b>inus, the <b>OUT</b>lands or <b>EXP</b>anse</p>",
 buttons: 
 {
  PlanetsideOpenT: {
   label: "P/O/Term",
   callback: () => {
      Location = "Planetside";
      Enclosed = "Open Air";
      Region = "Terminus";
      PS = "Planet";
      }
  },
  PlanetsideEncT: {
   label: "P/E/Term",
   callback: () => {
      Location = "Planetside";
      Enclosed = "Enclosed";
      Region = "Terminus";
      PS = "Planet";
      }
  },  
  OrbitalEncT: {
   label: "Orb/Term",
   callback: () => {
      Location = "Orbital";
      Enclosed = "Enclosed";
      Region = "Terminus";
      PS = "Space";
      }
  },
  DeepSpaceEncT: {
   label: "DS/Term",
   callback: () => {
      Location = "Deep Space";
      Enclosed = "Enclosed";
      Region = "Terminus";
      PS = "Space";
      }
  }, 
  PlanetsideOpenO: {
   label: "P/O/Out",
   callback: () => {
      Location = "Planetside";
      Enclosed = "Open Air";
      Region = "Outlands";
      PS = "Planet";
      }
  },
  PlanetsideEncO: {
   label: "P/E/Out",
   callback: () => {
      Location = "Planetside";
      Enclosed = "Enclosed";
      Region = "Outlands";
      PS = "Planet";
      }
  },  
  OrbitalEncO: {
   label: "Orb/Out",
   callback: () => {
      Location = "Orbital";
      Enclosed = "Enclosed";
      Region = "Outlands";
      PS = "Space";
      }
  },
  DeepSpaceEncO: {
   label: "DS/Out",
   callback: () => {
      Location = "Deep Space";
      Enclosed = "Enclosed";
      Region = "Outlands";
      PS = "Space";
      }
  },
  PlanetsideOpenE: {
   label: "P/O/Exp",
   callback: () => {
      Location = "Planetside";
      Enclosed = "Open Air";
      Region = "Expanse";
      PS = "Planet";
      }
  },
  PlanetsideEncE: {
   label: "P/E/Exp",
   callback: () => {
      Location = "Planetside";
      Enclosed = "Enclosed";
      Region = "Expanse";
      PS = "Planet";
      }
  },  
  OrbitalEncE: {
   label: "Orb/Exp",
   callback: () => {
      Location = "Orbital";
      Enclosed = "Enclosed";
      Region = "Expanse";
      PS = "Space";
      }
  },
  DeepSpaceEncE: {
   label: "DS/Exp",
   callback: () => {
      Location = "Deep Space";
      Enclosed = "Enclosed";
      Region = "Expanse";
      PS = "Space";
      }
  },
 },
 default: "Planetside",
 close: html => {

// First layer within the dialog - Tech Level

CoreFunction(Location,Enclosed,Region);


//End of the "Close"

},

// Bottom end of the dialog box

},myDialogOptions).render(true)
