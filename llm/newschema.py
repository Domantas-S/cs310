from typing import Optional, List
from enum import Enum
from pydantic import BaseModel

class annotation(BaseModel):
    start: Optional[int]
    annotation: str
    text: str
    
class event(BaseModel):
    type: str
    annotations: List[annotation]

class Record(BaseModel):
    id: str
    context: str
    events: List[event]
