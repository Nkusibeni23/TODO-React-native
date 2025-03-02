import React from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import DraggableTaskList from "@/components/DraggableTaskList";
import AddTaskForm from "@/components/AddTaskForm";
import { useTaskContext } from "@/context/TaskContext";

export default function HomeScreen() {
  const { loading } = useTaskContext();

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />

      <View className="flex-1">
        <View className="px-4 pt-6 pb-2">
          <Text className="text-2xl font-bold text-gray-800">My Tasks</Text>
        </View>

        <AddTaskForm />

        {loading ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-gray-500">Loading tasks...</Text>
          </View>
        ) : (
          <ScrollView className="flex-1">
            <DraggableTaskList filter="active" />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
