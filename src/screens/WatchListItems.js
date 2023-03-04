import React, { useEffect, useState } from "react";
import { ScrollView, SafeAreaView, View, TouchableOpacity } from "react-native";
import GradientBackground from "../components/GradientBackground";
import _map from "lodash/map";
import CustomText from "../components/CustomText";
import EmptyList from "../../assets/empty_list.svg";
import ResultListItem from "../components/ResultListItem";
import { useIsFocused } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import { db, doc, getDoc, setDoc } from "../../helpers/firebase";
import {
  CloudArrowUpIcon,
  PencilSquareIcon,
} from "react-native-heroicons/outline";
import ConfirmationModal from "../components/ConfirmationModal";
import Overlay from "../components/Overlay";

const WatchListItems = ({ route }) => {
  const { watchListIndex } = route.params;
  const { user } = useAuth();
  const isFocused = useIsFocused();
  const [watchList, setWatchList] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setWatchList(user.watchLists[watchListIndex]);
  }, [isFocused]);

  const upload = async () => {
    const uploadedRef = doc(
      db,
      "uploadedWatchLists",
      user.watchLists[watchListIndex].id
    );
    const uploadedSnapshot = await getDoc(uploadedRef);
    if (!uploadedSnapshot) {
      await setDoc(uploadedRef, {
        ...user.watchLists[watchListIndex],
        user: user.name,
      });
    }
    setIsModalOpen(false);
  };

  return (
    <GradientBackground>
      <SafeAreaView className={"flex-1"}>
        <View className={"flex flex-row justify-between px-5 items-center"}>
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <CloudArrowUpIcon color={"white"} size={30} />
          </TouchableOpacity>
          <CustomText
            classes={"text-4xl text-center py-6"}
            font={"lusitana-bold"}
          >
            {watchList.title}
          </CustomText>
          <PencilSquareIcon color={"white"} size={30} />
        </View>
        {user.watchLists[watchListIndex].desc !== "" && (
          <CustomText
            font={"poppins-reg"}
            classes={
              "text-center text-base px-4 mb-4 flex-wrap w-5/6 self-center h-24"
            }
          >
            {user.watchLists[watchListIndex].desc}
          </CustomText>
        )}
        {user.watchLists[watchListIndex].items.length > 0 ? (
          <ScrollView
            className={"h-full"}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <View
              className={"flex flex-row flex-wrap justify-center pb-10 mt-4"}
            >
              {_map(
                user.watchLists[watchListIndex].items,
                (watchListItem, key) => (
                  <ResultListItem
                    key={key}
                    itemToRender={watchListItem}
                    type={watchListItem.type}
                    navigatingFromWatchList={true}
                  />
                )
              )}
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
        <ConfirmationModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          upload={upload}
        />
        <Overlay isVisible={isModalOpen} />
      </SafeAreaView>
    </GradientBackground>
  );
};

export default WatchListItems;
