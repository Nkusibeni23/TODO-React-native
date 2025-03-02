import React from "react";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TaskProvider } from "@/context/TaskContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <TaskProvider>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              height: 90,
              paddingTop: 5,
            },
            android: {
              height: 90,
              paddingTop: 5,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Tasks",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="tasks" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Completed",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="task-alt" size={22} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <FontAwesome5 name="user" size={22} color={color} />
            ),
          }}
        />
      </Tabs>
    </TaskProvider>
  );
}
