import { v4 as uuidv4 } from "uuid";

export default function ToDoReducer(currentState, action) {
  switch (action.type) {
    case "addTask": {
      const newTask = {
        id: uuidv4(),
        title: action.payload.id,
        body: "",
        completed: false,
      };
      const updatedTodos = [...currentState, newTask];
      const s = JSON.stringify(updatedTodos);
      localStorage.setItem("todos", s);
      return updatedTodos;
    }
    case "confirmEdit": {
      const updatedTodos = currentState.map((t) =>
        action.payload.id === t.id
          ? { ...t, title: action.payload.title, body: action.payload.body }
          : t
      );
      const s = JSON.stringify(updatedTodos);
      localStorage.setItem("todos", s);
      return updatedTodos;
    }
    case "confirmDelete": {
      const updatedTodos = currentState.filter(
        (t) => t.id !== action.payload.id
      );
      const s = JSON.stringify(updatedTodos);
      localStorage.setItem("todos", s);
      return updatedTodos;
    }
    case "complete": {
      const updatedTodos = currentState.map((t) =>
        t.id === action.payload.id ? { ...t, completed: !t.completed } : t
      );
      const s = JSON.stringify(updatedTodos);
      localStorage.setItem("todos", s);
      return updatedTodos;
    }
    case "get": {
      const localTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
      return localTodos;
    }
    default: {
      console.log("Error");
    }
  }
}
