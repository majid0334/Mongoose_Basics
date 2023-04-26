// getting-started.js
const mongoose = require("mongoose");

//Om vi får error vid anlsuning så loggas det ut i consolen
main().catch((err) => console.log(err));

//Detta är async function väntar på anslutning
async function main() {
  //Här väntar vi tills vi anluts till databas
  await mongoose.connect(
    `mongodb://127.0.0.1:27017/mongoose-grunder-worskhop-4`
  );
  //Skapar struktur på var databas
  /* required är till att vi måste ha ett namn   */
  const kittyShema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    birthYear: Number,
  });
  //Skapar collection med namnet Kitten i vår databas
  const Kitten = mongoose.model("Kitten", kittyShema);

  /*  //Kommer skicka data till dabasen med detta info
  const mrMewow = new Kitten({ name: "mrMewow", birthYear: 2010 });
  //för att spara datan i vår databas
  await mrMewow.save() */ /* // Kommer skicka data till dabasen med detta info
  const msMewo = new Kitten({ name: "msMewo", birthYear: 2013 });

  //för att spara datan i vår databas
  await msMewo.save(); */

  //För att hämta och display allt från var collection Kitten eller databas
  const kittens = await Kitten.find();
  console.log({ kittens });

  //för att spara datan i vår databas

  console.log("Done");
}
