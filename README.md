# 📋 TaskFlow - Full-Stack Task Management Web Application

A modern full-stack task management web application built using **FastAPI**, **SQLAlchemy**, **SQLite**, **HTML**, **CSS**, and **JavaScript**.

TaskFlow helps users organize their daily tasks through a clean and responsive interface while demonstrating REST API development, database integration, and frontend-backend communication.

---

## ✨ Features

- ✅ Create new tasks
- ✅ Update task status
- ✅ Delete tasks
- ✅ Search tasks instantly
- ✅ Filter tasks (All / Pending / Completed)
- ✅ Task priority (High, Medium, Low)
- ✅ Due date support
- ✅ Dashboard statistics
- ✅ Overdue task detection
- ✅ Responsive user interface

---

## 🛠 Tech Stack

### Backend

- FastAPI
- SQLAlchemy
- SQLite
- Pydantic

### Frontend

- HTML5
- CSS3
- Vanilla JavaScript

### Tools

- Git
- GitHub
- VS Code

---

## 📂 Project Structure

```text
TaskFlow/
│
├── app/
│   ├── crud.py
│   ├── database.py
│   ├── main.py
│   ├── models.py
│   ├── routes.py
│   └── schemas.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── requirements.txt
├── README.md
└── .gitignore
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/shathaarzi/TaskFlow.git
```

### 2. Navigate to the project

```bash
cd TaskFlow
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

Windows

```bash
venv\Scripts\activate
```

macOS / Linux

```bash
source venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Start the FastAPI server

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```
http://127.0.0.1:8000
```

Swagger API documentation:

```
http://127.0.0.1:8000/docs
```

Finally, open:

```
frontend/index.html
```

in your browser.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Retrieve all tasks |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/{id}/complete` | Mark a task as completed |
| DELETE | `/tasks/{id}` | Delete a task |

Interactive API documentation is available through FastAPI Swagger UI:

```
http://127.0.0.1:8000/docs
```

---

## 🔮 Future Improvements

The following features are planned for future versions of TaskFlow:

- User Authentication
- Dark Mode
- Task Categories
- Drag-and-Drop Task Management
- Calendar View
- Email Reminders
- Cloud Database Integration
- Docker Support
- React Frontend
- Deployment to Render / Railway

---

## 👩‍💻 Author

**Shatha T**

- LinkedIn: https://www.linkedin.com/in/shatha-t-85ab3a324/
- GitHub: https://github.com/shathaarzi

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.