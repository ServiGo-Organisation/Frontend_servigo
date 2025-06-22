// components/MapComponent.js
import React from "react";
import { View, StyleSheet, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapComponent = () => {
  const markers = [
    { id: 1, lat: 48.8566, lng: 2.3522 },
    { id: 2, lat: 48.857, lng: 2.353 },
    { id: 3, lat: 48.858, lng: 2.351 },
  ];

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: 48.8566,
        longitude: 2.3522,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{ latitude: marker.lat, longitude: marker.lng }}
          pinColor="purple"
        />
      ))}
      <Marker coordinate={{ latitude: 48.8566, longitude: 2.3522 }}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
      </Marker>
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "60%",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export default MapComponent;
