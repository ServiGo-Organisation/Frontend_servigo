import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import SideBar from "./SideBar"; // adapte selon ton dossier/components

const SidebarWrapper = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <View style={styles.sidebarWrapper}>
      <Pressable style={styles.sidebarOverlay} onPress={onClose}>
        <View style={styles.sidebarContainer}>
          <SideBar onClose={onClose} />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarWrapper: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 100,
  },
  sidebarOverlay: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sidebarContainer: {
    width: "70%",
    height: "100%",
    backgroundColor: "#fff",
  },
});

export default SidebarWrapper;
