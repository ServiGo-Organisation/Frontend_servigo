import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setNormalLogin } from "../Features/user/userSlice";

const LoginPage = ({ navigation }) => {
  //google stuff
  const handleGoogleLogin = async () => {
    const redirectUri = AuthSession.makeRedirectUri({
      scheme: "yourapp", // mettre ton propre schéma dans app.json si tu veux
    });

    const authUrl = `${BACKEND_URL}/oauth2/authorization/google?redirect_uri=${encodeURIComponent(
      redirectUri
    )}`;

    const result = await AuthSession.startAsync({ authUrl });

    if (result.type === "success") {
      // Appel API pour récupérer token après login
      try {
        const response = await fetch(`${BACKEND_URL}/auth/profile`, {
          method: "GET",
          credentials: "include",
        });

        const token = await response.text();

        if (token) {
          // Enregistrer token localement
          await AsyncStorage.setItem(
            "user",
            JSON.stringify({ accessToken: token, auth: "google" })
          );
          // Rediriger l'utilisateur où tu veux
          console.log("Connexion réussie !");
        }
      } catch (error) {
        console.error("Erreur récupération token :", error);
      }
    } else {
      console.log("Login annulé ou échoué");
    }
  };
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    setError(""); // Reset error message before validation

    // Check if email and password are entered
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Add simple validation for email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
      setError("L'email est invalide.");
      return;
    }

    dispatch(setNormalLogin());
    dispatch(loginUser({ email, motDePasse: password }))
      .unwrap()
      .then(() => {
        navigation.navigate("Dashboard");
      })
      .catch((error) => {
        console.log("Erreur de connexion:", error.response?.data || error);
        setError("Erreur de connexion, veuillez réessayer.");
      });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Text style={styles.title}>Log IN</Text>

      <View style={styles.whiteContainer}>
        <Text style={styles.logo}>
          <Text style={{ fontWeight: "bold" }}>Servi</Text>
          <Text style={{ color: "#5E17EB", fontWeight: "bold" }}>Go</Text>
        </Text>

        <Text style={styles.loginText}>Login</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#5E17EB" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#5E17EB" />
          <TextInput
            placeholder="Mot de passe"
            placeholderTextColor="#aaa"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#5E17EB"
            />
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>
            {isLoading ? "Connexion..." : "Se connecter"}
          </Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <Text style={styles.signInText}>
          Vous n'avez pas de compte ?{" "}
          <Text
            style={{ color: "#5E17EB", fontWeight: "bold" }}
            onPress={() => navigation.navigate("Register")}
          >
            S'inscrire
          </Text>
        </Text>

        {/* Display Email and Password */}

        {/* Footer */}
        <Text style={styles.footer}>© ServiGo 2025</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    backgroundColor: "#5E17EB",
    alignItems: "center",
    justifyContent: "flex-end",
    minHeight: "100vh",
  },
  whiteContainer: {
    backgroundColor: "#FFF",
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: "center",
    elevation: 10,
  },
  title: {
    position: "absolute",
    top: 0,
    left: 0,
    marginLeft: "8%",
    marginTop: "25%",
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 28,
  },
  logo: {
    fontSize: 30,
    textAlign: "center",
    marginBottom: 50,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#5E17EB",
    borderRadius: 10,
    paddingHorizontal: 15,
    width: "100%",
    height: 50,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: "100%",
    color: "#333",
    marginLeft: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    fontWeight: "bold",
  },
  forgotPassword: {
    alignSelf: "flex-end",
    color: "#5E17EB",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#5E17EB",
    paddingVertical: 15,
    width: "100%",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  loginText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signInText: {
    marginTop: 10,
    color: "#5E17EB",
  },
  footer: {
    marginTop: "auto",
    color: "#aaa",
    fontSize: 13,
    textAlign: "center",
    padding: 10,
  },
  displayContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  displayText: {
    color: "#333",
    fontSize: 14,
    marginVertical: 5,
  },
});

export default LoginPage;
