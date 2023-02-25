import React, { useEffect } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import GradientBackground from "../components/GradientBackground";
import CustomText from "../components/CustomText";
import { SvgUri } from "react-native-svg";

const HomeScreen = () => {
  const { user, logOut } = useAuth();

  useEffect(() => {}, []);

  const navigation = useNavigation();
  return (
    <GradientBackground>
      <SafeAreaView>
        <View className={"py-7 px-6"}>
          <View className={"flex flex-row justify-between items-center"}>
            <View>
              <CustomText
                classes={"text-base"}
                font={"poppins-reg"}
                color={"#999"}
              >
                Hello,
              </CustomText>
              <CustomText classes={"text-2xl"} font={"poppins-bold"}>
                {user.name.split(" ")[0]}!
              </CustomText>
            </View>
            <View className={"h-20 w-20 bg-white rounded-full"}>
              <SvgUri uri={user.profilePic} />
            </View>
          </View>
          <View className={"mt-10 space-y-6"}>
            <TouchableOpacity onPress={() => navigation.navigate("WatchList")}>
              <CustomText font={"poppins-reg"}>My watchlists</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => logOut()}>
              <CustomText font={"poppins-reg"}>Sign out</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Movies")}>
              <CustomText font={"poppins-reg"}>Movies</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default HomeScreen;
