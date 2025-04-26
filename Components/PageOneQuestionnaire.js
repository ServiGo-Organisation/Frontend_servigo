import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const PageOneQuestionnaire = ({ formData, setFormData, setStep }) => {
  const [errors, setErrors] = useState({});
  const [isFocus, setIsFocus] = useState(false); // Pour gérer le focus

  const validateForm = () => {
    const newErrors = {};
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const phoneRegex = /^[0-9]{10}$/;

    // if (!formData.email || !emailRegex.test(formData.email)) {
    //   newErrors.email = "Veuillez entrer un email valide.";
    // }

    if (!formData.telephone || !phoneRegex.test(formData.telephone)) {
      newErrors.telephone = "Veuillez entrer un numéro de téléphone valide.";
    }

    if (
      !formData.dateNaissance ||
      !/\d{4}-\d{2}-\d{2}/.test(formData.dateNaissance)
    ) {
      newErrors.dateNaissance =
        "Veuillez entrer une date de naissance valide (yyyy-mm-dd).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  const isButtonDisabled = () => {
    return (
      !formData.prenom ||
      !formData.nom ||
      !formData.genre ||
      // !formData.email ||
      // !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email) ||
      !formData.telephone ||
      !/^[0-9]{10}$/.test(formData.telephone) ||
      !formData.dateNaissance ||
      !/\d{4}-\d{2}-\d{2}/.test(formData.dateNaissance)
    );
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Détails supplémentaires</Text>
      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={formData.prenom}
        onChangeText={(text) => setFormData({ ...formData, prenom: text })}
      />
      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={formData.nom}
        onChangeText={(text) => setFormData({ ...formData, nom: text })}
      />
      <Text style={styles.label}>Numéro de téléphone</Text>
      <TextInput
        style={[styles.input, errors.telephone && styles.inputError]}
        placeholder="Téléphone"
        keyboardType="phone-pad"
        value={formData.telephone}
        onChangeText={(text) => setFormData({ ...formData, telephone: text })}
      />
      {errors.telephone && (
        <Text style={styles.errorText}>{errors.telephone}</Text>
      )}

      <Text style={styles.label}>Genre</Text>
      <Dropdown
        style={[styles.input, styles.dropdown]}
        data={[
          { label: "Male", value: "Male" },
          { label: "Femelle", value: "Femelle" },
        ]}
        labelField="label"
        valueField="value"
        value={formData.genre}
        onChange={(item) => setFormData({ ...formData, genre: item.value })}
        placeholder="Sélectionner le genre"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {errors.genre && <Text style={styles.errorText}>{errors.genre}</Text>}

      <Text style={styles.label}>Date de naissance</Text>
      <TextInput
        style={[styles.input, errors.dateNaissance && styles.inputError]}
        placeholder="Date de naissance"
        value={formData.dateNaissance}
        onChangeText={(text) =>
          setFormData({ ...formData, dateNaissance: text })
        }
        keyboardType="default"
        maxLength={10} // Limiter à la longueur d'une date au format yyyy-mm-dd
      />
      {errors.dateNaissance && (
        <Text style={styles.errorText}>{errors.dateNaissance}</Text>
      )}

      <TouchableOpacity
        style={[styles.button, isButtonDisabled() && styles.disabledButton]}
        disabled={isButtonDisabled()}
        onPress={handleNextStep}
      >
        <Text style={styles.buttonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PageOneQuestionnaire;

const styles = StyleSheet.create({
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
  dropdown: {
    height: 50, // Ajuster la hauteur du Dropdown
    borderColor: "#7C00FF",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  inputError: {
    borderColor: "red",
  },
  button: {
    backgroundColor: "#7C00FF",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
