/* Компонент BrowserRouter: Командний центр управління маршрутизацією, який приховує в собі всю логіку взаємодії із історією браузера. 
Створює маршуртизатор та об'єкт історії навігації, щоб синхронізувати інтерфейс із URL-адресою. 
Використовуючи React контекст передає інформацію про поточний стан історії навігації всім нащадкам. */

// Компонент Provider зв'язує стор з компонентами React, щоб вони могли отримувати доступ до його стану та методів.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
