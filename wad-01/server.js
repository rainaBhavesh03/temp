const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const studRoute = require("./routes/student");

require("dotenv").config();

const PORT = 8000;

// mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(()=> console.error("MongoDB connection error:",error));



app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));

app.use("/",studRoute);

app.get("/", async(req,res)=>{
    res.render("index");
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
