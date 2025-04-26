import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux"; // pour récupérer l'erreur Redux

const PageTwoQuestionnaire = ({ formData, setFormData, handleSubmit }) => {
  const [errors, setErrors] = useState({});
  const { error } = useSelector((state) => state.user); // erreur globale

  useEffect(() => {
    if (error) {
      // Vérifie si error est un objet et contient une réponse avec un message
      const errorMessage =
        error || formData.response?.data || "Erreur inconnue";

      setErrors((prevErrors) => ({
        ...prevErrors,
        email: errorMessage, // Ajoute le message d'erreur pour le champ email
      }));
    }
  }, [error]);

  const validateForm = () => {
    const newErrors = {};

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide.";
    }

    if (!formData.motDePasse || formData.motDePasse.length < 6) {
      newErrors.motDePasse =
        "Le mot de passe doit contenir au moins 6 caractères.";
    }

    if (formData.motDePasse !== formData.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  const isPasswordMismatch =
    formData.motDePasse !== formData.confirmPassword || !formData.motDePasse;

  return (
    <View>
      <View style={styles.center}>
        <Image
          source={require("../assets/images/ServiGOLogoWhite.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Infos de base</Text>
      </View>

      {/* Email input */}
      <View style={[styles.inputBox, errors.email && styles.inputBoxError]}>
        <Ionicons name="mail-outline" size={20} color="#7C00FF" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          autoCapitalize="none"
        />
      </View>
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      {/* Password input */}
      <View
        style={[styles.inputBox, errors.motDePasse && styles.inputBoxError]}
      >
        <Ionicons name="lock-closed-outline" size={20} color="#7C00FF" />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry
          value={formData.motDePasse}
          onChangeText={(text) =>
            setFormData({ ...formData, motDePasse: text })
          }
        />
      </View>
      {errors.motDePasse && (
        <Text style={styles.errorText}>{errors.motDePasse}</Text>
      )}

      {/* Confirm Password input */}
      <View
        style={[
          styles.inputBox,
          errors.confirmPassword && styles.inputBoxError,
        ]}
      >
        <Ionicons name="lock-closed-outline" size={20} color="#7C00FF" />
        <TextInput
          style={styles.input}
          placeholder="Confirmer mot de passe"
          secureTextEntry
          value={formData.confirmPassword}
          onChangeText={(text) =>
            setFormData({ ...formData, confirmPassword: text })
          }
        />
      </View>
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      {/* Bottom Image */}
      <View style={styles.imageBottomLogo}>
        <Image
          source={require("../assets/images/InfobaseImage.jpg")}
          style={{ width: 180, height: 120 }}
        />
      </View>

      {/* Confirmation Button */}
      <TouchableOpacity
        style={[
          styles.confirmButton,
          isPasswordMismatch && styles.disabledButton,
        ]}
        onPress={handleFormSubmit}
        disabled={isPasswordMismatch}
      >
        <Text style={styles.buttonText}>Confirmer</Text>
      </TouchableOpacity>
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
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#7C00FF",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  inputBoxError: {
    borderColor: "red",
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: "#7C00FF",
    paddingVertical: 12,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  imageBottomLogo: {
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
