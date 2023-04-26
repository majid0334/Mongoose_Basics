const mongoose = require("mongoose");
const { Schema, model } = mongoose; // mongoose.Schema & mongoose.model
main().catch((err) => console.log(err));

//function för att skapa blogpost
async function createBlogPost() {
  //Skapar datan och skicar in det
  const blogPost = new Blog({
    title: "Blogpost 2",
    tags: ["tag1", "tag2"],
    comments: [
      { 
        user: "Majid",
        content: "Content1",
        votes: 3,
      },
    ],
  });

  //sparar och skicar in datan
  await blogPost.save();

  console.log({ blogPost });
}

//Upttadera en spesifik blog
async function uptadeBlogPost() {
  //För att hämta data med specielt id och diplay den
  const blogPost = await Blog.findById("6447ba18b15a68042fb871fc");

  //För att uptadera datan
  blogPost.comments.push({
    user: "Matin",
    content: "Content 2",
    votes: "12",
  });

  //För att spara det upptaderade datan
  blogPost.save();
}
//Ta bort funktion
async function deleteOne() {
  //För att kunna ta bort viss item med spesikick id
  await Blog.findOneAndDelete({ _id: "6447bd42b05c68996e82ce71" });
}

//Struktur på var databas
const blogSchema = new Schema({
  title: String,
  tags: [String],
  comments: [
    {
      user: String,
      content: String,
      votes: Number,
    },
  ],
});
//Nanmnet på var collection
const Blog = model("Blog", blogSchema);
async function main() {
  //anslutg till vår databas
  await mongoose.connect(
    `mongodb://127.0.0.1:27017/mongoose-blog-grunder-worskhop-4`
  );
  //Funktion för att skapa blog
  await createBlogPost();
  //För att ta bort item
  await deleteOne();

  console.log("Done");
}
