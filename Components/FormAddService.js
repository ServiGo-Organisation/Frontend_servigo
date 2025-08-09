import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';

const FormAddService = ({ visible, onClose, onSubmit }) => {
  const [intitule, setIntitule] = useState('');
  const [detail, setDetail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (intitule && detail) {
      setMessage('Service ajouté avec succès !');
      if (onSubmit) onSubmit({ intitule, detail });
    } else {
      setMessage('Veuillez remplir tous les champs.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Service introuvable ?{"\n"}Ajoute-le.</Text>
          <Text style={styles.label}>Intitulé du service</Text>
          <TextInput
            style={styles.input}
            placeholder="nom du service"
            value={intitule}
            onChangeText={setIntitule}
          />
          <Text style={styles.label}>Détail du service</Text>
          <TextInput
            style={[styles.input, { height: 60 }]}
            placeholder="Précise spécialité dans l&apos;intitulé !"
            value={detail}
            onChangeText={setDetail}
            multiline
          />
          {message ? <Text style={styles.message}>{message}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Vérification ...</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 22,
    alignItems: 'stretch',
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 18,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    backgroundColor: '#f7f5fa',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 8,
    paddingVertical: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  closeBtn: { alignItems: 'center', marginTop: 10 },
  closeText: { color: '#6200ee', fontSize: 14 },
  message: { color: '#4caf50', textAlign: 'center', marginVertical: 6 },
});

export default FormAddService;
