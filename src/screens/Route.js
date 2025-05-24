import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./Onboarding";
import Security from "./Security";
import Home from "./Home";

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Security"
        component={Security}
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack.Navigator>
  );
};

export default Route;
