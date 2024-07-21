import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import FirstElement from "./components/FirstElement";
import SecondElement from "./components/SecondElement";

import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

const App = () => {
  const firstRef = useRef(null);
  const scale = useSharedValue(1);

  const triggerAnimation = (shouldAnimate) => {
    scale.value = withSpring(shouldAnimate ? 1.5 : 1);
  };

  return (
    <View style={styles.container}>
      <FirstElement ref={firstRef} scale={scale} />
      <SecondElement firstRef={firstRef} triggerAnimation={triggerAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
