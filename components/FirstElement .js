import React, { forwardRef } from "react";
import { View, Text, StyleSheet } from "react-native";

const FirstElement = forwardRef((props, ref) => {
  return (
    <View ref={ref} style={[styles.box, { backgroundColor: "blue" }]}>
      <Text style={styles.text}>Element 1</Text>
    </View>
  );
});

const styles = StyleSheet.create({
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
});

export default FirstElement;
