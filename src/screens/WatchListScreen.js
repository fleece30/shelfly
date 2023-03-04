import React, { useState } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import GradientBackground from "../components/GradientBackground";
import CustomText from "../components/CustomText";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import CreateListModal from "../components/CreateListModal";
import Overlay from "../components/Overlay";
import List from "../components/List";

const WatchListScreen = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

  // useEffect(() => {
  //   if (!isModalOpen) getUserData().catch((error) => console.log(error));
  // }, [isModalOpen]);

  const navigateToWatchList = (watchListIndex) => {
    navigation.navigate("WatchListItems", {
      watchListIndex,
    });
  };

  return (
    <GradientBackground>
      <SafeAreaView>
        <View className={"px-4 py-3 flex"}>
          <CustomText classes={"text-4xl text-center"} font={"lusitana-bold"}>
            My watchlists
          </CustomText>
          <TouchableOpacity
            className={
              "bg-white/5 w-full h-44 my-4 rounded-lg justify-center items-center"
            }
            onPress={() => setIsModalOpen(true)}
          >
            <CustomText classes={"text-xl"} font={"poppins-sbold"}>
              Create new watchlist
            </CustomText>
          </TouchableOpacity>
          <List
            listToRender={user.watchLists}
            onPress={(watchListIndex) => navigateToWatchList(watchListIndex)}
          />
          <CreateListModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </View>
      </SafeAreaView>
      <Overlay isVisible={isModalOpen} />
    </GradientBackground>
  );
};

export default WatchListScreen;
