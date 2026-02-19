const express = require("express");
const router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM trainings");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { title, category, hours, date, instructor } = req.body;

  const newTraining = await pool.query(
    "INSERT INTO trainings (id, title, category, hours, date, instructor) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
    [uuidv4(), title, category, hours, date, instructor]
  );

  res.json(newTraining.rows[0]);
});

module.exports = router;