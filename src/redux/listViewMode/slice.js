//list — режим списку (повна ширина елемента)
//grid — режим плитки (по два елементи в рядку)

import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  listViewMode: "list", // або 'grid'
};

const listViewModeSlice = createSlice({
  name: "listViewMode",
  initialState: INITIAL_STATE,
  reducers: {
    setViewMode: (state, action) => {
      state.listViewMode = action.payload;
    },
  },
});

export const { setViewMode } = listViewModeSlice.actions;
export const listViewModeReducer = listViewModeSlice.reducer;
