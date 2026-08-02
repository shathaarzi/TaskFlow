from datetime import datetime
from typing import Optional
from enum import Enum

from pydantic import BaseModel

class PriorityEnum(str, Enum):
    low = "Low"
    medium = "Medium"
    high = "High"

class TaskBase(BaseModel):
    title: str
    description: Optional[str] = None
    priority: PriorityEnum = PriorityEnum.medium
    due_date: Optional[datetime] = None


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    completed: bool


class TaskResponse(TaskBase):
    id: int
    completed: bool
    created_at: datetime

    class Config:
        from_attributes = True