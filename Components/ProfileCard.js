// components/ProfileCard.js
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ProfileCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Plombier</Text>
      <View style={styles.row}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.name}>John Smilga</Text>
          <Text style={styles.role}>plombier</Text>
        </View>
        <TouchableOpacity style={styles.callButton}>
          <Icon name="phone" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Icon name="location-on" size={20} />
        <Text>Address: xxxxxxxxxxxxxxxxxxxxxxx</Text>
      </View>
      <View style={styles.info}>
        <Icon name="schedule" size={20} />
        <Text>Time to be at ur house: xxxxxxxxxxxxx</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
  },
  role: {
    color: "gray",
  },
  callButton: {
    backgroundColor: "purple",
    padding: 10,
    borderRadius: 25,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
});

export default ProfileCard;
