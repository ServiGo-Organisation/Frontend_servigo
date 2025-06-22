import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  PageOneQuestionnaire,
  PageTwoQuestionnaire,
  PageThreeQuestionnaire,
} from "../Components";
import { useDispatch } from "react-redux";
import { signUpUser } from "../Features/user/userSlice";
import { useNavigation } from "@react-navigation/native";

const PaginationDots = ({ totalSteps, currentStep }) => {
  return (
    <View style={dotStyles.container}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <View
          key={index}
          style={[
            dotStyles.dot,
            currentStep === index + 1 && dotStyles.activeDotWrapper,
          ]}
        >
          {currentStep === index + 1 && (
            <View style={dotStyles.activeDotInner} />
          )}
        </View>
      ))}
    </View>
  );
};

const QuestionnaireSignUP = () => {
  const [step, setStep] = useState(1);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    prenom: "",
    nom: "",
    email: "",
    motDePasse: "",
    confirmPassword: "",
    telephone: "",
    genre: "",
    dateNaissance: "",
    typeUtilisateur: "PRESTATAIRE",
    photoUri: null, // Si tu utilises photo
  });

  const handleSubmit = async () => {
    try {
      // Nettoyage si besoin (supprimer confirmPassword, etc)
      const userToSend = { ...formData, confirmPassword: null };
      await dispatch(
        signUpUser({ user: userToSend, imageUri: formData.photoUri })
      ).unwrap();
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erreur inscription:", error);
      alert("Erreur lors de l'inscription");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PageOneQuestionnaire
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <PageTwoQuestionnaire
            formData={formData}
            setFormData={setFormData}
            setStep={setStep}
          />
        );
      case 3:
        return (
          <PageThreeQuestionnaire
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            navigation={navigation}
          />
        );
      default:
        return <Text style={{ textAlign: "center" }}>Formulaire terminé</Text>;
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.logo}>ServiGo</Text>
            <PaginationDots totalSteps={3} currentStep={step} />
            <View style={styles.formContainer}>{renderStep()}</View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default QuestionnaireSignUP;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#7C00FF",
  },
  container: {
    flex: 1,
    backgroundColor: "#7C00FF",
    alignItems: "center",
    paddingTop: 60,
  },
  logo: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    padding: 20,
    marginTop: 30,
    position: "relative",
  },
});

const dotStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  activeDotWrapper: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  activeDotInner: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "#7C00FF",
  },
});
