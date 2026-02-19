import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Members from "./pages/Members";
import Trainings from "./pages/Trainings";

function App() {

  return (
    <Router>

      <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>

        {/* Sidebar */}
        <div style={{
          width: 250,
          background: "#111",
          color: "white",
          padding: 20
        }}>
          <h2>🚒 Command</h2>

          <nav>
            <p><Link to="/" style={{color:"white"}}>Dashboard</Link></p>
            <p><Link to="/members" style={{color:"white"}}>Members</Link></p>
            <p><Link to="/trainings" style={{color:"white"}}>Trainings</Link></p>
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: 20 }}>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/members" element={<Members />} />
            <Route path="/trainings" element={<Trainings />} />
          </Routes>

        </div>

      </div>

    </Router>
  );
}

export default App;