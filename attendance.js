const express = require("express");
const router = express.Router();
const pool = require("../db");
const { v4: uuidv4 } = require("uuid");

router.post("/", async (req, res) => {
  const { training_id, member_id, status } = req.body;

  const attendance = await pool.query(
    "INSERT INTO attendance (id, training_id, member_id, status) VALUES ($1,$2,$3,$4) RETURNING *",
    [uuidv4(), training_id, member_id, status]
  );

  res.json(attendance.rows[0]);
});

module.exports = router;