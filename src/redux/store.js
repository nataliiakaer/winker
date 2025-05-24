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
import { tasksListsReducer } from "./tasks/slice";
import { filtersReducer } from "./filters/slice";
import { usersReducer } from "./user/slice";
import { taskCommentsReducer } from "./comments/slice";
import { listViewModeReducer } from "./listViewMode/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const tasksPersistConfig = {
  key: "tasks",
  storage,
};

const filtersPersistConfig = {
  key: "filters",
  storage,
};

const listViewModeConfig = {
  key: 'viewMode',
  storage,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    tasks: persistReducer(tasksPersistConfig, tasksListsReducer), // Зберігаємо tasks!
    filters: persistReducer(filtersPersistConfig, filtersReducer),
    users: usersReducer,
    taskComments: taskCommentsReducer,
    listViewMode: persistReducer(listViewModeConfig, listViewModeReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // immutableCheck: false, // вимикає важку перевірку мутабельних даних - apiGetAllTasks
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
