import { useState, useEffect } from "react";
import { data } from "../data/todos";
import { saveTodos, getTodos } from "../utils/todoStorage";

export const useTodos = () => {
  const [todos, setTodos] = useState(
    [...data].sort((a, b) => b.id - a.id)
  );

  const [isLoaded, setIsLoaded] = useState(false);

  // Load todos when app opens
  useEffect(() => {
    const loadTodos = async () => {
      const savedTodos = await getTodos();

      if (savedTodos !== null) {
        setTodos(savedTodos);
      }

      setIsLoaded(true);
    };

    loadTodos();
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    if (isLoaded) {
      saveTodos(todos);
    }
  }, [todos, isLoaded]);

  // Add todo
  const addTodo = (text) => {
    if (!text.trim()) return false;

    const newId =
      todos.length > 0
        ? Math.max(...todos.map((todo) => todo.id)) + 1
        : 1;

    setTodos((previousTodos) => [
      {
        id: newId,
        title: text.trim(),
        completed: false,
      },
      ...previousTodos,
    ]);

    return true;
  };

  // Toggle todo
  const toggleTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  // Remove todo
  const removeTodo = (id) => {
    setTodos((previousTodos) =>
      previousTodos.filter((todo) => todo.id !== id)
    );
  };

  return {
    todos,
    isLoaded,
    addTodo,
    toggleTodo,
    removeTodo,
  };
};