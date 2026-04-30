import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { saveUser } from "../utils/auth";
import logo from "../assets/logo.png";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!email || !password || !confirm) {
      setError("Please fill all fields!");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match!");
      return;
    }
    saveUser(email, password);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{background: "#f0f4f8", padding: "24px"}}>
      
      <div style={{
        width: "100%",
        maxWidth: "900px",
        border: "6px solid #f5f5f5",
        borderRadius: "24px",
        boxShadow: "0 12px 40px rgba(15,40,84,0.2)",
        overflow: "hidden",
        display: "flex",
        minHeight: "500px",
        backgroundColor: "white"
      }}>

        <div className="flex flex-col items-center justify-center" style={{
          flex: 1,
          background: "linear-gradient(135deg, #0F2854 0%, #1C4D8D 60%, #4988C4 100%)",
          padding: "48px 32px",
          textAlign: "center"
        }}>
          <img src={logo} alt="YourGrade AI" style={{height: "100px", marginBottom: "24px"}} />
          <h2 style={{color: "white", fontSize: "24px", fontWeight: "bold", marginBottom: "12px"}}>YourGrade AI</h2>
          <p style={{color: "#BDE8F5", fontSize: "14px", lineHeight: "1.6"}}>AI-Powered Student Performance Analyser</p>
        </div>

        <div className="flex flex-col justify-center" style={{flex: 1, padding: "48px 40px"}}>
          
          <h1 style={{color: "#0F2854", fontSize: "28px", fontWeight: "bold", marginBottom: "8px"}}>Create Account</h1>
          <p style={{color: "#888", fontSize: "14px", marginBottom: "32px"}}>Register to get started</p>

          {error && (
            <div style={{marginBottom: "16px", padding: "12px", borderRadius: "8px", color: "#dc2626", backgroundColor: "#fef2f2", fontSize: "13px", textAlign: "center"}}>
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{padding: "14px 16px", borderRadius: "12px", border: "2px solid #BDE8F5", fontSize: "14px", outline: "none", color: "#333"}}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{padding: "14px 16px", borderRadius: "12px", border: "2px solid #BDE8F5", fontSize: "14px", outline: "none", color: "#333"}}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              style={{padding: "14px 16px", borderRadius: "12px", border: "2px solid #BDE8F5", fontSize: "14px", outline: "none", color: "#333"}}
            />
            <button
              onClick={handleRegister}
              style={{padding: "14px", borderRadius: "12px", background: "linear-gradient(135deg, #0F2854, #4988C4)", color: "white", fontWeight: "bold", fontSize: "16px", border: "none", cursor: "pointer"}}
            >
              Register
            </button>
          </div>

          <p style={{textAlign: "center", fontSize: "13px", color: "#888", marginTop: "24px"}}>
            Already have an account?{" "}
            <Link to="/login" style={{color: "#1C4D8D", fontWeight: "bold"}}>
              Login here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;