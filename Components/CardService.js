import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const services = [
  {
    id: 1,
    title: "Plombier",
    subtitle: "+100 plombiers confirmés",
    icon: "construct",
    description:
      "Installation, réparation et entretien des systèmes de plomberie.",
    gradient: ["#8B5CF6", "#7C3AED"],
  },
  {
    id: 2,
    title: "Électricien",
    subtitle: "+100 Électriciens confirmés",
    icon: "flash",
    description:
      "Intervention sur les installations électriques domestiques et industrielles.",
    gradient: ["#A855F7", "#7C3AED"],
  },
  {
    id: 3,
    title: "Peintre",
    subtitle: "+100 Peintres confirmés",
    icon: "brush",
    description:
      "Travaux de peinture intérieure et extérieure, décoration murale.",
    gradient: ["#8B5CF6", "#A855F7"],
  },
  {
    id: 4,
    title: "Jardinier",
    subtitle: "+100 Jardiniers confirmés",
    icon: "leaf",
    description: "Entretien de jardins, taille, arrosage, plantations.",
    gradient: ["#7C3AED", "#8B5CF6"],
  },
  {
    id: 5,
    title: "Femme de ménage",
    subtitle: "+100 Femmes de ménage confirmées",
    icon: "sparkles",
    description: "Nettoyage, entretien, repassage, et ménage à domicile.",
    gradient: ["#A855F7", "#8B5CF6"],
  },
];

const CardService = () => {
  const [expandedCardId, setExpandedCardId] = useState(null);

  const toggleExpand = (id) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedCardId(expandedCardId === id ? null : id);
  };

  return (
    <View style={styles.listContainer}>
      {services.map((service) => {
        const isExpanded = expandedCardId === service.id;
        return (
          <TouchableOpacity
            key={service.id}
            style={styles.cardContainer}
            activeOpacity={0.95}
            onPress={() => toggleExpand(service.id)}
          >
            <LinearGradient
              colors={service.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.card, isExpanded && { paddingBottom: 24 }]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Ionicons name={service.icon} size={20} color="#8B5CF6" />
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{service.title}</Text>
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {isExpanded ? "Voir moins" : "Voir plus"}
                    </Text>
                  </View>
                </View>
              </View>

              <Text style={styles.cardSubtitle}>{service.subtitle}</Text>

              {isExpanded && (
                <Text style={styles.descriptionExpanded}>
                  {service.description}
                </Text>
              )}

              <TouchableOpacity style={styles.cardBtn}>
                <Text style={styles.cardBtnText}>On y va ?</Text>
              </TouchableOpacity>
            </LinearGradient>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
  },
  cardContainer: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  badge: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "500",
  },
  cardSubtitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 12,
  },
  descriptionExpanded: {
    color: "#fff",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 12,
  },
  cardBtn: {
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-end",
  },
  cardBtnText: {
    color: "#8B5CF6",
    fontWeight: "bold",
    fontSize: 13,
  },
});

export default CardService;
