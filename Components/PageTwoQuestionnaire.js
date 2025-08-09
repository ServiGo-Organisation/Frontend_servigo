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
import * as ImagePicker from "expo-image-picker";

const PageTwoQuestionnaire = ({ formData, setFormData, setStep }) => {
  const [errors, setErrors] = useState({});

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

  const handlePickImage = async () => {
    try {
      // Demander les permissions d'abord
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission refusée pour accéder à la galerie');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Utiliser MediaTypeOptions au lieu de MediaType
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setFormData((prev) => ({ ...prev, photoUri: uri }));
      }
    } catch (error) {
      console.error('Erreur lors de la sélection d\'image:', error);
      alert('Erreur lors de la sélection d\'image');
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(3); // passe à la page 3 sans faire d'appel API
    }
  };

  return (
    <View>
      <View style={styles.center}>
        <View style={styles.container}>
          <View style={styles.avatar}>
            {formData.photoUri ? (
              <Image
                source={{ uri: formData.photoUri }}
                style={{ width: 90, height: 90, borderRadius: 45 }}
              />
            ) : (
              <Ionicons name="person" size={40} color="#fff" />
            )}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handlePickImage}>
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Infos de base</Text>
      </View>

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

      <TouchableOpacity style={styles.confirmButton} onPress={handleNext}>
        <Text style={styles.buttonText}>Suivant</Text>
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
  container: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    backgroundColor: "#7C00FF",
    width: 90,
    height: 90,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  addButton: {
    backgroundColor: "#7C00FF",
    width: 30,
    height: 30,
    borderRadius: 15,
    position: "absolute",
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
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
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
});
