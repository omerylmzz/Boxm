import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import LightTheme from "../../themes/LightTheme";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const OnboardingItem = ({ image, title, description }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} resizeMode="contain" />
      <View style={styles.wrapper}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: SCREEN_WIDTH * 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 0.5,
    alignItems: "center",
  },
  wrapper: {
    flex: 0.3,
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 32,
    color: LightTheme.colors.title,
  },
  description: {
    fontSize: 14,
    maxWidth: SCREEN_WIDTH * 0.95,
    textAlign: "center",
    color: LightTheme.colors.text,
  },
});

export default OnboardingItem;
