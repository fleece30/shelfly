import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./helpers/StackNavigation";
import { AuthProvider } from "./hooks/useAuth";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);
import {
  Lusitana_400Regular,
  Lusitana_700Bold,
} from "@expo-google-fonts/lusitana";

import {
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";

import {
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function App() {
  const [fontsLoaded] = useFonts({
    "lusitana-reg": Lusitana_400Regular,
    "lusitana-bold": Lusitana_700Bold,
    "montserrat-reg": Montserrat_400Regular,
    "montserrat-sbold": Montserrat_600SemiBold,
    "montserrat-bold": Montserrat_700Bold,
    "poppins-reg": Poppins_400Regular,
    "poppins-sbold": Poppins_600SemiBold,
    "poppins-bold": Poppins_700Bold,
  });

  return !fontsLoaded ? null : (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigation />
      </AuthProvider>
    </NavigationContainer>
  );
}
