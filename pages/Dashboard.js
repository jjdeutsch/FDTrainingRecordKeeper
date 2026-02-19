import { useState, useEffect } from "react";

const API = "http://localhost:5000";

function Dashboard() {
  const [members, setMembers] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    fetch(`${API}/members`).then(r => r.json()).then(setMembers);
    fetch(`${API}/trainings`).then(r => r.json()).then(setTrainings);
    fetch(`${API}/attendance`).then(r => r.json()).then(setAttendance);
  }, []);

  // Calculate total hours per member
  const totalHoursPerMember = members.map(m => {
    const memberAttendance = attendance.filter(a => a.member_id === m.id && a.status === "Present");
    const hours = memberAttendance.reduce((sum, a) => {
      const training = trainings.find(t => t.id === a.training_id);
      return sum + (training?.hours || 0);
    }, 0);
    return { name: m.name, hours };
  });

  // Expired certifications
  const expiredCerts = members.filter(m => 
    m.certification_expiry && new Date(m.certification_expiry) < new Date()
  );

  // Upcoming trainings (next 7 days)
  const upcomingTrainings = trainings.filter(t => {
    const trainingDate = new Date(t.date);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return trainingDate >= today && trainingDate <= nextWeek;
  });

  return (
    <div>
      <h1>🔥 Fire Department Dashboard</h1>

      <hr />

      <h2>📊 Training Hours per Member</h2>
      {totalHoursPerMember.map(m => (
        <div key={m.name}>{m.name}: {m.hours} hr(s)</div>
      ))}

      <hr />

      <h2>⚠️ Expired Certifications</h2>
      {expiredCerts.length === 0 && <p>None</p>}
      {expiredCerts.map(m => (
        <div key={m.id} style={{ color: "red" }}>
          {m.name} — {m.certification} expired on {m.certification_expiry}
        </div>
      ))}

      <hr />

      <h2>📅 Upcoming Trainings (Next 7 days)</h2>
      {upcomingTrainings.length === 0 && <p>No upcoming trainings</p>}
      {upcomingTrainings.map(t => (
        <div key={t.id}>
          {t.title} — {t.category || "N/A"} — {t.hours} hr(s) — {t.date}
        </div>
      ))}

      <hr />

      <h2>✅ Attendance Summary</h2>
      {members.map(m => {
        const attended = attendance.filter(a => a.member_id === m.id && a.status === "Present").length;
        const totalTrainings = trainings.length;
        const percent = totalTrainings === 0 ? 0 : Math.round((attended / totalTrainings) * 100);
        return <div key={m.id}>{m.name}: {attended}/{totalTrainings} trainings ({percent}%)</div>;
      })}

    </div>
  );
}

export default Dashboard;