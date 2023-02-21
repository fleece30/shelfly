import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../src/screens/LoginScreen";
import HomeScreen from "../src/screens/HomeScreen";
import useAuth from "../hooks/useAuth";
import MovieScreen from "../src/screens/movies/movieScreen";
import SingleMovieScreen from "../src/screens/movies/SingleMovieScreen";
import WatchListScreen from "../src/screens/WatchListScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          <Stack.Screen name={"Home"} component={HomeScreen} />
          <Stack.Screen name={"Movies"} component={MovieScreen} />
          <Stack.Screen name={"SingleMovie"} component={SingleMovieScreen} />
          <Stack.Screen name={"WatchList"} component={WatchListScreen} />
        </>
      ) : (
        <Stack.Screen name={"Login"} component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default StackNavigation;
