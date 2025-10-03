import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  AccueillePage,
  Dashboard,
  LoadingPage,
  LoginPage,
  QuestionnaireSignUP,
  MapsPageReal,
} from "./Pages";

// 👉 REDUX
import { Provider } from "react-redux";
import { store } from "./store";

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // 🔑 On vérifie si un utilisateur est stocké
        const userData = await AsyncStorage.getItem("user");
        const user = userData ? JSON.parse(userData) : null;

        if (user?.accessToken) {
          setInitialRoute("Dashboard");
        } else {
          setInitialRoute("Home");
        }
      } catch (err) {
        console.error("Erreur lors de la vérification du login :", err);
        setInitialRoute("Home");
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={AccueillePage} />
          <Stack.Screen name="Login" component={LoginPage} />
          <Stack.Screen name="Register" component={QuestionnaireSignUP} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Maps" component={MapsPageReal} />
        </Stack.Navigator>
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
