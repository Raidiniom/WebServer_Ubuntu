const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboardRoutes");
const session = require("express-session");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "themissileknowswhereitistowhereitisnt",
    resave: false,
    saveUninitialized: false,
  })
)

// Routes
app.use("/", authRoutes);
app.use("/", dashboardRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
