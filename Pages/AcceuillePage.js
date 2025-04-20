import React from "react";
import { View, StyleSheet, StatusBar, SafeAreaView, Image } from "react-native";
import { LoginButtons, Logo, WelcomeText } from "../Components";
// import Animated from "react-native-reanimated";
import ServiGologo from "../assets/images/ServiGologoBgNone.png";
const AccueillePage = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.content}>
        <Image source={ServiGologo} style={styles.logo} />
        <WelcomeText />
        <LoginButtons />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5E17EB", // Couleur violette similaire à celle de l'image
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  logo: {
    width: 250, // Ajuste la taille de l'image si nécessaire
    height: 200, // Ajuste la taille de l'image si nécessaire
    marginBottom: 20, // Ajoute de l'espace entre l'image et le texte/boutons
  },
});

export default AccueillePage;
