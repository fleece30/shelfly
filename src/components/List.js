import React, { useCallback, useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import _map from "lodash/map";
import CustomText from "./CustomText";
import { ChevronRightIcon } from "react-native-heroicons/outline";
import useAuth from "../../hooks/useAuth";

const List = ({ listToRender, onPress }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { getUserData } = useAuth();

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    getUserData().then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 500 }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={["#fff"]}
          tintColor={"#fff"}
        />
      }
    >
      <View>
        {_map(listToRender, (watchList, index) => {
          return (
            <TouchableOpacity
              key={index}
              className={
                "h-14 flex flex-row justify-between items-center border-b-[0.5px] border-slate-800 px-3"
              }
              onPress={() => onPress(index)}
            >
              <CustomText font={"poppins-sbold"}>{watchList.title}</CustomText>
              <View className={"flex flex-row items-center space-x-2"}>
                <CustomText font={"poppins-reg"}>
                  {watchList.items.length}{" "}
                  {watchList.items.length !== 1 ? "items" : "item"}
                </CustomText>
                <ChevronRightIcon color={"#FAF9F6"} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default List;
