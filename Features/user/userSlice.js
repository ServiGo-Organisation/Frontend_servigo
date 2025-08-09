import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

// === Fonctions de gestion AsyncStorage ===
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

// === État initial ===
const initialState = {
  isLoading: false,
  user: null,
  userInfos: null,
  googleUser: null,
  error: null,
  isFinalUser: false,
  isGoogleLogin: false,
  profile: null,
  // uploadedPhoto: null,
};

// SIGN UP
export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async ({ user, imageUri }, thunkAPI) => {
    try {
      const formData = new FormData();

      // Ajouter le JSON utilisateur en string
      formData.append("utilisateur", JSON.stringify(user));

      // Ajouter l'image si elle existe
      if (imageUri) {
        const filename = imageUri.split("/").pop();
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        formData.append("userImage", {
          uri: imageUri,
          name: filename,
          type,
        });
      }

      const resp = await customFetch.post(
        "/api/v1/utilisateur/addUtilisateur",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return resp.data;
    } catch (error) {
      console.error(
        "Erreur API signup:",
        error.response?.data || error.message
      );
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Erreur lors de l'inscription";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (user, thunkAPI) => {
    try {
      const resp = await customFetch.post("/auth/login", user);
      return resp.data;
    } catch (error) {
      console.error("Erreur API login:", error.response?.data || error.message);
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Erreur de connexion";
      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

// FETCH USER INFOS
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const storedUser = await getUserFromStorage(); // Récupérer l'utilisateur depuis AsyncStorage
      const userId = storedUser?.userId;
      const accessToken = storedUser?.accessToken; // Récupérer le token d'accès

      if (!userId || !accessToken) {
        return thunkAPI.rejectWithValue("User ID ou Access Token introuvable");
      }
      // Ajout du header Authorization avec le Bearer Token
      const resp = await customFetch.get(
        `/api/v1/utilisateur/user-info?idUtilisateur=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Utilisation de l'Access Token pour l'authentification
          },
          withCredentials: true, // Inclure les cookies si nécessaire
        }
      );

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.msg || "Erreur fetch user"
      );
    }
  }
);

// export const uploadImage = createAsyncThunk(
//   "user/uploadImage",
//   async (fileUri, thunkAPI) => {
//     try {
//       const formData = new FormData();

//       // Assure-toi que l'uri commence par file://
//       const uri = fileUri.startsWith("file://") ? fileUri : `file://${fileUri}`;

//       formData.append("file", {
//         uri,
//         name: "photo.jpg",
//         type: "image/jpeg",
//       });

//       const resp = await customFetch.post(
//         "/api/v1/utilisateur/uploadPhoto",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       return resp.data; // Nom du fichier retourné par le backend
//     } catch (error) {
//       console.error(
//         "Erreur API upload :",
//         error.response?.data || error.message
//       );
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Erreur upload"
//       );
//     }
//   }
// );

// === Slice utilisateur ===
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.userInfos = null;
      state.isFinalUser = false;
      removeUserFromStorage();
    },
    setGoogleLogin: (state) => {
      state.isGoogleLogin = true;
    },
    setNormalLogin: (state) => {
      state.isGoogleLogin = false;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
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
        state.isFinalUser = Array.isArray(user.roles)
          ? user.roles.includes("USER")
          : String(user.roles).includes("USER");

        addUserToStorage(user);
        console.log(`Connexion réussie : ${user.nom}`);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error("Erreur de login :", action.payload);
      })

      // SIGNUP
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        console.log("Inscription réussie :", payload);
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        console.error("Erreur lors de l'inscription :", action.payload);
      })
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfos = action.payload;
        state.isFinalUser =
          action.payload.typeUtilisateur === "PRESTATEUR_CLIENT";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = true;
        state.message = action.payload || "Erreur inconnue";
        console.log("rejcted");
      });
    // .addCase(uploadImage.pending, (state) => {
    //   state.isLoading = true;
    //   state.error = null;
    // })
    // .addCase(uploadImage.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   // state.uploadedPhoto = action.payload; // nom de fichier
    // })
    // .addCase(uploadImage.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload;
    // });
  },
});

export const { logoutUser, setGoogleLogin, setNormalLogin, resetError } =
  userSlice.actions;

export default userSlice.reducer;
