import { useState, useEffect } from "react";

const API = "http://localhost:5000";

function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [hours, setHours] = useState(1);
  const [instructor, setInstructor] = useState("");

  // Load trainings from backend
  const loadTrainings = () => {
    fetch(`${API}/trainings`)
      .then(res => res.json())
      .then(data => setTrainings(data));
  };

  useEffect(() => { loadTrainings(); }, []);

  // Add new training
  const addTraining = async () => {
    if(!title) return;
    const date = new Date().toISOString().split('T')[0]; // today
    await fetch(`${API}/trainings`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ title, category, hours: parseInt(hours), date, instructor })
    });
    setTitle(""); setCategory(""); setHours(1); setInstructor("");
    loadTrainings();
  };

  return (
    <div>
      <h1>📚 Trainings</h1>

      <div style={{ marginBottom: "20px" }}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />
        <input type="number" placeholder="Hours" value={hours} onChange={e=>setHours(e.target.value)} min={1} />
        <input placeholder="Instructor" value={instructor} onChange={e=>setInstructor(e.target.value)} />
        <button onClick={addTraining}>Add Training</button>
      </div>

      <hr />

      <h2>All Trainings</h2>
      {trainings.length === 0 && <p>No trainings added yet.</p>}
      {trainings.map(t => (
        <div key={t.id}>
          <strong>{t.title}</strong> — {t.category || "N/A"} — {t.hours} hr(s) — Instructor: {t.instructor || "N/A"} — Date: {t.date}
        </div>
      ))}

    </div>
  );
}

export default Trainings;