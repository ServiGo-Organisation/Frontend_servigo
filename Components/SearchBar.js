import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const SearchBar = ({
  placeholder = "Search for services...",
  value,
  onChangeText,
  onPressFilter,
  onPressLocation,
  selectedLocation,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={onPressFilter} style={styles.filterButton}>
          <Icon name="filter-variant" size={20} color="#8224E3" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.locationButton} onPress={onPressLocation}>
        <Icon name="map-marker" size={20} color="#8224E3" />
        <View style={styles.locationTextContainer}>
          <TextInput
            style={styles.locationText}
            placeholder="Select location"
            value={selectedLocation ? selectedLocation.title : ""}
            editable={false}
            placeholderTextColor="#999"
          />
        </View>
        <Icon name="chevron-down" size={20} color="#8224E3" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
    color: "#333",
  },
  filterButton: {
    padding: 6,
  },
  locationButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    backgroundColor: "#fafafa",
  },
  locationTextContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  locationText: {
    fontSize: 14,
    color: "#333",
  },
});

export default SearchBar;
