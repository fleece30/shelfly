import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import _uuid from "lodash/uniqueId";
import CustomText from "./CustomText";
import useAuth from "../../hooks/useAuth";

const ResultListItem = ({
  itemToRender,
  navigatingFromWatchList = false,
  type,
}) => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    if (Object.keys(user.userMovies).includes(`${itemToRender.id}`)) {
      setWatched(user.userMovies[`${itemToRender.id}`]);
    }
  }, [itemToRender]);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("SingleMovie", {
          id: itemToRender.id,
          type,
          navigatingFromWatchList,
          haveWatched: watched,
        })
      }
      key={_uuid()}
      className={
        "w-full h-fit flex flex-row py-1 border-b-[0.5px] border-slate-800"
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
        <View className={"flex flex-row justify-start w-2/3"}>
          <CustomText font={"montserrat-reg"} classes={"mr-3"}>
            {itemToRender.releaseDate}
          </CustomText>
          <CustomText font={"montserrat-reg"}>
            {type === 1 ? "TV Show" : null}
          </CustomText>
        </View>
        {navigatingFromWatchList && (
          <View
            className={`${
              watched ? "bg-green/20" : "bg-white/20"
            } max-w-fit p-1 rounded-sm self-start`}
          >
            <CustomText
              font={"poppins-sbold"}
              classes={"text-xs"}
              color={watched ? "#BADC58" : "#FAF9F6"}
            >
              {watched ? "WATCHED" : "YET TO WATCH"}
            </CustomText>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ResultListItem;
