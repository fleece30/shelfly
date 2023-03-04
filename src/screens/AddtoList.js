import React, { useEffect, useState } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import CustomText from "../components/CustomText";
import CreateListModal from "../components/CreateListModal";
import Overlay from "../components/Overlay";
import GradientBackground from "../components/GradientBackground";
import useAuth from "../../hooks/useAuth";
import { db, doc, getDoc, setDoc } from "../../helpers/firebase";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import List from "../components/List";

const AddToList = ({ route }) => {
  const { user, getUserData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { details, type } = route.params;
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) getUserData().catch((error) => console.log(error));
  }, [isFocused]);

  // useEffect(() => {
  //   if (!isModalOpen) getUserData().catch((error) => console.log(error));
  // }, [isModalOpen]);

  const updateListInDB = async (watchListIndex) => {
    const userRef = doc(db, "users", user.uid);

    const data = await getDoc(userRef);
    const userData = data.data();
    const id = details.id;

    const watchList = userData.watchLists[watchListIndex];
    const uploadedRef = doc(db, "uploadedWatchLists", watchList.id);
    const uploadedSnapshot = await getDoc(uploadedRef);

    watchList.items.push({
      id,
      poster_path: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
      type,
      title: type === 0 ? details.title : details.name,
    });
    if (uploadedSnapshot.exists()) {
      await setDoc(uploadedRef, watchList);
    }

    userData.userMovies[id] = false;
    await setDoc(userRef, userData).then(() => navigation.goBack());
  };

  return (
    <GradientBackground>
      <SafeAreaView>
        <View className={"px-4 py-3 flex"}>
          <CustomText classes={"text-4xl text-center"} font={"lusitana-bold"}>
            Add to watchlist
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
            onPress={(watchListIndex) => updateListInDB(watchListIndex)}
          />
          <CreateListModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            itemToAdd={details}
            type={type}
          />
        </View>
      </SafeAreaView>
      <Overlay isVisible={isModalOpen} />
    </GradientBackground>
  );
};

export default AddToList;
