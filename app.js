const express = require("express");
const app = express();

const Diary = require("./models/diary");
// Require database.js to get the PostgreSQL client instance
const sequelize = require("./database");

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Set view engine to EJS
app.set("view engine", "ejs");

app.set("views");

// const {Employee} = require('./employee');

app.locals.delimiters = "<% %>"; // This line allows the use of <%- include(filename) %> syntax in EJS
// Load CSS from the "public" directory
app.use(express.static("public"));
// Define routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/create", (req, res) => {
  res.render("create");
});

//create notes
app.post("/create", async (req, res) => {
  try {
    const diary = await Diary.create(req.body);
    console.log(diary);
    res.redirect("/read");
  } catch (error) {
    console.error("Error creating diary entry:", error);
    res.status(500).send("Server Error");
  }
});

app.get("/read", async (req, res) => {
  try {
    const diaryEntries = await Diary.findAll();
    res.render("read", { diaryEntries });
  } catch (error) {
    console.error("Error fetching diary entries:", error);
    res.status(500).send("Server Error");
  }
});
// Update Route - Display Update Form and Handle Form Submission
app.get("/update/:id", async (req, res) => {
  const diaryId = req.params.id;
  try {
    const entryResult = await Diary.findByPk(diaryId);
    const entry = entryResult;

    const selectedDate = entry.date; // Convert to YYYY-MM-DD format
    const selectedDay = entry.day;

    res.render("update", { entry, selectedDate, selectedDay }); // Pass selectedDate and selectedDay
  } catch (error) {
    console.error("Error fetching diary entry:", error);
    res.status(500).send("Server Error");
  }
});

// Update Route - Handle Update Action
app.post("/update/:id", async (req, res) => {
  const diaryId = req.params.id;
  try {
    const { date, day, title, content } = req.body;

    await Diary.update({
      date,
      day,
      title,
      content,
    },{
      where: {id:diaryId}
    });

    res.redirect("/read"); // Redirect to the diary page after updating
  } catch (error) {
    console.error("Error updating diary entry:", error);
    res.status(500).send("Server Error");
  }
});

// Delete Confirmation Page
app.get("/delete/:id", async (req, res) => {
  const diaryId = req.params.id;
  const entry= await Diary.findByPk(diaryId);
  res.render('delete', {entry});
});

// Delete Route - Handle Delete Action
app.post("/delete/:id", async (req, res) => {
  const diaryID = req.params.id;
  try {
    await Diary.destroy({
      where: {id: diaryID}
    });

    // Show an alert for successful deletion
    res.send('<script>alert("Diary entry deleted successfully!"); window.location.href = "/read";</script>');
  } catch (error) {
    console.error("Error deleting diary entry:", error);
    res.status(500).send("Server Error");
  }
});


const PORT = process.env.PORT || 3000;

// Sync Sequelize models and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
