import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./Onboarding";

const Stack = createNativeStackNavigator();

const Route = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default Route;
