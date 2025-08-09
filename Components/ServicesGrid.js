import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { url } from "../utils/axios";

const ServicesGrid = ({ services, navigation }) => (
  <>
    <Text style={styles.sectionTitle}>Nos Services</Text>
    <View style={styles.servicesGrid}>
      {services.length > 0 ? (
        services.map((service) => (
          <TouchableOpacity
            key={service.id}
            style={styles.serviceCard}
            onPress={() =>
              navigation.navigate("Maps", { selectedServiceId: service.id })
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
  </>
);

const styles = StyleSheet.create({
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

export default ServicesGrid;
