import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  setCurrentUser,
  setTodos,
} from "../features/todoSlice";

const TodoItem = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);
  const currentUser = useSelector((state) => state.todos.currentUser);

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      setIsLoading(true);
      try {
        dispatch(setCurrentUser(user));
        const response = await fetch(`http://localhost:3001/users/${user.id}`);
        const data = await response.json();
        dispatch(setTodos(data.todos || []));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [dispatch]);

  const updateTodos = async (updatedTodos) => {
    if (!currentUser) return;
    try {
      await fetch(`http://localhost:3001/users/${currentUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todos: updatedTodos }),
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() === "") return;

    const newTodoItem = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    dispatch(addTodo(newTodoItem));
    setNewTodo("");
    updateTodos([...todos, newTodoItem]);
  };

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditValue(todo.text);
  };

  const handleEdit = (id) => {
    if (editValue.trim() === "") return;

    dispatch(editTodo({ id, text: editValue }));
    setEditingId(null);
    setEditValue("");

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, text: editValue } : todo
    );
    updateTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    updateTodos(updatedTodos);
  };

  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateTodos(updatedTodos);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-2xl mt-10 mx-auto px-4">
      <h1 className="text-4xl font-serif text-pink-600 text-center mb-8">
        My Todo List
      </h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-8">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1 px-4 py-2 rounded-lg border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-300 bg-white"
          placeholder="Add new task..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Task
        </button>
      </form>

      <div className="space-y-3">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-pink-100 flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
              className="w-5 h-5 text-pink-500 rounded border-pink-300"
            />

            {editingId === todo.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleEdit(todo.id)}
                className="flex-1 px-2 py-1 border border-pink-300 rounded"
              />
            ) : (
              <span
                className={`flex-1 ${
                  todo.completed
                    ? "line-through text-gray-400"
                    : "text-gray-700"
                }`}
              >
                {todo.text}
              </span>
            )}

            <div className="flex gap-2">
              {editingId === todo.id ? (
                <button
                  onClick={() => handleEdit(todo.id)}
                  className="p-2 text-pink-500 hover:bg-pink-50 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              ) : (
                <button
                  onClick={() => startEditing(todo)}
                  className="p-2 text-pink-500 hover:bg-pink-50 rounded-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </button>
              )}
              <button
                onClick={() => handleDelete(todo.id)}
                className="p-2 text-pink-500 hover:bg-pink-50 rounded-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                  <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}

        {todos.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No todos yet! Add some tasks to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
