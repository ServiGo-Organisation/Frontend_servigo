import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

const GreetingText = () => {
  const { userInfos } = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Bonjour !{"\n"}chère partenaire</Text>
      {userInfos?.prenom && (
        <Text style={styles.subtext}>
          Dis-nous, {userInfos.prenom}, dans quoi es-tu doué ? {"\n"}
          Ajoute ici un service que tu maîtrises bien.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 6,
    color: "#222",
  },
  subtext: {
    fontSize: 14,
    color: "#888", // gris clair
    lineHeight: 20,
  },
});

export default GreetingText;
