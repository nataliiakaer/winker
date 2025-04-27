import { createSlice } from "@reduxjs/toolkit";

// Початковий стан
export const INITIAL_STATE = {
  tasksFilters: {
    status: [],
    wink_type: [],
    userRole: "",
    userId: null,
    dateType: "",
    dateFilter: {
      currentDay: false,
      from: null,
      to: null,
    },
  },
  myTasksFilters: {
    status: [],
    wink_type: [],
    userRole: "",
    userId: null,
    dateType: "",
    dateFilter: {
      currentDay: false,
      from: null,
      to: null,
    },
  },
  assignedTasksFilters: {
    status: [],
    wink_type: [],
    userRole: "",
    userId: null,
    dateType: "",
    dateFilter: {
      currentDay: false,
      from: null,
      to: null,
    },
  },
};

// Функції збереження в localStorage
const saveTasksFilters = (filters) => {
  try {
    localStorage.setItem("filters_tasks", JSON.stringify(filters));
  } catch (error) {
    console.warn("Failed to save tasksFilters", error);
  }
};
const saveMyTasksFilters = (filters) => {
  try {
    localStorage.setItem("filters_myTasks", JSON.stringify(filters));
  } catch (error) {
    console.warn("Failed to save myTasksFilters", error);
  }
};
const saveAssignedTasksFilters = (filters) => {
  try {
    localStorage.setItem("filters_assignedTasks", JSON.stringify(filters));
  } catch (error) {
    console.warn("Failed to save assignedTasksFilters", error);
  }
};

// Слайс
const filtersSlice = createSlice({
  name: "filters",
  initialState: INITIAL_STATE,
  reducers: {
    setStatus(state, action) {
      state.tasksFilters.status = action.payload;
      saveTasksFilters(state.tasksFilters);
    },
    setWinkType(state, action) {
      state.tasksFilters.wink_type = action.payload;
      saveTasksFilters(state.tasksFilters);
    },
    setUserRole(state, action) {
      state.tasksFilters.userRole = action.payload;
      saveTasksFilters(state.tasksFilters);
    },
    setUserId(state, action) {
      state.tasksFilters.userId = action.payload;
      saveTasksFilters(state.tasksFilters);
    },
    setDateType(state, action) {
      state.tasksFilters.dateType = action.payload;
      saveTasksFilters(state.tasksFilters);
    },
    setDateFilter(state, action) {
      state.tasksFilters.dateFilter = action.payload;
      saveTasksFilters(state.tasksFilters);
    },

    // myTasksFilters фільтри
    setMyTasksStatus(state, action) {
      state.myTasksFilters.status = action.payload;
      saveTasksFilters(state.myTasksFilters);
    },
    setMyTasksSWinkType(state, action) {
      state.myTasksFilters.wink_type = action.payload;
      saveTasksFilters(state.myTasksFilters);
    },
    setMyTasksSUserRole(state, action) {
      state.myTasksFilters.userRole = action.payload;
      saveTasksFilters(state.myTasksFilters);
    },
    setMyTasksSUserId(state, action) {
      state.myTasksFilters.userId = action.payload;
      saveTasksFilters(state.myTasksFilters);
    },
    setMyTasksSDateType(state, action) {
      state.myTasksFilters.dateType = action.payload;
      saveTasksFilters(state.myTasksFilters);
    },
    setMyTasksSDateFilter(state, action) {
      state.myTasksFilters.dateFilter = action.payload;
      saveTasksFilters(state.myTasksFilters);
    },

    // assignedTasksFilters фільтри
    setAssignedToMeStatus(state, action) {
      state.assignedTasksFilters.status = action.payload;
      saveTasksFilters(state.assignedTasksFilters);
    },
    setAssignedToMeWinkType(state, action) {
      state.assignedTasksFilters.wink_type = action.payload;
      saveTasksFilters(state.assignedTasksFilters);
    },
    setAssignedToMeUserRole(state, action) {
      state.assignedTasksFilters.userRole = action.payload;
      saveTasksFilters(state.assignedTasksFilters);
    },
    setAssignedToMeUserId(state, action) {
      state.assignedTasksFilters.userId = action.payload;
      saveTasksFilters(state.assignedTasksFilters);
    },
    setAssignedToMeDateType(state, action) {
      state.assignedTasksFilters.dateType = action.payload;
      saveTasksFilters(state.assignedTasksFilters);
    },
    setAssignedToMeDateFilter(state, action) {
      state.assignedTasksFilters.dateFilter = action.payload;
      saveTasksFilters(state.assignedTasksFilters);
    },

    // --- Очищення фільтрів ---
    resetTasksFilters(state) {
      state.tasksFilters = { ...INITIAL_STATE.tasksFilters };
      saveTasksFilters(state.tasksFilters);
    },
    resetMyTasksFilters(state) {
      state.myTasksFilters = { ...INITIAL_STATE.myTasksFilters };
      saveMyTasksFilters(state.myTasksFilters);
    },
    resetAssignedTasksFilters(state) {
      state.assignedTasksFilters = { ...INITIAL_STATE.assignedTasksFilters };
      saveAssignedTasksFilters(state.assignedTasksFilters);
    },
  },
});

export const {
  setStatus,
  setWinkType,
  setUserRole,
  setUserId,
  setDateType,
  setDateFilter,
  setMyTasksStatus,
  setMyTasksSWinkType,
  setMyTasksSUserRole,
  setMyTasksSUserId,
  setMyTasksSDateType,
  setMyTasksSDateFilter,
  setAssignedToMeStatus,
  setAssignedToMeWinkType,
  setAssignedToMeUserRole,
  setAssignedToMeUserId,
  setAssignedToMeDateType,
  setAssignedToMeDateFilter,
  resetTasksFilters,
  resetMyTasksFilters,
  resetAssignedTasksFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
