const express = require("express");
const cors = require("cors");
const db = require("./db");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// TEST
app.get("/", (req,res)=>{
    res.send("🔥 Fire Training Backend Running with SQLite");
});

// --- Members API ---
app.get("/members", (req,res)=>{
    db.all("SELECT * FROM members", [], (err, rows)=>{
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});

app.post("/members", (req,res)=>{
    const { name, rank, email, certification, certification_expiry } = req.body;
    const id = uuidv4();
    db.run(
        `INSERT INTO members (id,name,rank,email,certification,certification_expiry) 
         VALUES (?,?,?,?,?,?)`,
        [id,name,rank,email,certification,certification_expiry],
        function(err){
            if(err) return res.status(500).json({error: err.message});
            res.json({id,name,rank,email,certification,certification_expiry});
        }
    );
});

// --- Trainings API ---
app.get("/trainings", (req,res)=>{
    db.all("SELECT * FROM trainings", [], (err, rows)=>{
        if(err) return res.status(500).json({error: err.message});
        res.json(rows);
    });
});

app.post("/trainings", (req,res)=>{
    const { title, category, hours, date, instructor } = req.body;
    const id = uuidv4();
    db.run(
        "INSERT INTO trainings (id,title,category,hours,date,instructor) VALUES (?,?,?,?,?,?)",
        [id,title,category,hours,date,instructor],
        function(err){
            if(err) return res.status(500).json({error: err.message});
            res.json({id,title,category,hours,date,instructor});
        }
    );
});

// --- Attendance API ---
app.post("/attendance", (req,res)=>{
    const { training_id, member_id, status } = req.body;
    const id = uuidv4();
    db.run(
        "INSERT INTO attendance (id,training_id,member_id,status) VALUES (?,?,?,?)",
        [id,training_id,member_id,status],
        function(err){
            if(err) return res.status(500).json({error: err.message});
            res.json({id,training_id,member_id,status});
        }
    );
});

app.listen(PORT, ()=>console.log(`🔥 Server running on port ${PORT}`));
