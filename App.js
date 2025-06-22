import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  AccueillePage,
  Dashboard,
  LoadingPage,
  LoginPage,
  QuestionnaireSignUP,
  SignUpPage,
} from "./Pages";
import "react-native-gesture-handler";

// 👉 IMPORTS POUR REDUX
import { Provider } from "react-redux";
import { store } from "./store"; // Vérifie que l'importation du store est correcte

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);

  // Simuler un chargement de 2s avant de passer à l'app principale
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer style={styles.xxxx}>
        {/* Met à jour le style de la barre d'état ici */}
        <StatusBar style="auto" />
        {loading ? (
          // Afficher la page de chargement pendant 2s
          <LoadingPage />
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            {/* Définir les routes pour les pages */}
            <Stack.Screen name="Home" component={AccueillePage} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={QuestionnaireSignUP} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
