import { useRef, useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import LightTheme from "../themes/LightTheme";
import { verticalScale } from "../helpers/Metrics";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import PrimaryButton from "../components/buttons/PrimaryButton";
import OnboardingData from "../constants/OnboardingData";
import OnboardingItem from "../components/items/OnboardingItem";
import Pegination from "../components/items/Pegination";

const Onboarding = ({ navigation }) => {
  const flatListRef = useRef(null);
  const flatListIndex = useSharedValue(0);
  const axisX = useSharedValue(0);

  const [buttonText, setButtonText] = useState("");

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      axisX.value = event.contentOffset.x;
    },
  });

  const onViewableItemsChanged = ({ viewableItems }) => {
    flatListIndex.value = viewableItems[0].index;
    viewableItems[0].index === OnboardingData.length - 1
      ? setButtonText("Başla")
      : setButtonText("Devam et");
  };

  const onPress = () => {
    if (flatListIndex.value < OnboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      navigation.navigate("Security");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        onViewableItemsChanged={onViewableItemsChanged}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        data={OnboardingData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <OnboardingItem
            image={item.image}
            title={item.title}
            description={item.description}
          />
        )}
      />
      <Pegination data={OnboardingData} axis={axisX} />
      <PrimaryButton text={buttonText} onPress={onPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LightTheme.colors.background,
    paddingBottom: verticalScale(20),
  },
});

export default Onboarding;
