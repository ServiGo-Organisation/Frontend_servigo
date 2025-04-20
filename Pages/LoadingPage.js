import React, { useEffect, useRef } from "react";
import { View, Image, Animated, StyleSheet } from "react-native";

export default function LoadingPage() {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 3000, // Temps de rotation (3 secondes ici)
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("../assets/images/ServiGOlogo.png")}
        style={[styles.image, { transform: [{ rotate: rotateInterpolate }] }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5E17EB", // Fond violet
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300, // Ajuste la taille selon ton image
    height: 300,
  },
});
