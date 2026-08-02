from sqlalchemy.orm import Session

from . import models, schemas


def create_task(db: Session, task: schemas.TaskCreate):
    db_task = models.Task(
        title=task.title,
        description=task.description,
        priority=task.priority,
        due_date=task.due_date
    )

    db.add(db_task)
    db.commit()
    db.refresh(db_task)

    return db_task


def get_tasks(
    db: Session,
    priority: str = None,
    completed: bool = None,
    search: str = None
):
    query = db.query(models.Task)

    if priority:
        query = query.filter(models.Task.priority == priority)

    if completed is not None:
        query = query.filter(models.Task.completed == completed)

    if search:
        query = query.filter(models.Task.title.contains(search))

    return query.order_by(models.Task.created_at.desc()).all()

def get_task(db: Session, task_id: int):
    return db.query(models.Task).filter(models.Task.id == task_id).first()


def update_task(db: Session, task_id: int, task: schemas.TaskUpdate):
    db_task = get_task(db, task_id)

    if db_task:
        db_task.title = task.title
        db_task.description = task.description
        db_task.priority = task.priority
        db_task.completed = task.completed
        db_task.due_date = task.due_date

        db.commit()
        db.refresh(db_task)

    return db_task


def delete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)

    if db_task:
        db.delete(db_task)
        db.commit()

    return db_task
def complete_task(db: Session, task_id: int):
    db_task = get_task(db, task_id)

    if db_task:
        db_task.completed = True
        db.commit()
        db.refresh(db_task)

    return db_task