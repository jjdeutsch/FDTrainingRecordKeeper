const sqlite3 = require("sqlite3").verbose();
const { v4: uuidv4 } = require("uuid");

// Connect or create database file
const db = new sqlite3.Database("./fire_training.db", (err) => {
  if (err) console.error(err.message);
  else console.log("🔥 Connected to SQLite database");
});

// Auto-create tables
db.serialize(() => {
  
  b.run(`
  CREATE TABLE IF NOT EXISTS members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    rank TEXT,
    email TEXT,
    certification TEXT,
    certification_expiry TEXT
  )
`);

  db.run(`
    CREATE TABLE IF NOT EXISTS trainings (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT,
      hours INTEGER,
      date TEXT,
      instructor TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS attendance (
      id TEXT PRIMARY KEY,
      training_id TEXT,
      member_id TEXT,
      status TEXT
    )
  `);

});

module.exports = db;