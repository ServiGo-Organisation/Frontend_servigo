import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ButtonAddServicePrestataire = ({ onPress }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.cardContainer}
      onPress={onPress}
    >
      <View style={styles.card}>
        <Ionicons name="add" size={48} color="#8B5CF6" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    marginHorizontal: 20,
  },
  card: {
    width: "100%", // 🔥 largeur 100%
    borderRadius: 16,
    paddingVertical: 40, // espace pour agrandir le bouton
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed", // 🔥 pointillé
    borderColor: "#8B5CF6",
    backgroundColor: "rgba(139, 92, 246, 0.08)", // 🔥 violet transparent
  },
});

export default ButtonAddServicePrestataire;
