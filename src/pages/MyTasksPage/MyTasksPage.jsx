// Компонент завантажує мої завдання

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorMyTasks } from "../../redux/tasks/selectors";
import { selectFilteredMyTasks } from "../../redux/filters/selectors";
import { apiGetMyTasks } from "../../redux/tasks/operations";
import TasksContainer from "../../components/TasksContainer/TasksContainer";

const MyTasksPage = () => {
  const dispatch = useDispatch();
  const myTasksList = useSelector(selectorMyTasks); // завдання (без фільтрів)
  const myTasks = useSelector(selectFilteredMyTasks); // завдання (з фільтрами)

  useEffect(() => {
    // перевірка, чи список завдань вже був завантажений, щоб не dispatch санку кожного разу
    if (myTasksList.length === 0) {
      dispatch(apiGetMyTasks());
    }
  }, [dispatch, myTasksList.length]);

  const visibleTasks = myTasks;

  return <TasksContainer tasks={visibleTasks} />;
};

export default MyTasksPage;
