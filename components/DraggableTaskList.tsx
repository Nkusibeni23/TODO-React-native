import React, { useState, useRef, useEffect } from "react";
import { View, Text } from "react-native";
import { useTaskContext } from "@/context/TaskContext";
import DraggableTaskItem from "./DraggableTaskItem";
import { ItemLayout } from "@/@types/Task";

interface DraggableTaskListProps {
  filter?: "all" | "active" | "completed";
}

const DraggableTaskList: React.FC<DraggableTaskListProps> = ({
  filter = "all",
}) => {
  const { tasks, reorderTasks } = useTaskContext();
  const [itemsLayout, setItemsLayout] = useState<(ItemLayout | null)[]>([]);
  const listRef = useRef<View>(null);

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "active") return !task.completed;
    return true;
  });

  useEffect(() => {
    if (itemsLayout.length !== filteredTasks.length) {
      setItemsLayout(Array(filteredTasks.length).fill(null));
    }
  }, [filteredTasks.length]);

  const handleItemLayoutChange = (index: number, layout: ItemLayout) => {
    console.log(`Item ${index} Layout:`, layout);
    setItemsLayout((prev) => {
      const newLayout = [...prev];
      newLayout[index] = layout;
      console.log("Updated Items Layout:", newLayout);
      return newLayout;
    });
  };

  const moveTask = (dragIndex: number, hoverIndex: number) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(dragIndex, 1);
    updatedTasks.splice(hoverIndex, 0, movedTask);

    reorderTasks(updatedTasks);
    setItemsLayout(Array(updatedTasks.length).fill(null));
  };

  if (filteredTasks.length === 0) {
    return (
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-lg text-gray-500">
          {filter === "completed"
            ? "No completed tasks yet"
            : filter === "active"
            ? "No active tasks - everything is done!"
            : "No tasks yet - add your first one!"}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 p-4" ref={listRef}>
      {filteredTasks.map((task, index) => (
        <DraggableTaskItem
          key={task.id}
          task={task}
          index={index}
          moveTask={moveTask}
          totalItems={filteredTasks.length}
          itemsLayout={itemsLayout}
          onLayoutChange={handleItemLayoutChange}
        />
      ))}
    </View>
  );
};

export default DraggableTaskList;
