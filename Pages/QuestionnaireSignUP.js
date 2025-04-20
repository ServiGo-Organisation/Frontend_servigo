import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PageOneQuestionnaire, PageTwoQuestionnaire } from "../Components";

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

  const renderStep = () => {
    switch (step) {
      case 1:
        return <PageOneQuestionnaire />;
      case 2:
        return <PageTwoQuestionnaire />;
      default:
        return <Text style={{ textAlign: "center" }}>Formulaire terminé</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>ServiGo</Text>

      <PaginationDots totalSteps={9} currentStep={step} />

      <View style={styles.formContainer}>
        {/* Flèche retour en haut à gauche */}
        {step > 1 && (
          <TouchableOpacity
            onPress={() => setStep(step - 1)}
            style={styles.backArrow}
          >
            <Text style={styles.arrowText}>←</Text>
          </TouchableOpacity>
        )}

        {renderStep()}

        {/* Bouton Suivant en bas */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (step < 9) setStep(step + 1);
          }}
        >
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>
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
  backArrow: {
    position: "absolute",
    top: 15,
    left: 15,
    zIndex: 10,
    padding: 5,
  },
  arrowText: {
    fontSize: 24,
    color: "#7C00FF",
  },
  button: {
    backgroundColor: "#7C00FF",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
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
