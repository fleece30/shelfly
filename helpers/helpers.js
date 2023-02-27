import React from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";
import CustomText from "../src/components/CustomText";
import _map from "lodash/map";
import _uuid from "lodash/uniqueId";
import Card from "../src/components/Card";
import { movieGenres } from "./constants";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

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

const renderVerticalList = (listToRender, onPress) => {
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 500 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        {_map(listToRender, (watchList, index) => {
          return (
            <TouchableOpacity
              key={index}
              className={
                "h-14 flex flex-row justify-between items-center border-b-[0.5px] border-slate-800 px-3"
              }
              onPress={() => onPress(watchList)}
            >
              <CustomText font={"poppins-sbold"}>{watchList.title}</CustomText>
              <View className={"flex flex-row items-center space-x-2"}>
                <CustomText font={"poppins-reg"}>
                  {watchList.items.length}{" "}
                  {watchList.items.length !== 1 ? "items" : "item"}
                </CustomText>
                <ChevronRightIcon color={"#FAF9F6"} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const renderResultItem = (
  itemToRender,
  type,
  navigatingFromWatchList = false
) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("SingleMovie", {
          id: itemToRender.id,
          type,
          navigatingFromWatchList,
        })
      }
      key={_uuid()}
      className={
        "w-screen h-fit flex flex-row py-1 border-b-[0.5px] border-slate-800"
      }
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${itemToRender.poster_path}`,
        }}
        style={{
          width: 200,
          height: 150,
          marginHorizontal: -30,
          resizeMode: "contain",
        }}
      />
      <View className={"flex space-y-2 justify-center flex-1 pr-2"}>
        <CustomText font={"montserrat-sbold"} classes={"break-words"}>
          {itemToRender.title || itemToRender.name}
        </CustomText>
        <CustomText font={"montserrat-reg"}>
          {type === 1 ? "TV Show" : ""}
        </CustomText>
      </View>
    </TouchableOpacity>
  );
};

export { renderList, renderGenres, renderVerticalList, renderResultItem };
