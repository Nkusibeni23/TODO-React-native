export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

export interface ItemLayout {
  y: number;
  height: number;
}

export interface DraggableTaskItemProps {
  task: Task;
  index: number;
  moveTask: (dragIndex: number, hoverIndex: number) => void;
  totalItems: number;
  itemsLayout: (ItemLayout | null)[];
  onLayoutChange: (index: number, layout: ItemLayout) => void;
}

export interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (title: string, description?: string) => Promise<void>;
  toggleTaskCompletion: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  reorderTasks: (reorderedTasks: Task[]) => Promise<void>;
  clearCompletedTasks: () => Promise<void>;
}
