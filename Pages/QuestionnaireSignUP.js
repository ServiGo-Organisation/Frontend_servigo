import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { PageOneQuestionnaire, PageTwoQuestionnaire } from "../Components";
import { useDispatch } from "react-redux";
import { signUpUser } from "../Features/user/userSlice";

// Dots de pagination stylés
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
  const dispatch = useDispatch(); // Pour envoyer les données au back-end

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
  });

  const handleSubmit = () => {
    dispatch(signUpUser(formData));
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
            handleSubmit={handleSubmit}
          />
        );
      default:
        return <Text style={{ textAlign: "center" }}>Formulaire terminé</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ServiGo</Text>

      <PaginationDots totalSteps={2} currentStep={step} />

      <View style={styles.formContainer}>{renderStep()}</View>
    </View>
  );
};

export default QuestionnaireSignUP;

// STYLES
const styles = StyleSheet.create({
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

// STYLES des dots
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
