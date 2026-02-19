import { useState, useEffect } from "react";

const API = "http://localhost:5000";

function Attendance() {
  const [members, setMembers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [selectedTraining, setSelectedTraining] = useState("");

  // Load members, trainings, and attendance
  useEffect(() => {
    fetch(`${API}/members`).then(r => r.json()).then(setMembers);
    fetch(`${API}/trainings`).then(r => r.json()).then(setTrainings);
    fetch(`${API}/attendance`).then(r => r.json()).then(setAttendance);
  }, []);

  // Record attendance for a single member
  const checkInMember = async (memberId) => {
    if (!selectedTraining || !memberId) return;
    await fetch(`${API}/attendance`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ member_id: memberId, training_id: selectedTraining, status: "Present" })
    });
    alert("✅ Attendance recorded");
    // reload attendance
    fetch(`${API}/attendance`).then(r => r.json()).then(setAttendance);
  };

  return (
    <div>
      <h1>📝 Manual Attendance</h1>

      <div style={{ marginBottom: "20px" }}>
        <select value={selectedTraining} onChange={e => setSelectedTraining(e.target.value)}>
          <option value="">Select Training</option>
          {trainings.map(t => (
            <option key={t.id} value={t.id}>{t.title}</option>
          ))}
        </select>
      </div>

      <h2>Members List</h2>
      {members.map(m => (
        <div key={m.id} style={{ marginBottom: "5px" }}>
          {m.name} — {m.rank} 
          <button 
            onClick={() => checkInMember(m.id)} 
            style={{ marginLeft: "10px", padding: "2px 6px", backgroundColor: "green", color: "white" }}
          >
            Mark Present
          </button>
        </div>
      ))}

      <hr />

      <h2>Recent Attendance</h2>
      {attendance.map(a => {
        const member = members.find(m => m.id === a.member_id);
        const training = trainings.find(t => t.id === a.training_id);
        return (
          <div key={a.id}>
            {member?.name || "Unknown"} — {training?.title || "Unknown"} — {a.status}
          </div>
        );
      })}

    </div>
  );
}

export default Attendance;