import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

const MapsPageSimple = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Données des prestataires de services
  const serviceProviders = [
    {
      id: 1,
      name: "Ahmed Plombier",
      service: "Plombier",
      rating: 4.8,
      distance: "0.5 km",
      address: "123 Rue de la Paix, Paris",
      available: true,
      phone: "+33 1 23 45 67 89",
    },
    {
      id: 2,
      name: "Marie Électricienne",
      service: "Électricien",
      rating: 4.9,
      distance: "1.2 km",
      address: "456 Avenue des Champs, Paris",
      available: true,
      phone: "+33 1 98 76 54 32",
    },
    {
      id: 3,
      name: "Jean Menuisier",
      service: "Menuisier",
      rating: 4.7,
      distance: "0.8 km",
      address: "789 Boulevard Saint-Germain, Paris",
      available: false,
      phone: "+33 1 11 22 33 44",
    },
    {
      id: 4,
      name: "Sophie Peintre",
      service: "Peintre",
      rating: 4.6,
      distance: "1.5 km",
      address: "321 Rue du Commerce, Paris",
      available: true,
      phone: "+33 1 55 66 77 88",
    },
    {
      id: 5,
      name: "Pierre Jardinier",
      service: "Jardinier",
      rating: 4.5,
      distance: "2.1 km",
      address: "654 Avenue de la République, Paris",
      available: true,
      phone: "+33 1 99 88 77 66",
    },
    {
      id: 6,
      name: "Claire Femme de ménage",
      service: "Femme de ménage",
      rating: 4.8,
      distance: "0.3 km",
      address: "987 Rue de Rivoli, Paris",
      available: true,
      phone: "+33 1 44 55 66 77",
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission d'accès à la localisation refusée");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const handleProviderPress = (provider) => {
    Alert.alert(
      provider.name,
      `${provider.service}\nAdresse: ${provider.address}\nNote: ${provider.rating}/5\nDistance: ${provider.distance}\nTéléphone: ${provider.phone}\nStatut: ${provider.available ? "Disponible" : "Indisponible"}`,
      [
        { text: "Annuler", style: "cancel" },
        { text: "Appeler", onPress: () => contactProvider(provider, "call") },
        { text: "Message", onPress: () => contactProvider(provider, "message") },
      ]
    );
  };

  const contactProvider = (provider, method) => {
    const action = method === "call" ? "appeler" : "envoyer un message à";
    Alert.alert(
      "Confirmation",
      `Voulez-vous ${action} ${provider.name} ?`,
      [
        { text: "Annuler", style: "cancel" },
        { 
          text: "Confirmer", 
          onPress: () => {
            console.log(`${method} ${provider.name} au ${provider.phone}`);
            Alert.alert("Succès", `${method === "call" ? "Appel" : "Message"} en cours...`);
          }
        },
      ]
    );
  };

  const filterProviders = (available) => {
    return serviceProviders.filter(provider => provider.available === available);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Prestataires de Services</Text>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="locate" size={24} color="#8224E3" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Section des prestataires disponibles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.sectionTitle}>Disponibles ({filterProviders(true).length})</Text>
          </View>
          {filterProviders(true).map((provider) => (
            <TouchableOpacity
              key={provider.id}
              style={styles.providerCard}
              onPress={() => handleProviderPress(provider)}
            >
              <View style={styles.providerHeader}>
                <View style={styles.providerInfo}>
                  <Text style={styles.providerName}>{provider.name}</Text>
                  <Text style={styles.providerService}>{provider.service}</Text>
                </View>
                <View style={styles.providerRating}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{provider.rating}</Text>
                </View>
              </View>
              <View style={styles.providerDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={14} color="#666" />
                  <Text style={styles.detailText}>{provider.address}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time" size={14} color="#666" />
                  <Text style={styles.detailText}>{provider.distance}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="call" size={14} color="#666" />
                  <Text style={styles.detailText}>{provider.phone}</Text>
                </View>
              </View>
              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => contactProvider(provider, "call")}
                >
                  <Ionicons name="call" size={16} color="#fff" />
                  <Text style={styles.actionButtonText}>Appeler</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.actionButton, styles.messageButton]}
                  onPress={() => contactProvider(provider, "message")}
                >
                  <Ionicons name="chatbubble" size={16} color="#8224E3" />
                  <Text style={[styles.actionButtonText, { color: "#8224E3" }]}>Message</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Section des prestataires indisponibles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="close-circle" size={20} color="#F44336" />
            <Text style={styles.sectionTitle}>Indisponibles ({filterProviders(false).length})</Text>
          </View>
          {filterProviders(false).map((provider) => (
            <TouchableOpacity
              key={provider.id}
              style={[styles.providerCard, styles.unavailableCard]}
              onPress={() => handleProviderPress(provider)}
            >
              <View style={styles.providerHeader}>
                <View style={styles.providerInfo}>
                  <Text style={[styles.providerName, styles.unavailableText]}>{provider.name}</Text>
                  <Text style={[styles.providerService, styles.unavailableText]}>{provider.service}</Text>
                </View>
                <View style={styles.providerRating}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>{provider.rating}</Text>
                </View>
              </View>
              <View style={styles.providerDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="location" size={14} color="#999" />
                  <Text style={[styles.detailText, styles.unavailableText]}>{provider.address}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time" size={14} color="#999" />
                  <Text style={[styles.detailText, styles.unavailableText]}>{provider.distance}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  locationButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 8,
  },
  providerCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  unavailableCard: {
    opacity: 0.6,
  },
  providerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  providerInfo: {
    flex: 1,
  },
  providerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  providerService: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  unavailableText: {
    color: "#999",
  },
  providerRating: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 4,
  },
  providerDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    fontSize: 13,
    color: "#666",
    marginLeft: 8,
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#8224E3",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 0.48,
    justifyContent: "center",
  },
  messageButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#8224E3",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 4,
  },
});

export default MapsPageSimple; 