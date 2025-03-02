import React from "react";
import { View } from "react-native";
import { BlurView } from "expo-blur";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabBarBackground() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <BlurView
      intensity={80}
      tint={isDark ? "dark" : "light"}
      className="absolute inset-0"
    >
      <View
        className={`absolute inset-0 ${
          isDark ? "bg-gray-900" : "bg-white"
        } opacity-80`}
      />
    </BlurView>
  );
}
