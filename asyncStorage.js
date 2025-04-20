import AsyncStorage from "@react-native-async-storage/async-storage";

export const addUserToStorage = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de l'utilisateur", error);
  }
};

export const removeUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur", error);
  }
};

export const getUserFromStorage = async () => {
  try {
    const result = await AsyncStorage.getItem("user");
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur", error);
    return null;
  }
};
