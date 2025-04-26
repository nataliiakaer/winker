// Компонент авантажуж різні дані залежно від URL.

import { useDispatch, useSelector } from "react-redux";
import TasksList from "../../components/TasksList/TasksList";
import css from "./TasksPage.module.css";
import {
  selectorAllTasks,
  selectorMyTasks,
  selectorTasksAssidnedToMe,
  selectorTasksError,
  selectorTasksIsLoading,
} from "../../redux/tasks/selectors";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import {
  apiGetAllTasks,
  apiGetMyTasks,
  apiGetTasksAssignedToMe,
} from "../../redux/tasks/operations";
import { useLocation } from "react-router-dom";

const TasksPage = () => {
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);
  const allTasks = useSelector(selectorAllTasks);
  const myTasks = useSelector(selectorMyTasks);
  const assignedTasks = useSelector(selectorTasksAssidnedToMe);

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/tasks" && allTasks.length === 0) {
      dispatch(apiGetAllTasks());
    } else if (
      location.pathname === "/tasks/my-tasks" &&
      myTasks.length === 0
    ) {
      dispatch(apiGetMyTasks());
    } else if (
      location.pathname === "/tasks/assigned-to-me" &&
      assignedTasks.length === 0
    ) {
      dispatch(apiGetTasksAssignedToMe());
    }
  }, [
    dispatch,
    location.pathname,
    allTasks.length,
    myTasks.length,
    assignedTasks.length,
  ]);

  const getVisibleTasks = () => {
    if (location.pathname === "/tasks") {
      return allTasks;
    } else if (location.pathname === "/tasks/my-tasks") {
      return myTasks;
    } else if (location.pathname === "/tasks/assigned-to-me") {
      return assignedTasks;
    }
    return [];
  };

  const visibleTasks = getVisibleTasks();

  return (
    <div className={css.section}>
      {isLoading && <Loader />}
      {error && (
        <p style={{ color: "red" }}>
          {error}. Будь ласка, спробуйте перезавантажити сторінку!
        </p>
      )}
      <TasksList tasks={visibleTasks} isLoading={isLoading}/>
    </div>
  );
};

export default TasksPage;
