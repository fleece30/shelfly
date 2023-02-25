import React from "react";
import { View } from "react-native";

const Overlay = ({ isVisible }) => {
  return (
    <View
      className={`w-screen h-screen bg-black/70 absolute ${
        isVisible ? "visible" : "hidden"
      }`}
    />
  );
};

export default Overlay;
