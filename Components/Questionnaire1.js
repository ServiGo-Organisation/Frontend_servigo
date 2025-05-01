import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import OnboardingDots from './OnboardingDots'; // Vérifie bien ce chemin

const Questionnaire1 = ({ navigation }) => {
  // États pour le changement de couleur au survol
  const [buttonColorPrestataire, setButtonColorPrestataire] = useState('#fff');
  const [buttonColorClient, setButtonColorClient] = useState('#fff');

  // Fonction pour détecter la plateforme
  const isDesktop = Platform.OS === 'web'; // Assure-toi d'utiliser React Native Web pour le support du web

  // Les événements de survol pour le web
  const handleMouseEnterPrestataire = () => {
    if (isDesktop) setButtonColorPrestataire('#6200EA');
  };

  const handleMouseLeavePrestataire = () => {
    if (isDesktop) setButtonColorPrestataire('#fff');
  };

  const handleMouseEnterClient = () => {
    if (isDesktop) setButtonColorClient('#6200EA');
  };

  const handleMouseLeaveClient = () => {
    if (isDesktop) setButtonColorClient('#fff');
  };

  return (
    <View style={styles.container}>
      {/* Titre (ServiGo) */}
      <Text style={styles.title}>ServiGo</Text>

      {/* Dots de navigation */}
      <View style={styles.dotsWrapper}>
        <OnboardingDots />
      </View>

      {/* Conteneur avec fond commun pour le logo, texte et boutons */}
      <View style={styles.mainContentContainer}>
        {/* Logo avec cercle violet comme fond */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/sg2.png')}
            style={styles.logo}
          />
        </View>

        {/* Question avec fond blanc et coins arrondis */}
        <View style={styles.questionContainer}>
          <Text style={styles.question}>Vous êtes :</Text>
        </View>

        {/* Boutons */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColorPrestataire }]}
          onPress={() => navigation.navigate('PrestataireScreen')}
          onPressIn={() => { if (!isDesktop) setButtonColorPrestataire('#6200EA'); }} // Mobile press effect
          onPressOut={() => { if (!isDesktop) setButtonColorPrestataire('#fff'); }} // Mobile press effect
          onMouseEnter={handleMouseEnterPrestataire} // Desktop hover effect
          onMouseLeave={handleMouseLeavePrestataire} // Desktop hover effect
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Notre prestataire de service</Text>
            <Image
              source={require('../assets/images/logo_prestataire.png')}
              style={styles.buttonLogo}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: buttonColorClient }]}
          onPress={() => navigation.navigate('ClientScreen')}
          onPressIn={() => { if (!isDesktop) setButtonColorClient('#6200EA'); }} // Mobile press effect
          onPressOut={() => { if (!isDesktop) setButtonColorClient('#fff'); }} // Mobile press effect
          onMouseEnter={handleMouseEnterClient} // Desktop hover effect
          onMouseLeave={handleMouseLeaveClient} // Desktop hover effect
        >
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Notre client</Text>
            <Image
              source={require('../assets/images/logo_user.png')}
              style={styles.buttonLogo}
            />
          </View>
        </TouchableOpacity>

        {/* Image sous les boutons */}
        <Image
          source={require('../assets/images/logo_quest1.png')}
          style={styles.logoImage}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6200EA',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  dotsWrapper: {
    height: 20,
    marginBottom: 90,
  },
  mainContentContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    height: 550,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  logoContainer: {
    backgroundColor: '#6200EA',
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  questionContainer: {
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  question: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 21,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    borderColor: '#000',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  logoImage: {
    width: 150,
    height: 150,
    marginTop: 20,
    resizeMode: 'contain',
  },
});

export default Questionnaire1;