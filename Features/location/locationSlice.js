import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { getUserFromStorage } from "../user/userSlice";

// === État initial ===
const initialState = {
  localisations: [],
  isLoading: false,
  error: null,
};

// === Thunk : Ajouter ou mettre à jour une localisation ===
export const updateUserLocation = createAsyncThunk(
  "localisation/updateUserLocation",
  async ({ latitude, longitude, userId }, thunkAPI) => {
    try {
      const storedUser = await getUserFromStorage();
      const accessToken = storedUser?.accessToken;

      const response = await customFetch.post(
        "/api/localisation/update",
        {
          latitude,
          longitude,
          utilisateur: {
            idUtilisateur: userId,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ||
          "Erreur lors de la mise à jour de la localisation"
      );
    }
  }
);

// === Thunk : Récupérer toutes les localisations ===
export const getAllLocalisations = createAsyncThunk(
  "localisation/getAllLocalisations",
  async (_, thunkAPI) => {
    try {
      const storedUser = await getUserFromStorage();
      const accessToken = storedUser?.accessToken;

      const response = await customFetch.get("/api/localisation/all", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ||
          "Erreur lors de la récupération des localisations"
      );
    }
  }
);

// === Slice ===
const localisationSlice = createSlice({
  name: "localisation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // updateUserLocation
      .addCase(updateUserLocation.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateUserLocation.fulfilled, (state, action) => {
        state.isLoading = false;
        // Pas besoin d'ajouter dans localisations si on ne garde qu'une seule position par user
      })
      .addCase(updateUserLocation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // getAllLocalisations
      .addCase(getAllLocalisations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllLocalisations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.localisations = action.payload;
      })
      .addCase(getAllLocalisations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default localisationSlice.reducer;
