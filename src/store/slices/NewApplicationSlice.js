import { createSlice } from "@reduxjs/toolkit";
import ApplicationSettingData from "../../constants/ApplicationSettingData";

const NewApplicationSlice = createSlice({
  name: "newApplication",
  initialState: {
    data: ApplicationSettingData,
  },
  reducers: {
    toggleSwitch(state, action) {
      if (state.data[action.payload.id - 1].selected) {
        state.data[action.payload.id - 1].selected = false;
      } else {
        state.data[action.payload.id - 1].selected = true;
      }
    },
    increaseCounter(state) {
      if (state.data[5].count < 3) {
        state.data[5].count += 1;
      }
    },
    decreaseCounter(state) {
      if (state.data[5].count > 1) {
        state.data[5].count -= 1;
      }
    },
  },
});

export const { toggleSwitch, increaseCounter, decreaseCounter } =
  NewApplicationSlice.actions;

export default NewApplicationSlice;
