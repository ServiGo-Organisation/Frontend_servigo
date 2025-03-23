import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Acceuille from "./Pages/Accueille";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Acceuille />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
});
