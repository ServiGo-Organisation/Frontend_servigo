import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
const services = [
  {
    id: "1",
    title: "Plombier",
    image: require("../assets/images/plombier.jpg"),
  },
  {
    id: "2",
    title: "Électricien",
    image: require("../assets/images/electricien.jpg"),
  },
  {
    id: "3",
    title: "Menuisier",
    image: require("../assets/images/menuisier.jpeg"),
  },
  {
    id: "4",
    title: "Peintre",
    image: require("../assets/images/peintre.webp"),
  },
  {
    id: "5",
    title: "Femme de ménage",
    image: require("../assets/images/menage.jpg"),
  },
  {
    id: "6",
    title: "Jardinier",
    image: require("../assets/images/jardinier.jpg"),
  },
  { id: "7", title: "Vitrier", image: require("../assets/images/plombier.jpg") },
  {
    id: "8",
    title: "Cours particuliers",
    image: require("../assets/images/professeur.png"),
  },
  {
    id: "9",
    title: "Coiffeur à domicile",
    image: require("../assets/images/coiffeur.jpg"),
  },
  {
    id: "10",
    title: "Coach sportif",
    image: require("../assets/images/coach.jpg"),
  },
];

const ServicesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
        <Ionicons name="menu" size={30} color="#6200ea" />
      </TouchableOpacity>

      {/* Icône supplémentaire à droite de l'icône du sidebar */}
      <TouchableOpacity style={styles.rightIconButton}>
        <Image
          source={require("../assets/images/sg.png")}
          style={styles.rightIcon}
        />
      </TouchableOpacity>

      {/* Icône de photo de profil à droite de l'icône SG */}
      <TouchableOpacity style={styles.profileIconButton}>
        <Image
          source={require("../assets/images/UserHasNoPicture.png")}
          style={styles.profileIcon}
        />
      </TouchableOpacity>

      {/* Contenu principal */}
      <View style={styles.contentContainer}>
        {/* Titre */}
        <Text style={styles.title}>Salam !</Text>
        <Text style={styles.title}>Salma Hamidallah</Text>

        <Text style={styles.subtitle}>
          Besoin de services chez vous sans sortir ?
        </Text>

        {/* Barre de recherche */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Recherche"
            placeholderTextColor="#999"
          />
          <View style={styles.searchIconContainer}>
            <Ionicons name="search" size={24} style={styles.searchIcon} />
          </View>
        </View>

        {/* Liste des services */}
        <ScrollView
          contentContainerStyle={styles.listContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.grid}>
            {services.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card}>
                <Image source={item.image} style={styles.image} />

                <View style={styles.textOverlay}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.link}>Savoir plus &gt;</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {isSidebarOpen && (
        <View style={styles.sidebar}>
          <Text style={styles.sidebarText}>Sidebar Menu</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  menuButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  rightIconButton: {
    position: "absolute",
    top: 40,
    right: 185, // Positionner à droite
    zIndex: 10,
  },
  profileIconButton: {
    position: "absolute",
    top: 40,
    right: 30, // Positionner encore plus à droite
    zIndex: 10,
  },
  rightIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "cover",
    borderWidth: 2,
    borderColor: "#6200ea",
    backgroundColor: "#fff", // Vous pouvez également ajouter une couleur de fond, si vous le souhaitez
  },
  contentContainer: {
    flex: 1,
    paddingTop: 90,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchInput: {
    flex: 1,
    color: "#333",
    paddingVertical: 8,
  },
  searchIconContainer: {
    backgroundColor: "#6200ea",
    borderRadius: 5,
    padding: 5,
  },
  searchIcon: {
    color: "white",
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    position: "relative",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  textOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  link: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: "#fff",
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 5,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});

export default ServicesPage;
