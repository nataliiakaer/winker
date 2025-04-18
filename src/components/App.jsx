// Компонент Route дозволяє пов'язати певний URL з деяким компонентом. Значенням пропсу element може бути будь-який валідний JSX, але на практиці використовують лише компоненти.
// <Route> не може використовуватися без <Routes>, який обгортає групу маршрутів (навіть, якщо маршрут лише  один)

import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import Layout from "./Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { selectorAuthIsRefreshing } from "../redux/auth/selectors";
import { apiRefreshUser } from "../redux/auth/operations";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const TasksPage = lazy(() => import("../pages/TasksPage/TasksPage"));
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectorAuthIsRefreshing);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  if (isRefreshing) return <p>Оновлення користувача, будь ласка, зачекайте</p>;

  return (
    <>
      <Layout>
        <Routes>
          <Route path={"/"} element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          {/* <Route path="/tasks/{id}" element={<TasksPage />} /> */}
          <Route path="/login_check" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} /> // перехід за неіснуючим
          посиланням
        </Routes>
      </Layout>
    </>
  );
}

export default App;
