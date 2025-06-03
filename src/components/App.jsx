// Компонент Route дозволяє пов'язати певний URL з деяким компонентом. Значенням пропсу element може бути будь-який валідний JSX, але на практиці використовують лише компоненти.
// <Route> не може використовуватися без <Routes>, який обгортає групу маршрутів (навіть, якщо маршрут лише  один)

import { Route, Routes } from "react-router-dom";
import { lazy, useEffect } from "react";
import Layout from "./Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { apiRefreshUser } from "../redux/auth/operations";
import RestrictedRoute from "./RestrictedRoute";
import PrivateRoute from "./PrivateRoute";
import { selectorAuthIsRefreshing } from "../redux/auth/selectors";
import css from "./Loader/Loader.module.css";
import { Toaster } from "react-hot-toast";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const AddTaskModalPage = lazy(() =>
  import("../pages/AddTaskModalPage/AddTaskModalPage")
);
const MyTasksPage = lazy(() => import("../pages/MyTasksPage/MyTasksPage"));
const AssignedToMePage = lazy(() =>
  import("../pages/AssignedToMePage/AssignedToMePage")
);

const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));
const TasksDetailsPage = lazy(() =>
  import("../pages/TasksDetailsPage/TasksDetailsPage")
);
const TaskComments = lazy(() =>
  import("../components/TaskComments/TaskComments")
);
const TaskFiles = lazy(() => import("../components/TaskFiles/TaskFiles"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectorAuthIsRefreshing);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  if (isRefreshing)
    return (
      <p className={css.container}>
        Дані користувача оновлюються, будь ласка, зачекайте.
      </p>
    );

  return (
    <Layout>
      {/* Toast сповіщення */}
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/tasks"
          element={<PrivateRoute component={<AddTaskModalPage />} />}
        />
        <Route
          path="/tasks/my-tasks"
          element={<PrivateRoute component={<MyTasksPage />} />}
        />
        <Route
          path="/tasks/assigned-to-me"
          element={<PrivateRoute component={<AssignedToMePage />} />}
        />
        <Route
          path="/tasks/:id"
          element={<PrivateRoute component={<TasksDetailsPage />} />}
        >
          <Route path="comments" element={<TaskComments />} />
          <Route path="files" element={<TaskFiles />} />
        </Route>
        <Route
          path="/login_check"
          element={<RestrictedRoute component={<LoginPage />} />}
        />
        <Route path="*" element={<NotFoundPage />} /> // перехід за неіснуючим
        посиланням
      </Routes>
    </Layout>
  );
}

export default App;
