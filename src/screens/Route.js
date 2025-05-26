import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./Splash";
import Onboarding from "./Onboarding";
import Security from "./Security";
import Home from "./Home";
import NewCollection from "./NewCollection";

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        name="Security"
        component={Security}
        options={{ animation: "ios_from_right" }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ animation: "fade" }}
      />
      <Stack.Screen
        name="NewCollection"
        component={NewCollection}
        options={{ animation: "fade_from_bottom" }}
      />
    </Stack.Navigator>
  );
};

export default Route;
