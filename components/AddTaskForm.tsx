import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useTaskContext } from "@/context/TaskContext";

const AddTaskForm: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { addTask } = useTaskContext();

  const handleAddTask = async () => {
    if (title.trim()) {
      await addTask(title.trim(), description.trim() || undefined);
      setTitle("");
      setDescription("");
      setIsModalVisible(false);
    }
  };

  const handleQuickAdd = async () => {
    if (title.trim()) {
      await addTask(title.trim());
      setTitle("");
    }
  };

  return (
    <View className="p-4">
      <View className="flex-row items-center rounded-lg bg-white shadow-sm overflow-hidden">
        <TextInput
          className="flex-1 px-4 py-3 text-gray-800"
          placeholder="Add a task..."
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={handleQuickAdd}
        />
        <TouchableOpacity
          className="p-3 bg-blue-500"
          onPress={() =>
            title.trim() ? handleQuickAdd() : setIsModalVisible(true)
          }
        >
          <FontAwesome5 name="plus" size={18} color="white" />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 justify-end bg-black bg-opacity-50">
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View className="bg-white rounded-t-xl p-4">
                <Text className="text-xl font-bold text-gray-800 mb-4">
                  Add New Task
                </Text>

                <Text className="text-gray-700 mb-2">Title</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                  placeholder="Task title"
                  value={title}
                  onChangeText={setTitle}
                  autoFocus
                />

                <Text className="text-gray-700 mb-2">
                  Description (optional)
                </Text>
                <TextInput
                  className="border border-gray-300 rounded-lg px-3 py-2 mb-6"
                  placeholder="Add details about your task"
                  value={description}
                  onChangeText={setDescription}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />

                <View className="flex-row justify-end">
                  <TouchableOpacity
                    className="py-2 px-4 rounded-lg mr-2"
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text className="text-gray-600 font-medium">Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className={`py-2 px-4 rounded-lg ${
                      title.trim() ? "bg-blue-500" : "bg-blue-300"
                    }`}
                    onPress={handleAddTask}
                    disabled={!title.trim()}
                  >
                    <Text className="text-white font-medium">Add Task</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default AddTaskForm;
