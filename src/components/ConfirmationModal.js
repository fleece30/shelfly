import React from "react";
import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import CustomText from "./CustomText";
import ButtonPrimary from "./ButtonPrimary";

const ConfirmationModal = ({ isModalOpen, setIsModalOpen, upload }) => {
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
              <CustomText
                font={"lusitana-bold"}
                classes={"text-xl text-center"}
              >
                Do you want to upload your watchlist for others to see?
              </CustomText>
              <ButtonPrimary title={"Yes"} classes={"w-3/4"} onPress={upload} />
              <ButtonPrimary
                title={"No"}
                classes={"w-3/4"}
                onPress={() => setIsModalOpen(false)}
              />
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
};

export default ConfirmationModal;
