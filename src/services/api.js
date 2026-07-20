const BASE_URL = "https://yourgrade-ai.onrender.com";

export const getStudents = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
};

export const analyzeMarks = async (file, studentName = "overall") => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("student_name", studentName);

  const response = await fetch(`${BASE_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  return data;
};