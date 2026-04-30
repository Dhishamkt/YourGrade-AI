from flask import Blueprint, request, jsonify
from utils.pandas_helper import process_marks
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

analyze_bp = Blueprint("analyze", __name__)

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

@analyze_bp.route("/analyze", methods=["POST"])
def analyze():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    student_name = request.form.get("student_name", "overall")

    summary = process_marks(file, student_name)

    if "error" in summary:
        return jsonify(summary), 400

    if summary["type"] == "individual":
        prompt = f"""
        You are an academic performance analyser.
        Student Name: {summary["student_name"]}
        Their marks: {summary["subjects"]}
        Overall Average: {summary["overall_average"]}%
        Best Subject: {summary["best_subject"]}
        Needs Improvement: {summary["weak_subject"]}

        Please provide:
        1. Personal performance analysis for this student
        2. Strongest subject feedback
        3. Improvement areas with tips
        4. Personalised study recommendations
        5. Motivational message

        Keep it friendly, clear and helpful.
        """
    else:
        prompt = f"""
        You are an academic performance analyser.
        Class performance summary: {summary["subjects"]}
        Overall Average: {summary["overall_average"]}%
        Best Subject: {summary["best_subject"]}
        Needs Improvement: {summary["weak_subject"]}
        Total Students: {summary["total_students"]}

        Please provide:
        1. Overall class performance analysis
        2. Strongest subjects
        3. Subjects needing improvement
        4. Study recommendations for the class
        5. Motivational message

        Keep it friendly, clear and helpful.
        """

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[{"role": "user", "content": prompt}]
    )

    return jsonify({
        "summary": summary,
        "analysis": response.choices[0].message.content
    })


@analyze_bp.route("/students", methods=["POST"])
def get_students():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]
    summary = process_marks(file)

    if "error" in summary:
        return jsonify(summary), 400

    return jsonify({"student_list": summary.get("student_list", [])})
