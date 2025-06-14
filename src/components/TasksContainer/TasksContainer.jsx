// Компонент, де відображені завдання, фільтри, кнопка для додавання нового завдання.
// Використовується на трьох сторінках HomePage, MyTasksPage, AssignedToMePage

import { useDispatch, useSelector } from "react-redux";
import TasksList from "../TasksList/TasksList";
import css from "./TasksContainer.module.css";
import {
  selectorTasksError,
  selectorTasksIsLoading,
} from "../../redux/tasks/selectors";
import Loader from "../Loader/Loader";
import TasksFilters from "../TasksFilters/TasksFilters";
import { setModal } from "../../redux/tasks/slice";
import ViewModeToggle from "../ViewModeToggle/ViewModeToggle";
import { useNavigate } from "react-router-dom";
import ButtonUpdateLists from "../ButtonUpdateLists/ButtonUpdateLists";

const TasksContainer = ({ tasks }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);
  const navigate = useNavigate();

  const openModal = () => {
    navigate("/tasks");
    dispatch(setModal(true));
  };

  return (
    <div className={css.pageWrapper}>
      <section className={css.btns}>
        <button className={css.btnNewTask} type="button" onClick={openModal}>
          + Нове завдання
        </button>
        <ButtonUpdateLists />
      </section>

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
