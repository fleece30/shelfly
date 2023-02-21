import React from "react";
import { View, Text, Button } from "react-native";
import useAuth from "../../hooks/useAuth";

const LoginScreen = () => {
  const { signInWithGoogle } = useAuth();
  return (
    <View className={"flex-1 justify-center items-center"}>
      <Text>This is the LoginScreen</Text>
      <Button title={"Login"} onPress={signInWithGoogle} />
    </View>
  );
};

export default LoginScreen;
