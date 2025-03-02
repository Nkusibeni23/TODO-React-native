import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTaskContext } from "@/context/TaskContext";
import { Feather } from "@expo/vector-icons";

export default function ProfileScreen() {
  const { tasks } = useTaskContext();

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.length - completedCount;
  const completionRate =
    tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  const settingsOptions = [
    {
      title: "App Preferences",
      icon: <Feather name="settings" size={20} color="#4B5563" />,
      items: [
        {
          label: "Dark Mode",
          icon: <Feather name="moon" size={18} color="#6B7280" />,
        },
        {
          label: "Notifications",
          icon: <Feather name="bell" size={18} color="#6B7280" />,
        },
      ],
    },
    {
      title: "Data",
      icon: <Feather name="database" size={20} color="#4B5563" />,
      items: [
        {
          label: "Export Tasks",
          icon: <Feather name="download" size={18} color="#6B7280" />,
        },
        {
          label: "Clear All Data",
          icon: <Feather name="trash-2" size={18} color="#EF4444" />,
        },
      ],
    },
    {
      title: "About",
      icon: <Feather name="info" size={20} color="#4B5563" />,
      items: [
        {
          label: "Version 1.0.0",
          icon: <Feather name="code" size={18} color="#6B7280" />,
        },
        {
          label: "Privacy Policy",
          icon: <Feather name="shield" size={18} color="#6B7280" />,
        },
      ],
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar style="auto" />

      <ScrollView className="flex-1">
        <View className="px-4 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-800">Profile</Text>
        </View>

        {/* Task Summary */}
        <View className="bg-white mx-4 rounded-xl p-4 shadow-sm mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Task Summary
          </Text>

          <View className="flex-row justify-between mb-4">
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-500">
                {tasks.length}
              </Text>
              <Text className="text-sm text-gray-600">Total</Text>
            </View>

            <View className="items-center">
              <Text className="text-2xl font-bold text-green-500">
                {completedCount}
              </Text>
              <Text className="text-sm text-gray-600">Completed</Text>
            </View>

            <View className="items-center">
              <Text className="text-2xl font-bold text-orange-500">
                {activeCount}
              </Text>
              <Text className="text-sm text-gray-600">Active</Text>
            </View>

            <View className="items-center">
              <Text className="text-2xl font-bold text-purple-500">
                {completionRate}%
              </Text>
              <Text className="text-sm text-gray-600">Completion</Text>
            </View>
          </View>
        </View>

        {/* Settings Sections */}
        {settingsOptions.map((section, sectionIndex) => (
          <View
            key={sectionIndex}
            className="bg-white mx-4 rounded-xl shadow-sm mb-6"
          >
            <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
              {section.icon}
              <Text className="ml-2 text-lg font-semibold text-gray-800">
                {section.title}
              </Text>
            </View>

            {section.items.map((item, itemIndex) => (
              <TouchableOpacity
                key={itemIndex}
                className="flex-row items-center justify-between px-4 py-4 border-b border-gray-100 active:bg-gray-50"
              >
                <View className="flex-row items-center">
                  {item.icon}
                  <Text className="ml-3 text-gray-700">{item.label}</Text>
                </View>
                <Feather name="chevron-right" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
