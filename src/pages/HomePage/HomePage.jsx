// Компонент завантажує всі завдання, тобто об'єднання "/tasks/my-tasks" та "/tasks/assigned-to-me"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { selectorAllTasks } from "../../redux/tasks/selectors";
// import { selectFilteredAllTasks } from "../../redux/filters/selectors";
// import { apiGetAllTasks } from "../../redux/tasks/operations";
import TasksContainer from "../../components/TasksContainer/TasksContainer";
import {
  apiGetMyTasks,
  apiGetTasksAssignedToMe,
} from "../../redux/tasks/operations";
import { selectFilteredAllTasks } from "../../redux/filters/selectors";
import {
  selectorMyTasks,
  selectorTasksAssidnedToMe,
} from "../../redux/tasks/selectors";

const HomePage = () => {
  const dispatch = useDispatch();
  const myTasksList = useSelector(selectorMyTasks); // завдання (без фільтрів)
  const assignedTasksList = useSelector(selectorTasksAssidnedToMe); // завдання (без фільтрів)
  const allTasksList = [...myTasksList, ...assignedTasksList]; // Об'єднуємо всі завдання в один масив

  // const myTasks = useSelector(selectFilteredMyTasks); // завдання (з фільтрами)
  // const assignedTasks = useSelector(selectFilteredAssignedTasks); // завдання (з фільтрами)
  // const allTasks = [...myTasks, ...assignedTasks]; // Об'єднуємо всі відфільтровані завдання в один масив
  const allTasks = useSelector(selectFilteredAllTasks); // завдання (з фільтрами)

  // Унікалізуємо за id, щоб не було дублікатів в списку. В інакшому разі виникне помилка
  const uniqueAllTasksList = Array.from(
    new Map(allTasksList.map((task) => [task.id, task])).values()
  );

  useEffect(() => {
    // перевірка, чи список завдань вже був завантажений, щоб не dispatch санку кожного разу
    if (uniqueAllTasksList.length === 0) {
      dispatch(apiGetMyTasks());
      dispatch(apiGetTasksAssignedToMe());
    }
  }, [dispatch, uniqueAllTasksList.length]);

  const visibleTasks = allTasks;

  // const allTasksList = useSelector(selectorAllTasks); // завдання (без фільтрів)
  // const allTasks = useSelector(selectFilteredAllTasks); // завдання (з фільтрами)

  // useEffect(() => {
  //   // перевірка, чи список завдань вже був завантажений, щоб не dispatch санку кожного разу
  //   if (allTasksList.length === 0) {
  //     dispatch(apiGetAllTasks());
  //   }
  // }, [dispatch, allTasksList.length]);

  // const visibleTasks = allTasks;

  return <TasksContainer tasks={visibleTasks} />;
};

export default HomePage;
