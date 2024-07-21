import React, { forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const FirstElement = forwardRef(({ scale }, ref) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View ref={ref} style={[styles.box, animatedStyle]}>
      <Text style={styles.text}>Element 1</Text>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
    marginBottom: 20,
  },
  text: {
    color: "white",
  },
});

export default FirstElement;
