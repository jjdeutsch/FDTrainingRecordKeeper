const express = require("express");
const router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM members");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { name, rank, email } = req.body;

  const newMember = await pool.query(
    "INSERT INTO members (id, name, rank, email) VALUES ($1,$2,$3,$4) RETURNING *",
    [uuidv4(), name, rank, email]
  );

  res.json(newMember.rows[0]);
});

module.exports = router;