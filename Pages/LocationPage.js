// screens/LocationPage.js
import React from "react";
import { View, StyleSheet } from "react-native";
import MapComponent from "../Components/MapComponent";
import ProfileCard from "../Components/ProfileCard";
const LocationPage = () => {
  return (
    <View style={styles.container}>
      <MapComponent />
      <ProfileCard />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LocationPage;
