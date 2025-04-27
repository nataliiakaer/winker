// Стор це об'єкт, який містить глобальний стан додатка, та декілька методів для взаємодії з ним, наприклад доступу до стану.
// Єдиним аргументом очікує об'єкт параметрів та налаштовує деякі корисні інструменти розробки як частина процесу створення стора.

// Стору обов’язково потрібно передати властивість reducer - функцію із логікою зміни стану Redux.

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth/slice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { tasksReducer } from "./tasks/slice";
import { filtersReducer, INITIAL_STATE } from "./filters/slice";
import { usersReducer } from "./user/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const loadTasksFilters = () => {
  try {
    const serialized = localStorage.getItem("filters_tasks");
    if (!serialized || serialized === "undefined" || serialized === "{}")
      return undefined;
    return JSON.parse(serialized);
  } catch (error) {
    console.warn("Failed to load tasksFilters from localStorage", error);
    return undefined;
  }
};

const loadMyTasksFilters = () => {
  try {
    const serialized = localStorage.getItem("filters_myTasks");
    if (!serialized || serialized === "undefined" || serialized === "{}")
      return undefined;
    return JSON.parse(serialized);
  } catch (error) {
    console.warn("Failed to load myTasksFilters from localStorage", error);
    return undefined;
  }
};

const loadAssignedTasksFilters = () => {
  try {
    const serialized = localStorage.getItem("filters_assignedTasks");
    if (!serialized || serialized === "undefined" || serialized === "{}")
      return undefined;
    return undefined;
  } catch (error) {
    console.warn(
      "Failed to load assignedTasksFilters from localStorage",
      error
    );
    return undefined;
  }
};

const preloadedFilters = {
  tasksFilters: loadTasksFilters() || INITIAL_STATE.tasksFilters,
  myTasksFilters: loadMyTasksFilters() || INITIAL_STATE.myTasksFilters,
  assignedTasksFilters:
    loadAssignedTasksFilters() || INITIAL_STATE.assignedTasksFilters,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    tasks: tasksReducer,
    filters: filtersReducer,
    users: usersReducer,
  },
  preloadedState: {
    filters: preloadedFilters,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
