import React from "react";
import { ScrollView, SafeAreaView, View } from "react-native";
import GradientBackground from "../components/GradientBackground";
import _map from "lodash/map";
import Card from "../components/Card";
import CustomText from "../components/CustomText";
import EmptyList from "../../assets/empty_list.svg";

const WatchListItems = ({ route }) => {
  const { watchList } = route.params;

  return (
    <GradientBackground>
      <SafeAreaView className={"flex-1"}>
        <CustomText
          classes={"text-4xl text-center py-6"}
          font={"lusitana-bold"}
        >
          {watchList.title}
        </CustomText>
        <CustomText
          font={"poppins-reg"}
          classes={"text-center text-base px-4 mb-4"}
        >
          {watchList.desc}
        </CustomText>
        {watchList.items.length > 0 ? (
          <ScrollView className={"h-full"}>
            <View className={"flex flex-row flex-wrap justify-center pb-10"}>
              {_map(watchList.items, (watchListItem, key) => (
                <Card
                  key={key}
                  image={watchListItem.image}
                  type={watchListItem.type}
                  id={watchListItem.id}
                />
              ))}
            </View>
          </ScrollView>
        ) : (
          <View className={"items-center justify-center"}>
            <EmptyList width={350} height={350} />
            <CustomText font={"poppins-sbold"} classes={"text-2xl"}>
              Such empty, much wow!
            </CustomText>
          </View>
        )}
      </SafeAreaView>
    </GradientBackground>
  );
};

export default WatchListItems;
