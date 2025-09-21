const express = require("express");
const path = require("path");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// Serve registration page
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/register.html"));
});

// Handle registration form submission
router.post("/register", register);

// Serve login page
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/login.html"));
});

// Handle login form submission
router.post("/login", login);

module.exports = router;
