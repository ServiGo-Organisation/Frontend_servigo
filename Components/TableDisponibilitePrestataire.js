import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const jours = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
const horaires = ['Matin', 'Midi', 'Après-midi', 'Soir'];
const dispo = [
  ['X', '', '', 'X', '', '', ''],
  ['', 'X', '', '', 'X', '', ''],
  ['', '', 'X', '', '', 'X', ''],
  ['', '', '', 'X', '', '', 'X'],
];

const typesServices = [
  'Débouchage',
  'Réparation WC',
  'Installation',
  'Recherche de fuite',
  'Débouchage évier',
  'Détection fuite',
];

const TableDisponibilitePrestataire = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Plombier</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Types de services proposés</Text>
        <View style={styles.tagsContainer}>
          {typesServices.map((type, idx) => (
            <View key={idx} style={styles.tag}>
              <Text style={styles.tagText}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disponibilités</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell} />
            {jours.map((j, idx) => (
              <View key={idx} style={styles.tableCell}><Text style={styles.tableHeader}>{j}</Text></View>
            ))}
          </View>
          {dispo.map((row, i) => (
            <View key={i} style={styles.tableRow}>
              <View style={styles.tableCell}><Text style={styles.tableHeader}>{horaires[i]}</Text></View>
              {row.map((cell, j) => (
                <View key={j} style={styles.tableCell}><Text style={styles.tableCellText}>{cell}</Text></View>
              ))}
            </View>
          ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Type de tarification :</Text>
        <View style={styles.tarifBlock}>
          <Text style={styles.tarifTitle}>Tarif horaire :</Text>
          <Text style={styles.tarifDesc}>Tarif basé sur l'heure pour les interventions, hors fournitures.</Text>
          <Text style={styles.tarifTitle}>Tarif forfaitaire :</Text>
          <Text style={styles.tarifDesc}>Tarif fixe pour une prestation donnée, convenu à l'avance.</Text>
          <Text style={styles.tarifTitle}>Sur devis :</Text>
          <Text style={styles.tarifDesc}>Tarif personnalisé discuté avec le client selon le besoin.</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Confirmer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f5fa' },
  header: { alignItems: 'center', marginTop: 24, marginBottom: 8 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#6200ee' },
  section: { marginHorizontal: 18, marginVertical: 10 },
  sectionTitle: { fontWeight: 'bold', color: '#6200ee', marginBottom: 6 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: {
    backgroundColor: '#e5d6fa',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { color: '#6200ee', fontSize: 13 },
  table: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, overflow: 'hidden' },
  tableRow: { flexDirection: 'row' },
  tableCell: { flex: 1, padding: 6, alignItems: 'center', justifyContent: 'center', borderRightWidth: 1, borderRightColor: '#eee', borderBottomWidth: 1, borderBottomColor: '#eee' },
  tableHeader: { fontWeight: 'bold', color: '#6200ee' },
  tableCellText: { color: '#333' },
  tarifBlock: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginTop: 8 },
  tarifTitle: { fontWeight: 'bold', color: '#6200ee', marginTop: 6 },
  tarifDesc: { color: '#333', fontSize: 13, marginLeft: 8 },
  button: { backgroundColor: '#6200ee', borderRadius: 8, margin: 24, paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default TableDisponibilitePrestataire;
