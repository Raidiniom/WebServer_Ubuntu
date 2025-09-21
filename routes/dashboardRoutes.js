const express = require("express");
const router = express.Router();

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        res.redirect("/login");
    }
}

router.get("/", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/dashboard.html"));
});

module.exports = router;