// Get all the published backend courses, sort them by their name,
// pick only thei name and author, and display them

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
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
