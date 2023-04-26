const mongoose = require("mongoose");

main().catch((err) => console.log(err));

//Skapar struktur till databas
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  numberOfpages: Number,
});
//Collection namn
const Book = mongoose.model("Book", bookSchema);
async function createBooks() {
  const book1 = new Book({
    title: "Harry P",
    author: "Jkr",
    numberOfpages: 500,
  });
  //Sparar data i databasen
  await book1.save();
  //Datan som ska skickas
  const book2 = new Book({
    title: "HP",
    author: "Majid",
    numberOfpages: 50,
  });
  //Sparar data i databasen
  await book2.save();
  //Datan som ska skickas
  const book3 = new Book({
    title: "H",
    author: "Mar",
    numberOfpages: 40,
  });
  //Sparar data i databasen
  await book3.save();
}

async function main() {
  //Här väntar vi tills vi anluts till databas
  await mongoose.connect(
    `mongodb://127.0.0.1:27017/mongoose-requrie-grunder-worskhop-4`
  );
  //Hitta någon bock med specifik author och visa det hela boken och efter komma täcket skirver vi bara authot och title för att få bara dom grejerna
  const books1 = await Book.find({ author: "Jkr" }, "title author");
  console.log({ books1 });

  //Hitta någon bock med mer sidor än 400
  const books2 = await Book.find(
    { numberOfpages: { $gt: 400 } },
    "title author"
  );
  console.log({ books2 });

  console.log("DONE");
}
