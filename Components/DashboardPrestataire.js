import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CardService from "./CardService";
import FormAddService from "./FormAddService";
import TableDisponibilitePrestataire from "./TableDisponibilitePrestataire";
import GreetingText from "./GreetingText";
import FooterNav from "./FooterNav";

const DashboardPrestataire = () => {
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // Simule l'ouverture du formulaire ou de la table selon l'action utilisateur
  // À relier à tes boutons ou navigation réelle

  return (
    <View style={styles.container}>
      {/* Liste des services */}
      <GreetingText />
      <CardService />
      {/* Popup d'ajout de service */}
      <FormAddService visible={showForm} onClose={() => setShowForm(false)} />
      {/* Table de disponibilité (affichée selon navigation) */}
      {showTable && <TableDisponibilitePrestataire />}
      <FooterNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f5fa" },
});

export default DashboardPrestataire;
