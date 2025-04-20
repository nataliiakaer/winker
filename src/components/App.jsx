// Компонент Route дозволяє пов'язати певний URL з деяким компонентом. Значенням пропсу element може бути будь-який валідний JSX, але на практиці використовують лише компоненти.
// <Route> не може використовуватися без <Routes>, який обгортає групу маршрутів (навіть, якщо маршрут лише  один)

import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import Layout from "./Layout/Layout";
import { useDispatch } from "react-redux";
import { apiRefreshUser } from "../redux/auth/operations";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const TasksPage = lazy(() => import("../pages/TasksPage/TasksPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/tasks"
            element={<PrivateRoute component={<TasksPage />}></PrivateRoute>}
          />
          {/* <Route path="/tasks/{id}" element={<TasksDetailsPage />} /> */}
          <Route
            path="/login_check"
            element={<RestrictedRoute component={<LoginPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} /> // перехід за неіснуючим
          посиланням
        </Routes>
      </Layout>
    </>
  );
}

export default App;
