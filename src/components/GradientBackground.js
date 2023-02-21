import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const GradientBackground = ({ children }) => {
  return (
    <LinearGradient
      colors={["#212330", "#0E0F17"]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 1, y: 0.5 }}
      className={"flex-1"}
    >
      {children}
    </LinearGradient>
  );
};

export default GradientBackground;
