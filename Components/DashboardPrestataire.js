import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import CardService from "./CardService";
import FormAddService from "./FormAddService";
import TableDisponibilitePrestataire from "./TableDisponibilitePrestataire";
import GreetingText from "./GreetingText";
import FooterNav from "./FooterNav";
import ButtonAddServicePrestataire from "./ButtonAddServicePrestataire";
import { addService } from "../Features/services/servicesSlice";
import { useDispatch } from "react-redux";

const DashboardPrestataire = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // Fonction pour ajouter le service
  const handleAddService = async ({ intitule, detail }) => {
    try {
      await dispatch(
        addService({
          nom: intitule, // ← mapping correct
          description: detail, // ← mapping correct
          prestateur: { idUtilisateur: 2 }, // à remplacer par ton id réel
        })
      ).unwrap();
    } catch (error) {
      console.log("Erreur ajout service:", error);
      throw error; // pour que le formulaire affiche le message
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <GreetingText />

        <CardService />

        <ButtonAddServicePrestataire onPress={() => setShowForm(true)} />

        {showTable && <TableDisponibilitePrestataire />}
      </ScrollView>

      <FormAddService
        visible={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleAddService} // <-- ajouté ici
      />

      <FooterNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f5fa" },
  scrollContent: {
    paddingBottom: 100,
  },
  addButtonContainer: {
    alignItems: "center",
    marginVertical: 16,
  },
});

export default DashboardPrestataire;
