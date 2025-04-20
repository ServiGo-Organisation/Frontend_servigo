import React from "react";
import { View, Text, TextInput, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PageOneQuestionnaire = () => {
  return (
    <View>
      <View style={styles.center}>
        <Image
          source={require("../assets/images/ServiGOLogoWhite.png")}
          style={styles.logo}
        />
        <Text style={styles.title}>Infos de base</Text>
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={20} color="#7C00FF" />
        <TextInput style={styles.input} placeholder="Email" />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#7C00FF" />
        <TextInput
          style={styles.input}
          placeholder="mot de passe"
          secureTextEntry
        />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#7C00FF" />
        <TextInput
          style={styles.input}
          placeholder="confirmer mot de passe"
          secureTextEntry
        />
      </View>
      <View style={styles.imageBottomLogo}>
        <Image
          source={require("../assets/images/InfobaseImage.jpg")}
          style={{ width: 180, height: 120 }}
        />
      </View>

      {/* <Image source={require("../assets/security.png")} style={styles.image} /> */}
    </View>
  );
};

export default PageOneQuestionnaire;

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
  input: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 20,
  },
  imageBottomLogo: {
    justifyContent: "center",
    alignItems: "center",
  },
});
