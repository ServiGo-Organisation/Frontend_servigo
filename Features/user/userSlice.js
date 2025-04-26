import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Fonctions de gestion AsyncStorage
export const addUserToStorage = async (user) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.error("Erreur lors de l'ajout à AsyncStorage", error);
  }
};

export const removeUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.error("Erreur lors de la suppression d'AsyncStorage", error);
  }
};

export const getUserFromStorage = async () => {
  try {
    const result = await AsyncStorage.getItem("user");
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error("Erreur lors de la récupération depuis AsyncStorage", error);
    return null;
  }
};

const initialState = {
  isLoading: false,
  user: null,
  googleUser: null,
  error: null,
  isFinalUser: false,
  isGoogleLogin: false,
  profile: null,
};

// add user
export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post(
        "/api/v1/utilisateur/addUtilisateur",
        user
      );
      console.log("Réponse API signup :", resp.data);
      return resp.data;
    } catch (error) {
      console.error(
        "Erreur API signup :",
        error.response?.data || error.message
      );
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Un utilisateur avec cet email existe déjà."
      );
    }
  }
);
// LOGIN classique
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      console.error("Erreur API login:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Erreur login"
      );
    }
  }
);

// FETCH user (à modifier selon logique)
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    const storedUser = await getUserFromStorage();
    const userId = storedUser?.userId;

    if (!userId) {
      return thunkAPI.rejectWithValue("User ID introuvable");
    }

    try {
      const resp = await customFetch.get("/api/v1/utilisateur/user-info", {
        params: { userId },
        withCredentials: true,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Erreur fetch user"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  error: null,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      removeUserFromStorage(); // Nettoyage AsyncStorage
    },
    setGoogleLogin: (state) => {
      state.isGoogleLogin = true;
    },
    setNormalLogin: (state) => {
      state.isGoogleLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { accessToken } = payload;
        const decodedToken = jwtDecode(accessToken);
        const user = {
          nom: decodedToken.sub,
          roles: decodedToken.scope,
          userId: decodedToken.userId,
          accessToken: accessToken,
        };

        state.isLoading = false;
        state.user = user;
        addUserToStorage(user);
        state.isFinalUser = user.roles.includes("USER");
        console.log(`Connexion réussie : ${user.nom}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Erreur de login :", action.payload);
      })
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log("Inscription réussie :", payload);
        // Ici tu peux rediriger ou afficher un message de succès
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Erreur lors de l'inscription :", action.payload);
        state.error = action.payload;
      });
  },
});

export const { logoutUser, setGoogleLogin, setNormalLogin } = userSlice.actions;
export default userSlice.reducer;
