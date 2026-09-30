const BASE_URL = import.meta.env.VITE_API_URL || "https://yourgrade-ai.onrender.com";

const post = async (path, formData, timeoutMs = 90000) => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });
    let data;
    try {
      data = await response.json();
    } catch {
      return { error: `Server error (${response.status}). Backend may be down or misconfigured.` };
    }
    if (!response.ok && !data.error) data.error = `Server error (${response.status})`;
    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      return { error: "Server took too long to respond. It may be waking up - please try again." };
    }
    return { error: "Cannot reach the server. Please try again in a moment." };
  } finally {
    clearTimeout(timer);
  }
};

export const getStudents = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  return post("/students", formData);
};

export const analyzeMarks = async (file, studentName = "overall") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("student_name", studentName);
  return post("/analyze", formData);
};
