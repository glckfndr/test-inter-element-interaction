import React, { useState, useRef, useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";

const SecondElement = ({ firstRef, triggerAnimation }) => {
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const [distance, setDistance] = useState(0);
  const secondRef = useRef(null);
  const [absolutePosition, setAbsolutePosition] = useState({ x: 0, y: 0 });

  const calculateDistance = (x, y) => {
    if (firstRef.current) {
      firstRef.current.measure((fx, fy, fw, fh, fpx, fpy) => {
        const dx = x - fpx;
        const dy = y - fpy;
        const newDistance = Math.sqrt(dx * dx + dy * dy);
        setDistance(newDistance);

        if (newDistance < 100) {
          // Change 100 to your threshold value
          runOnJS(triggerAnimation)(true);
        } else {
          runOnJS(triggerAnimation)(false);
        }
      });
    }
  };

  const getAbsolutePosition = () => {
    if (secondRef.current) {
      secondRef.current.measure((x, y, width, height, pageX, pageY) => {
        setAbsolutePosition({ x: pageX, y: pageY });
      });
    }
  };

  useEffect(() => {
    getAbsolutePosition(); // Trigger position update on mount
  }, []);

  const panGesture = Gesture.Pan().onUpdate((event) => {
    translationX.value = event.translationX;
    translationY.value = event.translationY;
    runOnJS(calculateDistance)(event.absoluteX, event.absoluteY);
    runOnJS(getAbsolutePosition)();
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          ref={secondRef}
          style={[styles.box, animatedStyle, { backgroundColor: "green" }]}
          onLayout={getAbsolutePosition} // Ensure position is set on layout
        >
          <Text style={styles.text}>Element 2</Text>
        </Animated.View>
      </GestureDetector>
      <Text style={styles.distanceText}>
        Distance: {distance.toFixed(2)} px
      </Text>
      <Text style={styles.distanceText}>
        Position: {`X: ${absolutePosition.x}, Y: ${absolutePosition.y}`}
      </Text>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  text: {
    color: "white",
  },
  distanceText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default SecondElement;
