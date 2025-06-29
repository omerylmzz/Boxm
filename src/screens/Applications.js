import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import LightTheme from "../themes/LightTheme";
import PrimaryHeader from "../components/headers/PrimaryHeader";

const Applications = ({ navigation, route }) => {
  const { COLLECTION_NAME } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <PrimaryHeader
        title={COLLECTION_NAME}
        leftIcon="arrow-left"
        leftIconOnPress={() => navigation.goBack()}
        rightIcon="dots-vertical"
        optionalIcon="plus"
        optionalIconOnPress={() => navigation.navigate("NewApplication")}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightTheme.colors.background,
  },
});

export default Applications;
