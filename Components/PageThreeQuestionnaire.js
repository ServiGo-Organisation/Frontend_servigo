import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PageThreeQuestionnaire = ({
  formData,
  setFormData,
  handleSubmit,
  navigation,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onConfirm = async () => {
    if (isSubmitting) return;

    if (!formData.typeUtilisateur) {
      alert("Veuillez sélectionner un type d'utilisateur.");
      return;
    }

    setIsSubmitting(true);

    try {
      await handleSubmit(); // appelle la fonction passée en props (qui dispatch)
      // navigation sera géré dans handleSubmit du parent
    } catch (error) {
      alert("Erreur lors de l'inscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedType = formData.typeUtilisateur;

  return (
    <View>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/ServiGOLogoWhite.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Vous êtes :</Text>
      </View>

      {[
        {
          label: "Notre prestataire de service",
          value: "PRESTATAIRE",
          icon: "settings-outline",
        },
        { label: "Notre client", value: "CLIENT", icon: "person-outline" },
        {
          label: "Client & prestataire",
          value: "PRESTATEUR_CLIENT",
          icon: "people-outline",
        },
      ].map(({ label, value, icon }) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.optionButton,
            selectedType === value && styles.selectedOption,
          ]}
          onPress={() => setFormData({ ...formData, typeUtilisateur: value })}
        >
          <Text
            style={[
              styles.optionText,
              selectedType === value && styles.selectedOptionText,
            ]}
          >
            {label}
          </Text>
          <Ionicons
            name={icon}
            size={20}
            color={selectedType === value ? "#fff" : "#000"}
          />
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
        <Text style={styles.buttonText}>
          {isSubmitting ? "Enregistrement..." : "Confirmer"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PageThreeQuestionnaire;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  optionButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#7C00FF",
    borderColor: "#7C00FF",
  },
  optionText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 15,
  },
  selectedOptionText: {
    color: "#fff",
  },
  confirmButton: {
    backgroundColor: "#7C00FF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
