import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserLocation,
  getAllLocalisations,
} from "../Features/location/locationSlice";
import { getUserFromStorage } from "../Features/user/userSlice";
import logoUser from "../assets/images/logo_user.png";
import { url } from "../utils/axios";

const MapsPageReal = ({ navigation, route }) => {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState({
    latitude: 48.8566,
    longitude: 2.3522,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [selectedProvider, setSelectedProvider] = useState(null);

  const dispatch = useDispatch();
  const { localisations } = useSelector((state) => state.localisation);

  useEffect(() => {
    let intervalId;

    const fetchAndUpdateLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") return;

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);
        if (!route?.params?.selectedServiceId) {
          setRegion({
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }

        const user = await getUserFromStorage();
        const userId = user?.userId;
        if (userId) {
          dispatch(
            updateUserLocation({
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              userId,
            })
          );
        }
      } catch (err) {
        console.error("Erreur de localisation :", err);
      }
    };

    fetchAndUpdateLocation();
    dispatch(getAllLocalisations());

    intervalId = setInterval(() => {
      fetchAndUpdateLocation();
      dispatch(getAllLocalisations());
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleMarkerPress = (loc) => {
    const utilisateur = loc.utilisateur;
    console.log("utilisateursss :", utilisateur);

    const imageBaseUrl = `${url}/assets/userProfile/`;

    const avatarUrl =
      utilisateur.userImage && utilisateur.userImage.trim() !== ""
        ? utilisateur.userImage.startsWith("http")
          ? utilisateur.userImage
          : `${imageBaseUrl}${utilisateur.userImage}`
        : null;

    console.log("avatarUrl:", avatarUrl); // Pour debug

    setSelectedProvider({
      ...utilisateur,
      coordinate: {
        latitude: loc.latitude,
        longitude: loc.longitude,
      },
      service: utilisateur.service || "Service inconnu",
      avatar: avatarUrl ? { uri: avatarUrl } : logoUser,
      phone: utilisateur.telephone || "+212...",
      address: utilisateur.adresse || "Adresse inconnue",
      arrivalTime: "À proximité",
    });

    setRegion({
      latitude: loc.latitude,
      longitude: loc.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
  };

  const contactProvider = (provider, method) => {
    Alert.alert("Confirmation", `Voulez-vous ${method} ${provider.nom} ?`, [
      { text: "Annuler", style: "cancel" },
      {
        text: "Confirmer",
        onPress: () => {
          console.log(`${method} ${provider.nom} au ${provider.phone}`);
          Alert.alert("Succès", `${method} en cours...`);
        },
      },
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
      setSelectedProvider(null);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carte des Services</Text>
        <TouchableOpacity
          onPress={goToMyLocation}
          style={styles.locationButton}
        >
          <Ionicons name="locate" size={24} color="#8224E3" />
        </TouchableOpacity>
      </View>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton={false}
        showsCompass
        showsScale
      >
        {localisations.map((loc) => (
          <Marker
            key={loc.id}
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude,
            }}
            onPress={() => handleMarkerPress(loc)}
            pinColor="#5E17EB"
          />
        ))}
      </MapView>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: "green" }]} />
          <Text style={styles.legendText}>Prestataire</Text>
        </View>
      </View>

      {selectedProvider && (
        <View style={styles.bottomSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{selectedProvider.service}</Text>
          </View>
          <View style={styles.sheetRow}>
            <Image
              source={selectedProvider.avatar}
              style={styles.sheetAvatar}
              resizeMode="cover"
              onError={(e) =>
                console.log("Erreur chargement image:", e.nativeEvent.error)
              }
            />

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.sheetName}>{selectedProvider.nom}</Text>
              <Text style={styles.sheetRole}>{selectedProvider.service}</Text>
            </View>
            <TouchableOpacity
              style={styles.sheetCallButton}
              onPress={() => contactProvider(selectedProvider, "appeler")}
            >
              <Ionicons name="call" size={24} color="#8224E3" />
            </TouchableOpacity>
          </View>
          <View style={styles.sheetInfoRow}>
            <Ionicons name="location" size={18} color="#8224E3" />
            <Text style={styles.sheetInfoText}>{selectedProvider.address}</Text>
          </View>
          <View style={styles.sheetInfoRow}>
            <Ionicons name="time" size={18} color="#8224E3" />
            <Text style={styles.sheetInfoText}>
              {selectedProvider.arrivalTime}
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
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
  backButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  locationButton: { padding: 8 },
  map: { flex: 1 },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  legendItem: { flexDirection: "row", alignItems: "center" },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: { fontSize: 12, color: "#666" },
  bottomSheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
    borderTopWidth: 4,
    borderTopColor: "#8224E3",
    marginBottom: 80,
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  sheetTitle: { fontSize: 20, fontWeight: "bold", color: "#222" },
  sheetRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sheetAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#eee",
  },
  sheetName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 2,
  },
  sheetRole: { fontSize: 14, color: "#888" },
  sheetCallButton: {
    marginLeft: "auto",
    backgroundColor: "#f6f0fd",
    borderRadius: 20,
    padding: 8,
  },
  sheetInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  sheetInfoText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 8,
    flex: 1,
  },
});

export default MapsPageReal;
