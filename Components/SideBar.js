import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchUser, logoutUser, resetUser } from "../Features/user/userSlice"; // ← IMPORTANT

const Sidebar = ({ onClose }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { userInfos } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const menuItems = [
    { id: 1, title: "Acceuille", icon: "home", route: "Home" },
    { id: 2, title: "Recherche", icon: "search", route: "Search" },
    { id: 3, title: "Mes demandes", icon: "assignment", route: "Requests" },
    { id: 4, title: "Messages", icon: "chat", route: "Messages" },
    {
      id: 5,
      title: "Notifications",
      icon: "notifications",
      route: "Notifications",
    },
    { id: 6, title: "Mon Profil", icon: "person", route: "Profile" },
    {
      id: 7,
      title: "Paiements & Transactions",
      icon: "payment",
      route: "Payments",
    },
  ];

  const handleNavigation = (route) => {
    if (onClose) onClose();
    navigation.navigate(route);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.replace("Login");
  };

  const getInitials = () => {
    if (userInfos?.nom && userInfos?.prenom) {
      return userInfos.nom[0].toUpperCase() + userInfos.prenom[0].toUpperCase();
    } else if (userInfos?.nom) {
      return userInfos.nom[0].toUpperCase();
    }
    return "U";
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Profil utilisateur */}
        <View style={styles.profileContainer}>
          <View style={styles.profileImage}>
            {userInfos?.userImage ? (
              <Image
                source={{ uri: userInfos.userImage }}
                style={styles.profilePhoto}
                resizeMode="cover"
              />
            ) : (
              <Text style={styles.profileInitial}>{getInitials()}</Text>
            )}
          </View>
          <Text style={styles.profileName}>
            {userInfos?.nom && userInfos?.prenom
              ? `${userInfos.nom} ${userInfos.prenom}`
              : "Utilisateur"}
          </Text>
          <Text style={styles.profileRole}>
            {userInfos?.typeUtilisateur?.toLowerCase() || "visiteur"}
          </Text>
        </View>

        {/* Menu */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleNavigation(item.route)}
            >
              <Icon
                name={item.icon}
                size={24}
                color="#fff"
                style={styles.icon}
              />
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.footerItem}
            onPress={() => handleNavigation("Settings")}
          >
            <Icon name="settings" size={24} color="#fff" style={styles.icon} />
            <Text style={styles.menuText}>Paramètres</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon
              name="logout"
              size={20}
              color="#6200ee"
              style={styles.logoutIcon}
            />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: "100%",
    backgroundColor: "#6200ee",
  },
  scrollContainer: {
    flex: 1,
  },
  profileContainer: {
    padding: 20,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 40,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#8a47fa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    overflow: "hidden",
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
  },
  profileInitial: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileRole: {
    color: "#ffffffcc",
    fontSize: 14,
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 15,
  },
  menuText: {
    color: "#fff",
    fontSize: 16,
  },
  footerContainer: {
    marginTop: 100,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: "#6200ee",
    fontWeight: "bold",
  },
});

export default Sidebar;
