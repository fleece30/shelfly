import React from "react";
import { TouchableOpacity } from "react-native";
import CustomText from "./CustomText";

const ButtonPrimary = ({ onPress, title, classes }) => {
  return (
    <TouchableOpacity
      className={
        "w-full h-14 bg-white rounded-md justify-center items-center mt-5 " +
        classes
      }
      onPress={onPress}
    >
      <CustomText
        classes={"text-black text-base"}
        font={"montserrat-sbold"}
        color={"#000"}
      >
        {title}
      </CustomText>
    </TouchableOpacity>
  );
};

export default ButtonPrimary;
