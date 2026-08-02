from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine
from .routes import router

app = FastAPI(
    title="Task Management REST API",
    description="""
A RESTful backend application for managing personal tasks.

## Features

- Create, update, delete and retrieve tasks
- Mark tasks as completed
- Filter tasks by priority and completion status
- Search tasks by title
- Interactive API documentation using Swagger UI
""",
    version="1.0.0",
    contact={
        "name": "Shatha T",
        "email": "shathaarzi@gmail.com"
    },
    license_info={
        "name": "MIT License"
    }
)

# ==========================
# Enable CORS
# ==========================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================
# Create Database Tables
# ==========================

Base.metadata.create_all(bind=engine)

# ==========================
# Include API Routes
# ==========================

app.include_router(router)


@app.get("/", tags=["System"])
def home():
    return {
        "application": "Task Management REST API",
        "version": "1.0.0",
        "status": "Running",
        "documentation": "/docs",
        "developer": "Shatha T"
    }