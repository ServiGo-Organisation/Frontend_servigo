import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const PageTwoQuestionnaire = () => {
  return (
    <View>
      <Text style={styles.title}>Détails supplémentaires</Text>

      <Text style={styles.label}>Prénom</Text>
      <TextInput style={styles.input} placeholder="Prénom" />

      <Text style={styles.label}>Nom</Text>
      <TextInput style={styles.input} placeholder="Nom" />

      <Text style={styles.label}>Numéro de téléphone</Text>
      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Genre</Text>
      <TextInput style={styles.input} placeholder="Genre" />

      <Text style={styles.label}>Date de naissance</Text>
      <TextInput style={styles.input} placeholder="Date de naissance" />
    </View>
  );
};

export default PageTwoQuestionnaire;

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "#7C00FF",
  },
  input: {
    borderColor: "#7C00FF",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
});
