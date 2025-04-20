import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WelcomeText = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenue dans</Text>
      <Text style={styles.appName}>
        <Text style={styles.underline}>S</Text>ervi
        <Text style={styles.appName}>
          <Text style={styles.underline}>G</Text>o
        </Text>
      </Text>

      <Text style={styles.description}>
        Trouver un prestataire de service n'a jamais été aussi simple ! Que vous
        ayez besoin d'un électricien, d'un plombier, d'un mécanicien ou d'un
        autre professionnel, ServiGo vous met en relation avec les meilleurs
        prestataires près de chez vous.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-start", // "left" n'est pas une valeur valide, donc utilisez "flex-start"
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 20,
    color: "white",
    fontWeight: "400",
  },
  underline: {
    textDecorationLine: "underline",
  },
  appName: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "white",
    textAlign: "left",
    lineHeight: 22,
  },
});

export default WelcomeText;
