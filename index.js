import express from "express";
import bodyParser from "body-parser"; // Import bodyParser
import mongoose from "mongoose"; // Import mongoose
import path from "path";

const __dirname = path.resolve();
const app = express();

const PORT = process.env.PORT || 5000;

// Middleware for parsing JSON and URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// MongoDB connection configuration
const mongoURI = "mongodb://127.0.0.1:27017/test";
const { User } = import("./models/User"); // Import the User model

mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", (req, res) => {
  // Client-supplied data
  const userData = req.body;

  // Create a new User instance and save it to the database
  const user = new User(userData);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/login", (req, res) => {
  // Check if the email exists in the database
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다. ",
      });
    }

    // Compare passwords
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다. ",
        });
      }

      // Handle successful login here
      // ...
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
