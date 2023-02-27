import React from "react";
import { Text } from "react-native";

const CustomText = ({ children, classes, font, color = "#FAF9F6" }) => {
  return (
    <Text
      className={classes}
      style={{ fontFamily: font, color, flexShrink: 1 }}
    >
      {children}
    </Text>
  );
};

export default CustomText;
