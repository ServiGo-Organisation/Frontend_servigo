import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
const LoginButtons = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.createAccountText}>Crée un compte</Text>
      </TouchableOpacity>
      <View style={styles.signInContainer}>
        <Text style={styles.alreadyAccountText}>vous avez un compte ? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signInText}>log in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 4,
    paddingVertical: 12,
    marginBottom: 15,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#5E17EB",
    fontWeight: "900",
  },
  createAccountButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 25,
  },
  createAccountText: {
    color: "white",
    fontWeight: "500",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  alreadyAccountText: {
    color: "rgba(255, 255, 255, 0.7)",
  },
  signInText: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
});

export default LoginButtons;
