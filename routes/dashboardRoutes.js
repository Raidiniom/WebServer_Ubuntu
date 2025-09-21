const express = require("express");
const router = express.Router();

function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    } else {
        res.redirect("/login");
    }
}

router.get("/dashboard", isAuthenticated, (req, res) => {
    res.send("Welcome, "+ req.session.user.username);
});

module.exports = router;