const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

// MongoDB Connection
const uri =
  "mongodb+srv://parveshahamed00:fixit@cluster0.p4vne.mongodb.net/fixit?retryWrites=true&w=majority&appName=Cluster0";

async function connectDB() {
  try {
    mongoose.set("strictQuery", false);

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Successfully connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
}

connectDB();

app.use(fileUpload({ useTempFiles: true }));

// Routes
app.use("/", require("./routes/home"));
app.use("/user/login", require("./routes/User/login-post"));
app.use("/user/signup", require("./routes/User/signup-post"));
app.use("/user", require("./routes/User/dashboard"));
app.use("/", require("./routes/User/complaintForm-get"));
app.use("/", require("./routes/User/complaintForm-post"));
app.use("/", require("./routes/User/deleteComplaint"));
app.use("/officer/login", require("./routes/Officer/login-post"));
app.use("/admin/login", require("./routes/Admin/login-post"));
app.use("/", require("./routes/Admin/commite-change-post"));
app.use("/admin-return-dashboard", require("./routes/Admin/return-dashboard"));
app.use("/admin/user-list", require("./routes/Admin/userlist"));
app.use("/", require("./routes/Admin/user-dashboard-delete"));
app.use("/admin/appoint-officer", require("./routes/Admin/appoint-officer"));
app.use("/appoint-officer", require("./routes/Admin/appoint-officer-post"));
app.use(
  "/officer-update-complaint",
  require("./routes/Officer/update-complaint")
);

app.listen(port, () => console.log(`🚀 Server running on port ${port}!`));
