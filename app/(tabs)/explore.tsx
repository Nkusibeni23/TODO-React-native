import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import DraggableTaskList from "@/components/DraggableTaskList";
import { useTaskContext } from "@/context/TaskContext";
import { Feather } from "@expo/vector-icons";

export default function CompletedScreen() {
  const { loading, clearCompletedTasks } = useTaskContext();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />

      <View className="flex-1">
        <View className="px-4 pt-6 pb-2 flex-row justify-between items-center">
          <Text className="text-2xl font-bold text-gray-800">
            Completed Tasks
          </Text>

          <TouchableOpacity
            className="flex-row items-center py-2 px-3 bg-red-50 rounded-lg"
            onPress={clearCompletedTasks}
          >
            <Feather name="trash-2" size={16} color="#F44336" />
            <Text className="ml-1 text-red-500 font-medium">Clear All</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500">Loading tasks...</Text>
          </View>
        ) : (
          <ScrollView className="flex-1 mt-2">
            <DraggableTaskList filter="completed" />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
