import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
  BackHandler,
  StyleSheet,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, logoutUser } from "../Features/user/userSlice";
import { DashboardClient, DashboardPrestataire, SideBar } from "../Components";
import { getAllServices } from "../Features/services/servicesSlice";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

const Dashboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { userInfos, isLoading, isFinalUser } = useSelector(
    (state) => state.user
  );

  const { services } = useSelector((state) => state.services);

  useEffect(() => {
    if (userInfos === null) {
      navigation.replace("Login");
    }
  }, [userInfos]);

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(getAllServices());
  }, [dispatch]);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setShowLogoutModal(true);
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  const handleLogout = () => {
    setShowLogoutModal(false);
    dispatch(logoutUser());
    navigation.replace("Login");
  };

  const getInitials = () => {
    if (userInfos?.nom && userInfos?.prenom) {
      return userInfos.nom[0].toUpperCase() + userInfos.prenom[0].toUpperCase();
    }
    return "U";
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Modal déconnexion */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Déconnexion</Text>
            <Text style={styles.modalMessage}>
              Souhaitez-vous vraiment vous déconnecter ?
            </Text>
            <View style={styles.modalButtonsRow}>
              <Pressable style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Déconnexion</Text>
              </Pressable>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.cancelButtonText}>Annuler</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
            <Ionicons name="menu" size={30} color="#6200ea" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightIconButton}>
            <Image
              source={require("../assets/images/sg.png")}
              style={styles.rightIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileIconButton}>
            <View style={styles.profileIcon}>
              {userInfos?.userImage ? (
                <Image
                  source={{ uri: userInfos.userImage }}
                  style={styles.profilePhoto}
                  resizeMode="cover"
                />
              ) : (
                <View style={styles.profileInitialBackground}>
                  <Text style={styles.profileInitial}>{getInitials()}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        </View>

        {/* Sidebar avec overlay */}
        {sidebarVisible && (
          <View style={styles.sidebarWrapper}>
            <TouchableOpacity
              style={styles.sidebarOverlay}
              onPress={() => setSidebarVisible(false)}
            >
              <View style={styles.sidebarContainer}>
                <SideBar onClose={() => setSidebarVisible(false)} />
              </View>
            </TouchableOpacity>
          </View>
        )}

        {userInfos?.typeUtilisateur === "PRESTATAIRE" ? (
          <DashboardPrestataire />
        ) : (
          <DashboardClient
            userInfos={userInfos}
            isLoading={isLoading}
            isFinalUser={isFinalUser}
            services={services}
            navigation={navigation}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { flex: 1, position: "relative" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rightIcon: { width: 40, height: 40, resizeMode: "contain" },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profilePhoto: { width: "100%", height: "100%", borderRadius: 20 },
  profileInitialBackground: {
    backgroundColor: "#8a47fa",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  sidebarWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 100,
  },
  sidebarOverlay: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sidebarContainer: { width: "70%", height: "100%", backgroundColor: "#fff" },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    width: "80%",
    alignItems: "center",
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: "#444",
    marginBottom: 24,
    textAlign: "center",
  },
  modalButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  logoutButton: {
    flex: 1,
    backgroundColor: "#5E17EB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginRight: 8,
  },
  logoutButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  cancelButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#5E17EB",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  cancelButtonText: { color: "#5E17EB", fontWeight: "bold", fontSize: 16 },
  menuButton: {},
  rightIconButton: {},
  profileIconButton: {},
});

export default Dashboard;
