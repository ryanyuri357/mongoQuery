// Get all published frontend and backend courses, sort them by their price in a descending order,
// pick only their name and author, and display them

// require
const mongoose = require("mongoose");

// connect to db
mongoose.connect("mongodb://localhost/mongo-exercises");

// db schema
const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

// create a model
const Course = mongoose.model("Course", courseSchema);

// query and return courses
async function getCourses() {
  return await Course.find({ isPublished: true })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort({ price: -1 })
    .select("name author price");
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
