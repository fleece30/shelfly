import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import CustomText from "./CustomText";
import { LinearGradient } from "expo-linear-gradient";
import ButtonPrimary from "./ButtonPrimary";
import { v4 as uuidv4 } from "uuid";
import {
  db,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
  getDoc,
} from "../../helpers/firebase";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";

const CreateListModal = ({ isModalOpen, setIsModalOpen, itemToAdd, type }) => {
  const [listName, setListName] = useState("My watchlist");
  const { user, getUserData } = useAuth();
  const navigation = useNavigation();

  const addListToDB = async () => {
    await updateDoc(doc(db, "users", user.uid), {
      watchLists: arrayUnion({
        id: uuidv4(),
        title: listName,
        items: [],
        desc: "",
      }),
    }).then(() => {
      getUserData().catch((error) => console.log(error));
      setIsModalOpen(false);
    });
  };

  const createPlaylistAndAdd = async () => {
    const id = itemToAdd.id;
    const newList = {
      id: uuidv4(),
      title: listName,
      items: [
        {
          id,
          poster_path: `https://image.tmdb.org/t/p/w500${itemToAdd.poster_path}`,
          type,
          title: type === 0 ? itemToAdd.title : itemToAdd.name,
        },
      ],
      desc: "",
    };

    const userRef = doc(db, "users", user.uid);
    const userData = (await getDoc(userRef)).data();
    userData.watchLists.push(newList);
    userData.userMovies[id] = false;
    const uploadedRef = doc(db, "uploadedWatchLists", newList.id);
    const uploadedSnapshot = await getDoc(uploadedRef);

    if (uploadedSnapshot.exists()) {
      await setDoc(uploadedRef, watchList);
    }

    await setDoc(userRef, userData).then(() => {
      getUserData().catch((error) => console.log(error));
      setIsModalOpen(false);
      navigation.goBack();
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(false);
      }}
    >
      <TouchableOpacity
        className={"w-screen h-screen flex justify-center items-center"}
        onPress={() => setIsModalOpen(false)}
      >
        <TouchableWithoutFeedback>
          <LinearGradient
            colors={["#212330", "#0E0F17"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 1, y: 0.5 }}
            className={"w-3/4 h-2/5 rounded-md justify-center items-center"}
          >
            <View className={"px-2 items-center flex space-y-6 w-full"}>
              <CustomText font={"lusitana-bold"} classes={"text-xl"}>
                Name your watchlist
              </CustomText>
              <TextInput
                className={"border-b-2 border-b-white w-3/4 text-center mb-5"}
                style={{
                  fontFamily: "montserrat-reg",
                  fontSize: 24,
                  color: "#FAF9F6",
                }}
                autoFocus
                selectTextOnFocus
                cursorColor={"#FAF9F6"}
                selectionColor={"#FAF9F6"}
                defaultValue={"My watchlist"}
                onChangeText={(e) => setListName(e)}
              />
              <ButtonPrimary
                title={"Create"}
                classes={"w-3/4"}
                onPress={itemToAdd ? createPlaylistAndAdd : addListToDB}
              />
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default CreateListModal;
