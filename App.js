import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import FirstElement from "./components/FirstElement ";
import SecondElement from "./components/SecondElement";

const App = () => {
  const firstRef = useRef(null);

  return (
    <View style={styles.container}>
      <FirstElement ref={firstRef} />
      <SecondElement firstRef={firstRef} />
      <SecondElement firstRef={firstRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
