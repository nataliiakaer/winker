// Компонент авантажуж різні дані залежно від URL.

import { useDispatch, useSelector } from "react-redux";
import TasksList from "../../components/TasksList/TasksList";
import css from "./TasksPage.module.css";
import {
  selectorAllTasks,
  selectorAddTaskModal,
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
import TasksFilters from "../../components/TasksFilters/TasksFilters";
import {
  selectFilteredAllTasks,
  selectFilteredAssignedTasks,
  selectFilteredMyTasks,
} from "../../redux/filters/selectors";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";
import { setModal } from "../../redux/tasks/task.js";

const TasksPage = () => {
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);

  // завдання (без фільтрів)
  const allTasksRaw = useSelector(selectorAllTasks);
  const myTasksRaw = useSelector(selectorMyTasks);
  const assignedTasksRaw = useSelector(selectorTasksAssidnedToMe);

  // завдання (з фільтрами)
  const allTasks = useSelector(selectFilteredAllTasks);
  const myTasks = useSelector(selectFilteredMyTasks);
  const assignedTasks = useSelector(selectFilteredAssignedTasks);

  const dispatch = useDispatch();
  const location = useLocation();

  const modal = useSelector(selectorAddTaskModal);

  const openModal = () => {
    dispatch(setModal(true));
  };

  const closeModal = () => {
    dispatch(setModal(false));
  };

  useEffect(() => {
    localStorage.setItem("lastVisitedTab", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (location.pathname === "/tasks") {
        if (allTasksRaw.length === 0) {
          await dispatch(apiGetAllTasks());
        }
      } else if (location.pathname === "/tasks/my-tasks") {
        if (myTasksRaw.length === 0) {
          await dispatch(apiGetMyTasks());
        }
      } else if (location.pathname === "/tasks/assigned-to-me") {
        if (assignedTasksRaw.length === 0) {
          await dispatch(apiGetTasksAssignedToMe());
        }
      }
    };

    fetchTasks();
  }, [
    dispatch,
    location.pathname,
    allTasksRaw.length,
    myTasksRaw.length,
    assignedTasksRaw.length,
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
    <div className={css.pageWrapper}>
      <div title="Modal">
        <button className={css.btnNewTask} type="button" onClick={openModal}>
          + Нове завдання
        </button>
        {modal && <AddTaskModal closeModal={closeModal} />}
      </div>
      <TasksFilters />
      <div className={css.contentWrapper}>
        {isLoading && <Loader />}
        {error && (
          <p style={{ color: "red" }}>
            {error}. Будь ласка, спробуйте перезавантажити сторінку!
          </p>
        )}
        <TasksList tasks={visibleTasks} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default TasksPage;
