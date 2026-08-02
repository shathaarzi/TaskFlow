from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from . import crud, schemas
from .database import SessionLocal

router = APIRouter(tags=["Tasks"])


# Database Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/tasks", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    return crud.create_task(db, task)


@router.get("/tasks", response_model=list[schemas.TaskResponse])
def get_tasks(
    priority: str = None,
    completed: bool = None,
    search: str = None,
    db: Session = Depends(get_db)
):
    return crud.get_tasks(db, priority, completed, search)

@router.get("/tasks/{task_id}", response_model=schemas.TaskResponse)
def get_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.get_task(db, task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return task


@router.put("/tasks/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task: schemas.TaskUpdate, db: Session = Depends(get_db)):
    updated_task = crud.update_task(db, task_id, task)

    if updated_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return updated_task


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    deleted_task = crud.delete_task(db, task_id)

    if deleted_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return {"message": "Task deleted successfully"}
@router.patch("/tasks/{task_id}/complete", response_model=schemas.TaskResponse)
def complete_task(task_id: int, db: Session = Depends(get_db)):
    task = crud.complete_task(db, task_id)

    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    return task