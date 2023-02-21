import React from "react";
import { View, TextInput } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

const SearchBar = ({ placeholder, setSearch }) => {
  return (
    <View className="flex-row items-center mt-3">
      <View className="flex-row bg-white/5 px-4 py-3 space-x-2 flex-1 rounded">
        <MagnifyingGlassIcon color={"white"} size={20} />
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"white"}
          className="flex-1"
          style={{ fontFamily: "montserrat-reg", fontSize: 16, color: "white" }}
          onChangeText={(e) => setSearch(e)}
        />
      </View>
    </View>
  );
};

export default SearchBar;
