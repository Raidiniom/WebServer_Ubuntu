const pool = require("../db");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2)",
      [username, hashedPassword]
    );
    res.send("User registered successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user.");
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      return res.status(400).send("User not found.");
    }

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send("Invalid password.");
    }

    res.send("Login successful!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error logging in.");
  }
}

module.exports = { register, login };
