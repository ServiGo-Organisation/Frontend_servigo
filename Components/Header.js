import React from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Header = ({ toggleSidebar, userInfos, getInitials }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
      <Ionicons name="menu" size={30} color="#6200ea" />
    </TouchableOpacity>

    <TouchableOpacity style={styles.rightIconButton}>
      <Image
        source={require("../assets/images/sg.png")}
        style={styles.rightIcon}
      />
    </TouchableOpacity>

    <TouchableOpacity style={styles.profileIconButton}>
      <View style={styles.profileIcon}>
        {userInfos?.userImage ? (
          <Image
            source={{ uri: userInfos.userImage }}
            style={styles.profilePhoto}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.profileInitialBackground}>
            <Text style={styles.profileInitial}>{getInitials()}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
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
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profilePhoto: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  profileInitialBackground: {
    backgroundColor: "#8a47fa",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  menuButton: {},
  profileIconButton: {},
  rightIconButton: {},
});

export default Header;
