import { ScrollView, View } from "react-native";
import CustomText from "../src/components/CustomText";
import _map from "lodash/map";
import Card from "../src/components/Card";
import React from "react";
import { movieGenres } from "./constants";

// type:
//   0: movie
//   1: TV
const renderList = (header, listToRender, type = 0) => {
  return (
    <View className={"mt-6"}>
      <CustomText font={"lusitana-bold"} classes={"text-2xl"}>
        {header}
      </CustomText>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className={"flex flex-row mt-3 space-x-1"}
      >
        {_map(listToRender, (movie, key) => {
          return (
            <Card
              key={key}
              type={type}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              id={movie.id}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

const renderGenres = () => {
  return _map(movieGenres, (genre, key) => {
    return (
      <View key={key} className={"flex justify-center items-center"}>
        <View className={"bg-white w-20 h-20 rounded-lg"}></View>
        <CustomText font={"poppins-sbold"} classes={"text-center mt-2"}>
          {genre.name}
        </CustomText>
      </View>
    );
  });
};

export { renderList, renderGenres };
