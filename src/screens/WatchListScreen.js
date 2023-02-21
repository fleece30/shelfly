import React from "react";
import { View, SafeAreaView } from "react-native";
import GradientBackground from "../components/GradientBackground";
import CustomText from "../components/CustomText";

const WatchListScreen = () => {
  return (
    <GradientBackground>
      <SafeAreaView>
        <View className={"px-4 py-3 flex"}>
          <CustomText classes={"text-4xl text-center"} font={"lusitana-bold"}>
            My watchlists
          </CustomText>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default WatchListScreen;
