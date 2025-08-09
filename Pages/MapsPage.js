import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserLocation,
  getAllLocalisations,
} from "../Features/location/locationSlice";
import { getUserFromStorage } from "../Features/user/userSlice";

let MapView, Marker, PROVIDER_GOOGLE;
try {
  const Maps = require("react-native-maps");
  MapView = Maps.default;
  Marker = Maps.Marker;
  PROVIDER_GOOGLE = Maps.PROVIDER_GOOGLE;
} catch (error) {
  console.log("react-native-maps not available, using fallback");
}

const MapsPage = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const dispatch = useDispatch();
  const { localisations } = useSelector((state) => state.localisation);

  useEffect(() => {
    let intervalId;

    const updateLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        setRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        const user = await getUserFromStorage();
        const userId = user?.idUtilisateur;

        if (userId) {
          dispatch(
            updateUserLocation({
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              userId,
            })
          );
        }
      } catch (error) {
        console.error("Erreur de localisation:", error);
      }
    };

    updateLocation();
    dispatch(getAllLocalisations());
    intervalId = setInterval(() => {
      updateLocation();
      dispatch(getAllLocalisations());
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleMarkerPress = (loc) => {
    const utilisateur = loc.utilisateur;
    Alert.alert(
      `${utilisateur.nom} ${utilisateur.prenom}`,
      `Type: ${utilisateur.typeUtilisateur}`,
      [
        { text: "Annuler", style: "cancel" },
        { text: "Contacter", onPress: () => contactProvider(utilisateur) },
      ]
    );
  };

  const contactProvider = (utilisateur) => {
    Alert.alert("Contacter", `Voulez-vous contacter ${utilisateur.nom} ?`, [
      { text: "Annuler", style: "cancel" },
      { text: "Appeler", onPress: () => console.log("Appel en cours...") },
      { text: "Message", onPress: () => console.log("Message en cours...") },
    ]);
  };

  const goToMyLocation = () => {
    if (location) {
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  if (!MapView) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Carte des Services</Text>
        </View>
        <View style={styles.fallbackContainer}>
          <Ionicons name="map-outline" size={64} color="#8224E3" />
          <Text style={styles.fallbackTitle}>Carte indisponible</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carte des Services</Text>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={goToMyLocation}
        >
          <Ionicons name="locate" size={24} color="#8224E3" />
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass={true}
        showsScale={true}
      >
        {localisations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude,
            }}
            onPress={() => handleMarkerPress(loc)}
            pinColor="green"
          />
        ))}
      </MapView>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "green" }]} />
          <Text style={styles.legendText}>Prestataire</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
  map: {
    flex: 1,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  fallbackTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
});

export default MapsPage;
