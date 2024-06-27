import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: sessionStorage.getItem("lang") || "ar",
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.lang = action.payload;
      sessionStorage.setItem("lang", action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
