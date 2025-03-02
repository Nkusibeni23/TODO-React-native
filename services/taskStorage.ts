import { Task } from "@/@types/Task";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TASKS_STORAGE_KEY = "@todo_app_tasks";

export const saveTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

export const loadTasks = async (): Promise<Task[]> => {
  try {
    const tasksJson = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

export const addTask = async (
  title: string,
  description?: string
): Promise<Task[]> => {
  const tasks = await loadTasks();
  const newTask: Task = {
    id: Date.now().toString(),
    title,
    description,
    completed: false,
    createdAt: Date.now(),
  };

  const updatedTasks = [...tasks, newTask];
  await saveTasks(updatedTasks);
  return updatedTasks;
};

export const toggleTaskCompletion = async (taskId: string): Promise<Task[]> => {
  const tasks = await loadTasks();
  const updatedTasks = tasks.map((task) => {
    if (task.id === taskId) {
      return {
        ...task,
        completed: !task.completed,
        completedAt: !task.completed ? Date.now() : undefined,
      };
    }
    return task;
  });

  await saveTasks(updatedTasks);
  return updatedTasks;
};

export const deleteTask = async (taskId: string): Promise<Task[]> => {
  const tasks = await loadTasks();
  const updatedTasks = tasks.filter((task) => task.id !== taskId);
  await saveTasks(updatedTasks);
  return updatedTasks;
};

export const reorderTasks = async (reorderedTasks: Task[]): Promise<Task[]> => {
  await saveTasks(reorderedTasks);
  return reorderedTasks;
};

export const clearCompletedTasks = async (): Promise<Task[]> => {
  const tasks = await loadTasks();
  const updatedTasks = tasks.filter((task) => !task.completed);
  await saveTasks(updatedTasks);
  return updatedTasks;
};
