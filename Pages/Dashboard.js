import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Features/user/userSlice";
import { SideBar } from "../Components";

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user, isLoading, isFinalUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, [user, dispatch]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
    console.log("Sidebar toggled:", !sidebarVisible); // Debug
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Bouton d'ouverture du sidebar */}
        <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
          <Icon name="menu" size={24} color="#6200ee" />
        </TouchableOpacity>

        {/* Sidebar conditionnel */}
        {sidebarVisible && (
          <View style={styles.sidebarWrapper}>
            <View style={styles.sidebarContainer}>
              <SideBar onClose={() => setSidebarVisible(false)} />
              <TouchableOpacity
                style={styles.overlay}
                onPress={() => setSidebarVisible(false)}
              />
            </View>
          </View>
        )}

        {/* Contenu du Dashboard */}
        <View style={styles.content}>
          {isLoading ? (
            <Text style={styles.text}>Chargement...</Text>
          ) : (
            <>
              <Text style={styles.title}>Dashboard dialna</Text>
              <Text style={styles.text}>
                Bienvenue, {user?.nom || "Utilisateur"}!
              </Text>
              <Text style={styles.text}>
                ID de l'utilisateur : {user?.userId || "---"}
              </Text>
              {isFinalUser && (
                <Text style={styles.text}>Rôle : Utilisateur final</Text>
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    position: "relative",
  },
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    padding: 8,
  },
  sidebarWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 100,
  },
  sidebarContainer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6200ee",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
});

export default Dashboard;
