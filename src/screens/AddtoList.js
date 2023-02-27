import React, { useEffect, useState } from "react";
import { View, SafeAreaView, TouchableOpacity } from "react-native";
import CustomText from "../components/CustomText";
import CreateListModal from "../components/CreateListModal";
import Overlay from "../components/Overlay";
import GradientBackground from "../components/GradientBackground";
import useAuth from "../../hooks/useAuth";
import { renderVerticalList } from "../../helpers/helpers";
import { db, doc, getDoc, setDoc } from "../../helpers/firebase";
import { useNavigation } from "@react-navigation/native";

const AddToList = ({ route }) => {
  const { user, getUserData } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { details, type } = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    getUserData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!isModalOpen) getUserData().catch((error) => console.log(error));
  }, [isModalOpen]);

  const updateListInDB = async (watchList) => {
    const userRef = doc(db, "users", user.uid);
    const data = await getDoc(userRef);
    const userData = data.data();
    const watchListIndex = userData.watchLists.findIndex(
      (obj) => obj.title === watchList.title
    );
    userData.watchLists[watchListIndex].items.push({
      id: details.id,
      poster_path: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
      type,
      title: type === 0 ? details.title : details.name,
    });
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
          {renderVerticalList(user.watchLists, (watchList) =>
            updateListInDB(watchList)
          )}
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
