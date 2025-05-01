import React, { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../Features/user/userSlice";
import { SideBar } from "../Components";

const services = [
  { id: "1", title: "Plombier", image: require("../assets/images/plombier.jpg") },
  { id: "2", title: "Électricien", image: require("../assets/images/electricien.jpg") },
  { id: "3", title: "Menuisier", image: require("../assets/images/menuisier.jpeg") },
  { id: "4", title: "Peintre", image: require("../assets/images/peintre.webp") },
  { id: "5", title: "Femme de ménage", image: require("../assets/images/menage.jpg") },
  { id: "6", title: "Jardinier", image: require("../assets/images/jardinier.jpg") },
  { id: "7", title: "Vitrier", image: require("../assets/images/menuisier.jpeg") },
  { id: "8", title: "Cours particuliers", image: require("../assets/images/professeur.png") },
  { id: "9", title: "Coiffeur à domicile", image: require("../assets/images/coiffeur.jpg") },
  { id: "10", title: "Coach sportif", image: require("../assets/images/coach.jpg") },
];
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
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header avec menu et icônes */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
            <Ionicons name="menu" size={30} color="#6200ea" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.rightIconButton}>
            <Image source={require("../assets/images/sg.png")} style={styles.rightIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileIconButton}>
            <Image
              source={user?.photo ? { uri: user.photo } : require("../assets/images/coach.jpg")}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Sidebar */}
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

        {/* Contenu principal */}
        <ScrollView style={styles.content}>
          {/* Section Bienvenue */}
          <View style={styles.welcomeSection}>
            {isLoading ? (
              <Text style={styles.text}>Chargement...</Text>
            ) : (
              <>
                <Text style={styles.greeting}>Salam !</Text>
                <Text style={styles.userName}>{user?.nom || "Utilisateur"}</Text>
                {isFinalUser && (
                  <Text style={styles.userRole}>Utilisateur final</Text>
                )}
              </>
            )}
          </View>

          {/* Barre de recherche */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher un service..."
              placeholderTextColor="#999"
            />
            <View style={styles.searchIconContainer}>
              <Ionicons name="search" size={24} style={styles.searchIcon} />
            </View>
          </View>

          {/* Section Services */}
          <Text style={styles.sectionTitle}>Nos Services</Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => (
             <TouchableOpacity key={service.id} style={styles.serviceCard}>
               <Image source={service.image} style={styles.serviceImage} />
               <LinearGradient
                 colors={['transparent', 'rgba(0,0,0,0.8)']}
                 style={styles.serviceTextOverlay}
                 start={{ x: 0, y: 0 }}
                 end={{ x: 0, y: 1 }}
               >
                 <Text style={styles.serviceTitle}>{service.title}</Text>
                 <Text style={styles.serviceLink}>Voir plus →</Text>
               </LinearGradient>
             </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
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
  menuButton: {},
  rightIconButton: {},
  profileIconButton: {},
  rightIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#6200ea",
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
    paddingHorizontal: 15,
  },
  welcomeSection: {
    marginBottom: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  userName: {
    fontSize: 24,
    fontWeight: "600",
    color: "#6200ea",
    marginTop: 5,
  },
  userRole: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 25,
    height: 50,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    color: "#333",
  },
  searchIconContainer: {
    backgroundColor: "#6200ea",
    borderRadius: 5,
    padding: 8,
  },
  searchIcon: {
    color: "white",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    marginTop: 10,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
serviceCard: {
  width: "48%",
  backgroundColor: "#fff",
  marginBottom: 15,
  borderRadius: 10,
  overflow: "hidden",
  elevation: 3,
  position: "relative", // Ajoutez ceci
},
  serviceImage: {
    width: "100%",
    height: 120,
  },
serviceTextOverlay: {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0,0,0,0.4)",
},
serviceTitle: {
  fontSize: 16,
  fontWeight: "bold",
  color: "#fff",
  textAlign: "center",
  textShadowColor: "rgba(0,0,0,0.5)",
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 3,
},
serviceLink: {
  fontSize: 14,
  color: "#fff",
  marginTop: 5,
  textAlign: "center",
  textShadowColor: "rgba(0,0,0,0.5)",
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
}
});

export default Dashboard;