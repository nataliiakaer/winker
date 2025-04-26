import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  status: "all", // all, completed, not_completed
  urgency: [], // ["slow", "fast", "very_fast"]
  userRole: "", // responsible або creator
  userId: null, // ID користувача, якщо обрано
  dateType: "creation", // creation або deadline
  dateFilter: {
    currentDay: false,
    from: null,
    to: null,
  },
  applied: false,
};

const filtersSlice = createSlice({
  name: "tasks",
  initialState: INITIAL_STATE,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    setUrgency(state, action) {
      state.urgency = action.payload;
    },
    setUserRole(state, action) {
      state.userRole = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    setDateType(state, action) {
      state.dateType = action.payload;
    },
    setDateFilter(state, action) {
      state.dateFilter = action.payload;
    },
    applyFilters(state) {
      state.applied = true;
    },
    resetFilters() {
      return INITIAL_STATE;
    },
  },
});

export const {
  setStatus,
  setUrgency,
  setUserRole,
  setUserId,
  setDateType,
  setDateFilter,
  applyFilters,
  resetFilters,
} = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
