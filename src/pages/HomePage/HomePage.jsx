// Компонент завантажує всі завдання, тобто об'єднання "/tasks/my-tasks" та "/tasks/assigned-to-me" без дублікатів

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorAllTasks } from "../../redux/tasks/selectors";
import { selectFilteredAllTasks } from "../../redux/filters/selectors";
import { apiGetAllTasks } from "../../redux/tasks/operations";
import {
  selectorAuthIsLoggedIn,
  selectorAuthToken,
} from "../../redux/auth/selectors";
import { Navigate } from "react-router-dom";
import TasksContainer from "../../components/TasksContainer/TasksContainer";

const HomePage = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  const token = useSelector(selectorAuthToken);

  const allTasksList = useSelector(selectorAllTasks); // завдання (без фільтрів)
  const allTasks = useSelector(selectFilteredAllTasks); // завдання (з фільтрами)

  useEffect(() => {
    // перевірка, чи список завдань вже був завантажений, щоб не dispatch санку кожного разу
    if (allTasksList.length === 0 && token) {
      dispatch(apiGetAllTasks());
    }
  }, [dispatch, token, allTasksList.length]);

  const visibleTasks = allTasks;

  return isLoggedIn ? (
    <TasksContainer tasks={visibleTasks} />
  ) : (
    <Navigate to="/login_check" replace />
  );
};

export default HomePage;
