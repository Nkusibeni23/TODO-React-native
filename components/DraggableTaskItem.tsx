import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
  StyleSheet,
  LayoutChangeEvent,
} from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useTaskContext } from "@/context/TaskContext";
import { DraggableTaskItemProps } from "@/@types/Task";

const DraggableTaskItem: React.FC<DraggableTaskItemProps> = ({
  task,
  index,
  moveTask,
  itemsLayout,
  onLayoutChange,
}) => {
  const { toggleTaskCompletion, deleteTask } = useTaskContext();
  const pan = useRef(new Animated.ValueXY()).current;
  const [isDragging, setIsDragging] = useState(false);
  const itemRef = useRef<View>(null);

  const handleLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    onLayoutChange(index, { y, height });
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dy) > 5,
      onPanResponderGrant: () => {
        if (itemsLayout.some((layout) => !layout)) {
          console.log("Layouts not ready yet!");
          return;
        }
        setIsDragging(true);
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        pan.flattenOffset();
        setIsDragging(false);

        const currentItemPos = itemsLayout[index];
        if (!currentItemPos) {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
          return;
        }

        const draggedItemMidpoint =
          currentItemPos.y + gestureState.dy + currentItemPos.height / 2;
        let targetIndex = index;

        itemsLayout.forEach((position, idx) => {
          if (!position || idx === index) return;

          const itemTop = position.y;
          const itemBottom = position.y + position.height;

          if (gestureState.dy < 0 && draggedItemMidpoint < itemTop) {
            targetIndex = idx;
          } else if (gestureState.dy > 0 && draggedItemMidpoint > itemBottom) {
            targetIndex = idx;
          }
        });

        if (targetIndex !== index) {
          const targetPos = itemsLayout[targetIndex];
          if (targetPos) {
            const newY = targetPos.y - currentItemPos.y;
            Animated.spring(pan, {
              toValue: { x: 0, y: newY },
              friction: 5,
              useNativeDriver: false,
            }).start(() => {
              moveTask(index, targetIndex);
              pan.setValue({ x: 0, y: 0 });
            });
          }
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      ref={itemRef}
      onLayout={handleLayout}
      style={[
        styles.taskItem,
        {
          transform: [{ translateY: pan.y }],
          zIndex: isDragging ? 10 : 0,
          shadowOpacity: isDragging ? 0.3 : 0,
          elevation: isDragging ? 8 : 0,
          backgroundColor: isDragging ? "#F5F5F5" : "white",
        },
      ]}
      {...panResponder.panHandlers}
    >
      <TouchableOpacity
        className="flex-row items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm"
        activeOpacity={0.8}
      >
        <View className="flex-row items-center flex-1">
          <TouchableOpacity
            onPress={() => toggleTaskCompletion(task.id)}
            className="mr-3"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            {task.completed ? (
              <MaterialIcons name="check-circle" size={24} color="#4CAF50" />
            ) : (
              <MaterialIcons
                name="radio-button-unchecked"
                size={24}
                color="#9E9E9E"
              />
            )}
          </TouchableOpacity>

          <View className="flex-1">
            <Text
              className={`text-base font-medium ${
                task.completed ? "text-gray-400 line-through" : "text-gray-800"
              }`}
              numberOfLines={1}
            >
              {task.title}
            </Text>
            {task.description ? (
              <Text
                className={`text-sm ${
                  task.completed ? "text-gray-400" : "text-gray-600"
                }`}
                numberOfLines={1}
              >
                {task.description}
              </Text>
            ) : null}
          </View>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => deleteTask(task.id)}
            className="ml-2"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Feather name="trash-2" size={20} color="#F44336" />
          </TouchableOpacity>
          <View className="ml-3">
            <Feather name="menu" size={20} color="#9E9E9E" />
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskItem: {
    width: "100%",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3,
  },
});

export default DraggableTaskItem;
