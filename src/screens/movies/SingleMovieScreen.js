import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, ScrollView, View } from "react-native";
import { fetchMovieById, fetchTVById } from "../../../helpers/api";
import CustomText from "../../components/CustomText";
import GradientBackground from "../../components/GradientBackground";
import ButtonPrimary from "../../components/ButtonPrimary";
import { useNavigation } from "@react-navigation/native";
import { db, doc, getDoc, setDoc } from "../../../helpers/firebase";
import useAuth from "../../../hooks/useAuth";

const SingleMovieScreen = ({ route }) => {
  const { id, type, navigatingFromWatchList, haveWatched } = route.params;
  const { user, getUserData } = useAuth();
  const [details, setDetails] = useState({});
  const [watched, setWatched] = useState(haveWatched);
  const navigation = useNavigation();

  const getDetails = async () => {
    type === 0
      ? await fetchMovieById(id).then(({ data }) => {
          setDetails(data);
        })
      : await fetchTVById(id).then(({ data }) => {
          setDetails(data);
        });
  };

  useEffect(() => {
    getDetails().catch((error) => console.log(error));
  }, []);

  const changeWatchedStatus = async () => {
    const userRef = doc(db, "users", user.uid);
    const userData = (await getDoc(userRef)).data();
    userData.userMovies[id] = !userData.userMovies[id];
    await setDoc(userRef, userData).then(() => {
      setWatched(!watched);
      getUserData().catch((err) => console.log(err));
    });
  };

  return (
    <GradientBackground>
      <SafeAreaView>
        <ScrollView className={"h-full"}>
          <View className={"px-6 py-3 flex"}>
            <View
              className={
                "flex items-center w-full h-fit drop-shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
              }
            >
              <Image
                className={"w-7/12 aspect-2/3 rounded-lg "}
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${details.poster_path}`,
                }}
              />
              <CustomText
                font={"lusitana-bold"}
                classes={"text-3xl text-center mt-4"}
              >
                {details.title}
              </CustomText>
              <View className={"w-full mt-3 flex flex-row justify-around"}>
                <CustomText font={"poppins-sbold"}>
                  {Math.round(details.vote_average * 10) / 10}/10
                </CustomText>
                <CustomText font={"poppins-sbold"}>
                  {type === 0 ? details.release_date : details.first_air_date}
                </CustomText>
              </View>
            </View>
            <View className={"mt-6"}>
              <CustomText
                font={"lusitana-bold"}
                classes={"text-2xl text-start underline"}
              >
                Overview
              </CustomText>
              <CustomText
                font={"poppins-reg"}
                classes={"leading-relaxed text-base mt-2"}
              >
                {details.overview}
              </CustomText>
            </View>

            {navigatingFromWatchList ? (
              <ButtonPrimary
                title={watched ? "I haven't seen this yet" : "I've seen this"}
                onPress={() => changeWatchedStatus()}
              />
            ) : (
              <ButtonPrimary
                title={"Add to watchlist"}
                onPress={() =>
                  navigation.navigate("AddToList", { details, type })
                }
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GradientBackground>
  );
};

export default SingleMovieScreen;
