import React, { useEffect, useState } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import GradientBackground from "../components/GradientBackground";
import CustomText from "../components/CustomText";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import CreateListModal from "../components/CreateListModal";
import Overlay from "../components/Overlay";
import { renderVerticalList } from "../../helpers/helpers";

const WatchListScreen = () => {
  const { user, getUserData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    getUserData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!isModalOpen) getUserData().catch((error) => console.log(error));
  }, [isModalOpen]);

  const navigateToWatchList = (watchList) => {
    navigation.navigate("WatchListItems", {
      watchList,
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
          {renderVerticalList(user.watchLists, (watchList) =>
            navigateToWatchList(watchList)
          )}
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
