import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../utils/auth";
import { analyzeMarks, getStudents } from "../services/api";
import logo from "../assets/logo.png";

function Dashboard() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("overall");

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);
    setError("");
    setSelectedStudent("overall");

    if (selectedFile) {
      const data = await getStudents(selectedFile);
      if (data.student_list) {
        setStudentList(data.student_list);
      }
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }
    setLoading(true);
    setError("");
    const data = await analyzeMarks(file, selectedStudent);
    setLoading(false);
    if (data.error) {
      setError(data.error);
    } else {
      setResult(data);
    }
  };

  return (
    <div className="min-h-screen" style={{background: "#f0f4f8"}}>

      <nav style={{
        background: "linear-gradient(135deg, #0F2854 0%, #1C4D8D 60%, #4988C4 100%)",
        padding: "16px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 12px rgba(15,40,84,0.3)"
      }}>
        <img src={logo} alt="YourGrade AI" style={{height: "48px"}} />
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 24px",
            backgroundColor: "white",
            color: "#0F2854",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "14px"
          }}
        >
          Logout
        </button>
      </nav>

      <div style={{padding: "40px"}}>

        <div style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "40px",
          border: "4px solid #1C4D8D",
          boxShadow: "0 8px 32px rgba(15,40,84,0.15)",
          textAlign: "center",
          marginBottom: "32px"
        }}>
          <h1 style={{color: "#0F2854", fontSize: "28px", fontWeight: "bold", marginBottom: "8px"}}>
            Welcome to YourGrade AI! 👋
          </h1>
          <p style={{color: "#666", fontSize: "15px", marginBottom: "32px"}}>
            Upload your marks sheet (CSV or Excel) and get AI-powered analysis!
          </p>

          <div style={{
            border: "2px dashed #4988C4",
            borderRadius: "16px",
            padding: "32px",
            marginBottom: "24px",
            backgroundColor: "#f8fbff"
          }}>
            <div style={{fontSize: "48px", marginBottom: "12px"}}>📂</div>
            <p style={{color: "#666", marginBottom: "16px", fontSize: "14px"}}>
              Upload CSV or Excel file
            </p>
            <input
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFileChange}
              style={{display: "none"}}
              id="fileInput"
            />
            <label htmlFor="fileInput" style={{
              padding: "12px 28px",
              background: "linear-gradient(135deg, #0F2854, #4988C4)",
              color: "white",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "14px"
            }}>
              Choose File
            </label>
            {file && (
              <p style={{color: "#1C4D8D", marginTop: "12px", fontSize: "13px", fontWeight: "bold"}}>
                ✅ {file.name} selected
              </p>
            )}
          </div>

          {studentList.length > 0 && (
            <div style={{marginBottom: "24px"}}>
              <label style={{color: "#0F2854", fontWeight: "bold", fontSize: "14px", marginBottom: "8px", display: "block"}}>
                Select Analysis Type:
              </label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                style={{
                  padding: "12px 20px",
                  borderRadius: "10px",
                  border: "2px solid #BDE8F5",
                  fontSize: "14px",
                  color: "#0F2854",
                  fontWeight: "bold",
                  outline: "none",
                  width: "100%",
                  maxWidth: "400px",
                  cursor: "pointer"
                }}
              >
                <option value="overall">📊 Overall Class Analysis</option>
                {studentList.map((student, index) => (
                  <option key={index} value={student}>
                    👤 {student}
                  </option>
                ))}
              </select>
            </div>
          )}

          {error && (
            <div style={{marginBottom: "16px", padding: "12px", borderRadius: "8px", color: "#dc2626", backgroundColor: "#fef2f2", fontSize: "13px"}}>
              {error}
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            style={{
              padding: "14px 40px",
              background: loading ? "#ccc" : "linear-gradient(135deg, #0F2854, #4988C4)",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Analysing... ⏳" : "Analyse My Marks 🚀"}
          </button>
        </div>

        {result && (
          <div style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "40px",
            border: "4px solid #1C4D8D",
            boxShadow: "0 8px 32px rgba(15,40,84,0.15)"
          }}>
            <h2 style={{color: "#0F2854", fontSize: "24px", fontWeight: "bold", marginBottom: "8px"}}>
              📊 {result.summary.type === "individual" ? `${result.summary.student_name}'s Analysis` : "Class Analysis"}
            </h2>
            <p style={{color: "#666", fontSize: "13px", marginBottom: "24px"}}>
              {result.summary.type === "individual" ? "Individual Performance Report" : `Total Students: ${result.summary.total_students}`}
            </p>

            <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "32px"}}>
              <div style={{backgroundColor: "#f0f7ff", borderRadius: "12px", padding: "20px", textAlign: "center", border: "2px solid #BDE8F5"}}>
                <p style={{color: "#666", fontSize: "13px", marginBottom: "8px"}}>Overall Average</p>
                <p style={{color: "#0F2854", fontSize: "28px", fontWeight: "bold"}}>{result.summary.overall_average}%</p>
              </div>
              <div style={{backgroundColor: "#f0fff4", borderRadius: "12px", padding: "20px", textAlign: "center", border: "2px solid #86efac"}}>
                <p style={{color: "#666", fontSize: "13px", marginBottom: "8px"}}>Best Subject</p>
                <p style={{color: "#16a34a", fontSize: "20px", fontWeight: "bold"}}>{result.summary.best_subject}</p>
              </div>
              <div style={{backgroundColor: "#fff7f0", borderRadius: "12px", padding: "20px", textAlign: "center", border: "2px solid #fdba74"}}>
                <p style={{color: "#666", fontSize: "13px", marginBottom: "8px"}}>Needs Improvement</p>
                <p style={{color: "#ea580c", fontSize: "20px", fontWeight: "bold"}}>{result.summary.weak_subject}</p>
              </div>
            </div>

            <div style={{backgroundColor: "#f8fbff", borderRadius: "12px", padding: "28px", border: "2px solid #BDE8F5"}}>
              <h3 style={{color: "#0F2854", fontWeight: "bold", marginBottom: "16px"}}>🤖 AI Feedback</h3>
              <p style={{color: "#444", lineHeight: "1.8", whiteSpace: "pre-line", fontSize: "14px"}}>
                {result.analysis}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Dashboard;