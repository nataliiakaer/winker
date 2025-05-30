import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/tasks/slice";
import css from "./AddTaskModalPage.module.css";
import { selectorAddTaskModal } from "../../redux/tasks/selectors";
import { useLocation, useNavigate } from "react-router-dom";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";

const AddTaskModalPage = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectorAddTaskModal);
  const navigate = useNavigate();
  const location = useLocation();

  // Зберігаємо попередній шлях у рефі, щоб не перевизначався при ререндері
  const previousPath = useRef(location.pathname);

  const openModal = () => {
    // Зберігаємо поточну сторінку, перед переходом
    previousPath.current = location.pathname;
    navigate("/tasks");
    dispatch(setModal(true));
  };

  const closeModal = () => {
    dispatch(setModal(false));
    // Повертаємося на попередню сторінку
    navigate(previousPath.current);
  };

  return (
    <div>
      <div title="Modal">
        <button className={css.btnNewTask} type="button" onClick={openModal}>
          + Нове завдання
        </button>
        {modal && <AddTaskModal closeModal={closeModal} />}
      </div>
    </div>
  );
};

export default AddTaskModalPage;
