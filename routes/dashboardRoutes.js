const express = require("express");
const path = require("path");
const router = express.Router();

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect("/auth/login");
    }
}

router.get("/", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

router.get("/user", isAuthenticated, (req, res) => {
    res.json({ username: req.session.user.username });
});


module.exports = router;