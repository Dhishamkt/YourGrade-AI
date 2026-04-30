import pandas as pd

def process_marks(file, student_name=None):
    try:
        filename = file.filename

        if filename.endswith(".csv"):
            df = pd.read_csv(file)
        elif filename.endswith(".xlsx") or filename.endswith(".xls"):
            df = pd.read_excel(file)
        else:
            return {"error": "Only CSV or Excel files allowed!"}

        df.columns = df.columns.str.strip()

        if df.empty:
            return {"error": "File is empty!"}

        numeric_cols = df.select_dtypes(include="number").columns.tolist()
        
        name_col = None
        for col in df.columns:
            if col.lower() in ["name", "student", "student name", "studentname"]:
                name_col = col
                break

        student_list = []
        if name_col:
            student_list = df[name_col].tolist()

        if student_name and student_name != "overall" and name_col:
            student_row = df[df[name_col] == student_name]
            if student_row.empty:
                return {"error": "Student not found!"}
            
            row = student_row.iloc[0]
            summary = {}
            for col in numeric_cols:
                summary[col] = {
                    "marks": float(row[col]),
                }

            overall_avg = float(round(sum([summary[c]["marks"] for c in numeric_cols]) / len(numeric_cols), 2))
            best_subject = max(summary, key=lambda x: summary[x]["marks"])
            weak_subject = min(summary, key=lambda x: summary[x]["marks"])

            return {
                "type": "individual",
                "student_name": student_name,
                "subjects": summary,
                "overall_average": overall_avg,
                "best_subject": best_subject,
                "weak_subject": weak_subject,
                "student_list": student_list
            }

        summary = {}
        for col in numeric_cols:
            summary[col] = {
                "average": float(round(df[col].mean(), 2)),
                "highest": float(round(df[col].max(), 2)),
                "lowest": float(round(df[col].min(), 2)),
            }

        overall_avg = float(round(df[numeric_cols].mean().mean(), 2))
        best_subject = max(summary, key=lambda x: summary[x]["average"])
        weak_subject = min(summary, key=lambda x: summary[x]["average"])

        return {
            "type": "overall",
            "subjects": summary,
            "overall_average": overall_avg,
            "best_subject": best_subject,
            "weak_subject": weak_subject,
            "total_students": int(len(df)),
            "student_list": student_list
        }

    except Exception as e:
        return {"error": str(e)}