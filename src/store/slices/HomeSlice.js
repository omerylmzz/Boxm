import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as SQLite from "expo-sqlite";

const HomeSlice = createSlice({
  name: "home",
  initialState: {
    data: [],
    isLoading: false,
    successful: false,
    message: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successful = true;
        state.message = "All collections are listed";
        state.data =
          action.payload.length % 2 === 0
            ? action.payload
            : [...action.payload, { id: "empty-placeholder", name: "empty" }];
      })
      .addCase(fetchCollections.rejected, (state) => {
        state.isLoading = false;
        state.successful = false;
        state.message = "An error occurred while listing collections";
      });
  },
});

export const fetchCollections = createAsyncThunk(
  "All Collections",
  async () => {
    try {
      const db = await SQLite.openDatabaseAsync("boxm.db");
      const results = await db.getAllAsync(`SELECT * FROM collections`);

      return results;
    } catch (error) {
      console.log("ALL COLLECTIONS ASYNC THUNK ERROR: ", error.message);
      throw error;
    }
  }
);

export default HomeSlice;
