import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = ({ image, id, type }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("SingleMovie", { id, type })}
      className={"w-40 h-56 mr-3"}
    >
      <Image className={"w-full h-full rounded-lg"} source={{ uri: image }} />
    </TouchableOpacity>
  );
};

export default Card;
