import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  loadTasks,
  addTask as addTaskService,
  toggleTaskCompletion as toggleTaskService,
  deleteTask as deleteTaskService,
  reorderTasks as reorderTasksService,
  clearCompletedTasks as clearCompletedTasksService,
} from "@/services/taskStorage";
import { Task, TaskContextType } from "@/@types/Task";

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const loadedTasks = await loadTasks();
        setTasks(loadedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (
    title: string,
    description?: string
  ): Promise<void> => {
    const updatedTasks = await addTaskService(title, description);
    setTasks(updatedTasks);
  };

  const toggleTaskCompletion = async (id: string): Promise<void> => {
    const updatedTasks = await toggleTaskService(id);
    setTasks(updatedTasks);
  };

  const deleteTask = async (id: string): Promise<void> => {
    const updatedTasks = await deleteTaskService(id);
    setTasks(updatedTasks);
  };

  const reorderTasks = async (reorderedTasks: Task[]): Promise<void> => {
    const updatedTasks = await reorderTasksService(reorderedTasks);
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = async (): Promise<void> => {
    const updatedTasks = await clearCompletedTasksService();
    setTasks(updatedTasks);
  };

  const contextValue: TaskContextType = {
    tasks,
    loading,
    addTask,
    toggleTaskCompletion,
    deleteTask,
    reorderTasks,
    clearCompletedTasks,
  };

  return (
    <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>
  );
};
