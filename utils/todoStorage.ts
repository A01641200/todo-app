import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const TODOS_KEY = "@todos_v1";

// Save todos
export const saveTodos = async (todos: Todo[]) => {
  try {
    const jsonValue = JSON.stringify(todos);
    await AsyncStorage.setItem(TODOS_KEY, jsonValue);
  } catch (error) {
    console.error("Failed to save todos:", error);
  }
};

// Retrieve todos
export const getTodos = async (): Promise<Todo[] | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(TODOS_KEY);

    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Failed to load todos:", error);
    return null;
  }
};