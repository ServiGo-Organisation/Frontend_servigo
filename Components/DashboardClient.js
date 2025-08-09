import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { url } from "../utils/axios";

const DashboardClient = ({
  userInfos,
  isLoading,
  isFinalUser,
  services,
  navigation,
}) => {
  const getInitials = () => {
    if (userInfos?.nom && userInfos?.prenom) {
      return userInfos.nom[0].toUpperCase() + userInfos.prenom[0].toUpperCase();
    }
    return "U";
  };

  return (
    <ScrollView style={styles.content}>
      <View style={styles.welcomeSection}>
        {isLoading ? (
          <Text style={styles.text}>Chargement...</Text>
        ) : (
          <>
            <Text style={styles.greeting}>
              Bonjour {userInfos?.genre === "Male" ? "Mr" : "Mme"}
            </Text>
            <Text style={styles.userName}>
              {userInfos?.nom && userInfos?.prenom
                ? `${userInfos.nom} ${userInfos.prenom}`
                : "Utilisateur"}
            </Text>
            <Text style={styles.subtitle}>
              Besoin de services chez vous sans sortir ?
            </Text>
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

      {/* Bouton carte */}
      <TouchableOpacity
        style={styles.mapButton}
        onPress={() => navigation.navigate("Maps")}
      >
        <Ionicons name="map" size={24} color="#fff" />
        <Text style={styles.mapButtonText}>Voir la carte des services</Text>
      </TouchableOpacity>

      {/* Liste des services */}
      <Text style={styles.sectionTitle}>Nos Services</Text>
      <View style={styles.servicesGrid}>
        {services.length > 0 ? (
          services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() =>
                navigation.navigate("Maps", {
                  selectedServiceId: service.id,
                })
              }
            >
              <Image
                source={{
                  uri: `${url}/assets/servicesImages/${service.serviceImage}`,
                }}
                style={styles.serviceImage}
              />
              <LinearGradient
                colors={["transparent", "rgba(0,0,0,0.8)"]}
                style={styles.serviceTextOverlay}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              >
                <Text style={styles.serviceTitle}>{service.nom}</Text>
                <Text style={styles.serviceLink}>Voir plus →</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Aucun service disponible.</Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeSection: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  greeting: {
    fontSize: 18,
    color: "#333",
    marginBottom: 5,
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#8a47fa",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  userRole: {
    fontSize: 12,
    color: "#8a47fa",
    fontWeight: "bold",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  searchContainer: {
    position: "relative",
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#fff",
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    fontSize: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIconContainer: {
    position: "absolute",
    left: 15,
    top: 0,
    bottom: 0,
    justifyContent: "center",
  },
  searchIcon: {
    color: "#666",
  },
  mapButton: {
    backgroundColor: "#8a47fa",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3,
  },
  mapButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
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
    position: "relative",
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
  },
  serviceLink: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
    textAlign: "center",
  },
});

export default DashboardClient;
