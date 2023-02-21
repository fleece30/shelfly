import React from "react";
import { View, ScrollView, Image, TouchableOpacity } from "react-native";
import _map from "lodash/map";
import CustomText from "../../components/CustomText";
import { useNavigation } from "@react-navigation/native";

const SearchResults = ({ searchResults }) => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <View className={"flex flex-wrap flex-row justify-around mt-4"}>
        {_map(searchResults, (movie, key) => {
          const type = movie.media_type === "movie" ? 0 : 1;
          if (!movie.release_date && !movie.first_air_date) return null;
          const release_date =
            type === 0
              ? movie.release_date.split("-")[0]
              : movie.first_air_date.split("-")[0];

          return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("SingleMovie", { id: movie.id, type })
              }
              key={key}
              className={
                "w-screen h-fit flex flex-row py-1 border-b-[0.5px] border-slate-800"
              }
            >
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                }}
                style={{
                  width: 200,
                  height: 150,
                  marginHorizontal: -30,
                  resizeMode: "contain",
                }}
              />
              <View className={"flex flex-wrap justify-center"}>
                <CustomText font={"montserrat-sbold"} classes={"break-words"}>
                  {movie.title || movie.name}
                </CustomText>
                <View className={"flex mt-3"}>
                  <CustomText font={"montserrat-reg"}>
                    {release_date}
                  </CustomText>
                  <CustomText font={"montserrat-reg"}>
                    {type === 1 ? "TV Show" : ""}
                  </CustomText>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default SearchResults;
