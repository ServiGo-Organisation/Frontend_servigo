// components/FooterNav.js

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const FooterNav = () => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerBtn}>
        <Ionicons name="home" size={22} color="#6200ee" />
        <Text style={styles.footerText}>Accueil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerBtn}>
        <Ionicons name="chatbubble-ellipses-outline" size={22} color="#aaa" />
        <Text style={styles.footerTextInactive}>Messages</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerBtn}>
        <Ionicons name="notifications-outline" size={22} color="#aaa" />
        <Text style={styles.footerTextInactive}>Notifications</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerBtn}>
        <Ionicons name="person-outline" size={22} color="#aaa" />
        <Text style={styles.footerTextInactive}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  footerBtn: { alignItems: "center" },
  footerText: { color: "#6200ee", fontSize: 12, marginTop: 2 },
  footerTextInactive: { color: "#aaa", fontSize: 12, marginTop: 2 },
});

export default FooterNav;
