// Компонент, де відображені завдання, фільтри, кнопка для додавання нового завдання.
// Використовується на трьох сторінках HomePage, MyTasksPage, AssignedToMePage

import { useDispatch, useSelector } from "react-redux";
import TasksList from "../TasksList/TasksList";
import css from "./TasksContainer.module.css";
import {
  selectorAddTaskModal,
  selectorTasksError,
  selectorTasksIsLoading,
} from "../../redux/tasks/selectors";
import Loader from "../Loader/Loader";
import TasksFilters from "../TasksFilters/TasksFilters";
import AddTaskModal from "../AddTaskModal/AddTaskModal";
import { setModal } from "../../redux/tasks/slice";
import ViewModeToggle from "../ViewModeToggle/ViewModeToggle";

const TasksContainer = ({ tasks }) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);

  const modal = useSelector(selectorAddTaskModal);

  const openModal = () => {
    dispatch(setModal(true));
  };

  const closeModal = () => {
    dispatch(setModal(false));
  };

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
        <ViewModeToggle />
        <TasksList tasks={tasks} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default TasksContainer;
