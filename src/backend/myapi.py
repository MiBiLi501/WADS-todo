from fastapi import FastAPI, Path
from typing import Optional
from pydantic import BaseModel

app = FastAPI()

todos = {}

class Todos(BaseModel):
    title: str
    completed: bool
    id: str

class UpdateTodo(BaseModel):
    title: Optional[str] = None
    completed: Optional[bool] = None
    id: Optional[str] = None

@app.get("/")
def index():
    return {"message": "Welcome to a classroom example of FastAPI!"}


# Path parameter (decorator parameter + function parameter)

@app.get("/todos/{todo_id}")
def get_todos_by_path_id(
    todo_id: str = Path(..., description="The ID of the todo you want to view.", gt=0)
):
    if todo_id not in todos:
        return {"Error": f"todo ID {todo_id} doesn't exist."}
    return todos[todo_id]


# Query parameters (solely function parameters)
@app.get("/todos")
def get_todo_by_title(title: str):
    for todo_id in todos:
        if todos[todo_id].title == title:
            return todos[todo_id]
    return {"Error": f"Todo title '{title}' not found."}

# Combining path and query
@app.get("/get-by-title-and-id")
def get_todos(*, todo_id: str, title: Optional[str] = None):
    for todo_id in todos:
        if todos[todo_id].title == title:
            return todos[todo_id]
    return {"Error": f"todo title '{title}' not found."}

# Get todo by id
@app.get("/todos/get/{todo_id}")
def get_todo_by_id(todo_id: str):
    if todo_id not in todos:
        return {"Error": f"todo ID {todo_id} not found."}
    return todos[todo_id]


# Post todo (create new todo object in todos list)
@app.post("/todos/post/{todo_id}")
def create_todo(todo_id: str, todo: Todos):
    if todo_id in todos:
        return {"Error": "Duplicate ID."}
    todos[todo_id] = todo
    return todos[todo_id]


# Update todo
@app.put("/todos/put/{todo_id}")
def update_todo(todo_id: str, todo: Todos):
    if todo_id not in todos:
        return {"Error": f"todo ID {todo_id} does not exist."}

    if todo.name != None:
        todos[todo_id].name = todo.name
    if todo.age != None:
        todos[todo_id].age = todo.age
    if todo.year != None:
        todos[todo_id].year = todo.year

    return todos[todo_id]


# Delete todo
@app.delete("/todos/delete/{todo_id}")
def delete_todo(todo_id: str):
    if todo_id not in todos:
        return {"Error": f"todo ID {todo_id} does not exist."}
    del todos[todo_id]
    return {"Message": "todo deleted successfully."}