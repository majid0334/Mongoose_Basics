// getting-started.js
const mongoose = require("mongoose");
const { type } = require("os");

//Om vi får error vid anlsuning så loggas det ut i consolen
main().catch((err) => console.log(err));

const authorSchema = new mongoose.Schema({
  name: String,
  birthYear: Number,
  /* Referer till books */
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

const bookSchema = new mongoose.Schema({
  name: String,
  numberOfPages: Number,
  /* Rerer till Author */
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  ],
});

const Author = mongoose.model("Author", authorSchema);
const Books = mongoose.model("Books", bookSchema);
main().catch((err) => console.log(err));
//Detta är async function väntar på anslutning
async function main() {
  //Här väntar vi tills vi anluts till databas
  await mongoose.connect(`mongodb://127.0.0.1:27017/mongoose-grunder-4`);
  //För att hitta spesifika aythor
  const jkr = await Author.findOne({ name: "JKR" });
  //Skapar data och skickar in det i dabasen
  const ka2 = new Books({
    title: "Kor",
    numberOfPages: 20,
    author: jkr._id,
  });
  await ka2.save();

  //Knytter vi ihop author med boken och sprar det
  jkr.books.push(ka2._id);

  await jkr.save();

  console.log("Done");
}

async function addAuthors() {
  //för att spara datan i vår databas
  const jkrAuthor = new Author({
    name: "JKR",
    birthYear: 2008,
  });
  await jkrAuthor.save();

  //för att spara datan i vår databas
  const kakaAuthor = new Author({
    name: "KAKA",
    birthYear: 2018,
  });
  await kakaAuthor.save();
}
