import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../utils/auth";
import logo from "../assets/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please fill all fields!");
      return;
    }
    const success = loginUser(email, password);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{background: "#f0f4f8"}}>
      <div style={{
        width: "100%",
        maxWidth: "900px",
        border: "6px solid #1C4D8D",
        borderRadius: "24px",
        boxShadow: "0 12px 40px rgba(15,40,84,0.2)",
        overflow: "hidden",
        backgroundColor: "white"
      }}>
        <div className="flex flex-col md:flex-row">

          <div className="flex flex-col items-center justify-center p-8 md:p-12" style={{
            background: "linear-gradient(135deg, #0F2854 0%, #1C4D8D 60%, #4988C4 100%)",
            textAlign: "center"
          }}>
            <img src={logo} alt="YourGrade AI" style={{height: "80px", marginBottom: "16px"}} />
            <h2 style={{color: "white", fontSize: "22px", fontWeight: "bold", marginBottom: "8px"}}>YourGrade AI</h2>
            <p style={{color: "#BDE8F5", fontSize: "13px", lineHeight: "1.6"}}>AI-Powered Student Performance Analyser</p>
          </div>

          <div className="flex flex-col justify-center p-8 md:p-10" style={{flex: 1}}>
            <h1 style={{color: "#0F2854", fontSize: "26px", fontWeight: "bold", marginBottom: "8px"}}>Welcome Back!</h1>
            <p style={{color: "#888", fontSize: "14px", marginBottom: "28px"}}>Login to your account</p>

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
              <button
                onClick={handleLogin}
                style={{padding: "14px", borderRadius: "12px", background: "linear-gradient(135deg, #0F2854, #4988C4)", color: "white", fontWeight: "bold", fontSize: "16px", border: "none", cursor: "pointer"}}
              >
                Login
              </button>
            </div>

            <p style={{textAlign: "center", fontSize: "13px", color: "#888", marginTop: "24px"}}>
              Don't have an account?{" "}
              <Link to="/register" style={{color: "#1C4D8D", fontWeight: "bold"}}>
                Register here
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;