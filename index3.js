// Get all the published courses that are $15 or more, or have the word 'by' in their title.

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
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort({ price: -1 })
    .select("name author price");
}

async function run() {
  const courses = await getCourses();
  console.log(courses);
}

run();
