import { useState, useEffect } from "react";

const API = "http://localhost:5000";

function Members() {
  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [certification, setCertification] = useState("");
  const [certExpiry, setCertExpiry] = useState("");

  // Load members from backend
  const loadMembers = () => {
    fetch(`${API}/members`)
      .then(res => res.json())
      .then(data => setMembers(data));
  };

  useEffect(() => { loadMembers(); }, []);

  // Add new member
  const addMember = async () => {
    if(!name) return;
    await fetch(`${API}/members`, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({
        name,
        rank,
        email: "test@test.com",
        certification,
        certification_expiry: certExpiry
      })
    });
    setName(""); setRank(""); setCertification(""); setCertExpiry("");
    loadMembers();
  };

  // Filter expired certifications
  const expiredMembers = members.filter(m => 
    m.certification_expiry && new Date(m.certification_expiry) < new Date()
  );

  return (
    <div>
      <h1>👨‍🚒 Members</h1>

      <div style={{ marginBottom: "20px" }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
        <input placeholder="Rank" value={rank} onChange={e => setRank(e.target.value)} />
        <input placeholder="Certification" value={certification} onChange={e => setCertification(e.target.value)} />
        <input type="date" value={certExpiry} onChange={e => setCertExpiry(e.target.value)} />
        <button onClick={addMember}>Add Member</button>
      </div>

      <hr />

      <h2>All Members</h2>
      {members.map(m => (
        <div key={m.id}>
          {m.name} — {m.rank} — {m.certification || "N/A"} — {m.certification_expiry || "N/A"}
        </div>
      ))}

      {expiredMembers.length > 0 && (
        <>
          <hr />
          <h2 style={{ color: "red" }}>⚠️ Expired Certifications</h2>
          {expiredMembers.map(m => (
            <div key={m.id}>
              {m.name} — {m.certification} EXPIRED on {m.certification_expiry}
            </div>
          ))}
        </>
      )}

    </div>
  );
}

export default Members;