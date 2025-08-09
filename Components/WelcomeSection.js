import React from "react";
import { View, Text, StyleSheet } from "react-native";

const WelcomeSection = ({ userInfos, isLoading, isFinalUser }) => {
  const greeting = userInfos?.genre === "Male" ? "Mr" : "Mme";

  return (
    <View style={styles.welcomeSection}>
      {isLoading ? (
        <Text style={styles.text}>Chargement...</Text>
      ) : (
        <>
          <Text style={styles.greeting}>Bonjour {greeting}</Text>
          <Text style={styles.userName}>
            {userInfos?.nom && userInfos?.prenom
              ? `${userInfos.nom} ${userInfos.prenom}`
              : "Utilisateur"}
          </Text>
          <Text style={styles.subtitle}>
            Besoin de services chez vous sans sortir ?
          </Text>
          {isFinalUser && (
            <Text style={styles.userRole}>Utilisateur final</Text>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  welcomeSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  text: {
    color: "#666",
  },
  greeting: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#8a47fa",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  userRole: {
    fontSize: 12,
    color: "#8a47fa",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
});

export default WelcomeSection;
