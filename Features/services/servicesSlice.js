import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customFetch from "../../utils/axios";
import { getUserFromStorage } from "../user/userSlice";

// === Etat initial ===
const initialState = {
  services: [],
  isLoading: false,
  error: null,
};
// ===>ICI L'AJOUT AVEC L'IMAGE

// === Thunk pour ajouter un service ===
// export const addService = createAsyncThunk(
//   "services/addService",
//   async ({ service, imageUri }, thunkAPI) => {
//     try {
//       const formData = new FormData();
//       const accessToken = storedUser?.accessToken;

//       formData.append("service", JSON.stringify(service));

//       if (imageUri) {
//         const filename = imageUri.split("/").pop();
//         const match = /\.(\w+)$/.exec(filename);
//         const type = match ? `image/${match[1]}` : `image`;

//         formData.append("serviceImage", {
//           uri: imageUri,
//           name: filename,
//           type,
//         });
//       }

//       const response = await customFetch.post(
//         "/api/v1/services/addService",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`, // Utilisation de l'Access Token pour l'authentification
//           },
//           withCredentials: true, // Inclure les cookies si nécessaire
//         }
//       );

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data || "Erreur lors de l'ajout du service"
//       );
//     }
//   }
// );

export const addService = createAsyncThunk(
  "services/addService",
  async (service, thunkAPI) => {
    try {
      const storedUser = await getUserFromStorage();
      const accessToken = storedUser?.accessToken;

      const response = await customFetch.post(
        "/api/v1/services/addService",
        service, // JSON direct, comme dans Postman
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.log("Erreur backend :", error?.response?.data || error.message);
      return thunkAPI.rejectWithValue(
        error?.response?.data || "Erreur lors de l'ajout du service"
      );
    }
  }
);

export const getAllServices = createAsyncThunk(
  "services/getAllServices",
  async (_, thunkAPI) => {
    try {
      const storedUser = await getUserFromStorage();
      const accessToken = storedUser?.accessToken;
      const response = await customFetch.get(
        "/api/v1/services/getAllServices",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Utilisation de l'Access Token pour l'authentification
          },
          withCredentials: true, // Inclure les cookies si nécessaire
        }
      );
      console.log("this is the data");
      console.log(response.data);
      return response.data; // ou response.data.data selon API
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Erreur lors de la récupération des services"
      );
    }
  }
);

// === Slice ===
const servicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addService.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.isLoading = false;
        state.services.push(action.payload);
      })
      .addCase(addService.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getAllServices.pending, (state) => {
        console.log("getAllServices pending");
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllServices.fulfilled, (state, action) => {
        console.log("getAllServices fulfilled:", action.payload);
        state.isLoading = false;
        state.services = action.payload;
      })
      .addCase(getAllServices.rejected, (state, action) => {
        console.log("getAllServices rejected:", action.payload);
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default servicesSlice.reducer;
