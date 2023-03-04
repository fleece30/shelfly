import React from "react";
import { View, ScrollView } from "react-native";
import CustomText from "./CustomText";
import _map from "lodash/map";
import Card from "./Card";

const HorizontalList = ({ header, listToRender, type = 0 }) => {
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

export default HorizontalList;
