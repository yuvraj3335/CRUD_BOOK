//const cookieParser = require('cookie-parser');
require("dotenv").config();
//const express = require('express');
//const { AdminRouter } = require('./routes/auth.js');


const cors = require("cors");

// express is used to start our server
const express = require("express");

const connectDB = require("./connectDB");

const Book = require("./models/Books");

const multer = require("multer");

// to create an express application
const app = express();

const PORT = process.env.PORT || 8000;

connectDB();
// Middleware
app.use(cors(
  // origin: ['http://localhost:5173'],
   //credentials: true
 ));
 //app.use(cookieParser());
//app.use('/auth', AdminRouter)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// creating a route
app.get("/api/books", async (req, res) => {
  try {
    const category = req.query.category;
    console.log(category);

    const filter = {};
    if (category) {
      filter.category = category;
    }

    const data = await Book.find(filter);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

app.get("/api/books/:slug", async (req, res) => {
  try {
    const slugParam = req.params.slug;

    const data = await Book.findOne({ slug: slugParam });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// route to add a New book
app.post("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    const newBook = new Book({
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
      thumbnail: req.file.filename,
    });

    await Book.create(newBook);
    res.json("Data Submitted");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

// route to update an existing book
app.put("/api/books", upload.single("thumbnail"), async (req, res) => {
  try {
    const bookId = req.body.bookId;

    const updateBook = {
      title: req.body.title,
      slug: req.body.slug,
      stars: req.body.stars,
      description: req.body.description,
      category: req.body.category,
    };

    if (req.file) {
      updateBook.thumbnail = req.file.filename;
    }

    await Book.findByIdAndUpdate(bookId, updateBook);
    res.json("Data Submitted");
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching books." });
  }
});

app.get("/", (req, res) => {
  res.json("Hello Mate!");
});

app.get("*", (req, res) => {
  res.sendStatus("404");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});

app.delete("/api/books/:id", async (req, res) => {
  const bookId = req.params.id;

  try {
    await Book.deleteOne({ _id: bookId });
    res.json("How dare you!" + req.body.bookId);
  } catch (error) {
    res.json(error);
  }
});
