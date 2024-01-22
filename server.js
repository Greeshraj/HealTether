const express = require("express");
const bodyParser = require("body-parser");
const { check, validationResult } = require("express-validator");

const app = express();
const port = 3001;
const cors = require("cors");


app.use(cors());
app.use(bodyParser.json());

app.post(
  "/api/register",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Invalid email address"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  

  (req, res) => {
    console.log("we are in backend with the req anf res",req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    
    res.json({ message: "Registration successful" });
  }
);
app.post(
  "/api/login",
  [
    check("email").isEmail().withMessage("Invalid email address"),
    check("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  

  (req, res) => {
    console.log("we are in backend with the",req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const email = req.body.email;

    res.json({ message: "Login successful",clientId:"tempid",clientLogoUrl:"tempurl",email:email,username:"username temp"});
  }
);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
