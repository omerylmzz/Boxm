import { NavigationContainer } from "@react-navigation/native";
import Route from "./src/screens/Route";
import { StatusBar } from "react-native";
import LightTheme from "./src/themes/LightTheme";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={LightTheme.colors.background}
      />
      <Route />
    </NavigationContainer>
  );
}
