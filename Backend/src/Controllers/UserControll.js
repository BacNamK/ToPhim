import crypto from "crypto";
import pool from "../Config/DataBase.js";

const hashPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
};

const verifyPassword = (password, storedPassword) => {
  const [salt, storedHash] = String(storedPassword).split(":");
  if (!salt || !storedHash) return false;

  const computedHash = crypto
    .pbkdf2Sync(password, salt, 100000, 64, "sha512")
    .toString("hex");

  return crypto.timingSafeEqual(
    Buffer.from(storedHash, "hex"),
    Buffer.from(computedHash, "hex"),
  );
};

export const Register = async (req, res) => {
  const { username, email, password, isadmin } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "username, email, password are required" });
  }

  try {
    const existedUser = await pool.query(
      "SELECT id FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1",
      [email],
    );

    if (existedUser.rowCount) {
      return res.status(409).json({ error: "Email already exists" });
    }

    const hashedPassword = hashPassword(password);

    const isAdminValue = typeof isadmin === "boolean" ? isadmin : false;

    const result = await pool.query(
      `INSERT INTO users (username, email, password, isadmin)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, email, isadmin, created_at`,
      [username, email, hashedPassword, isAdminValue],
    );

    return res.status(201).json({
      message: "Register successful",
      user: result.rows[0],
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required" });
  }

  try {
    const result = await pool.query(
      `SELECT id, username, email, password, isadmin, created_at
       FROM users
       WHERE LOWER(email) = LOWER($1)
       LIMIT 1`,
      [email],
    );

    if (!result.rowCount) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    const isValidPassword = verifyPassword(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        isadmin: user.isadmin,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
};
