// Сторінка з відображення форми конкретного завдання, його коментарів та файлів

import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { apiGetTaskDetails } from "../../redux/tasks/operations";
import {
  selectorTaskDetails,
  selectorTasksError,
  selectorTasksIsLoading,
} from "../../redux/tasks/selectors";
import clsx from "clsx";
import Loader from "../../components/Loader/Loader";
import UpdateTaskForm from "../../components/UpdateTaskForm/UpdateTaskForm";
import css from "./TasksDetailsPage.module.css";

const activeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const TasksDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const backLocationRef = useRef(location.state?.from ?? "/");

  const taskDetails = useSelector(selectorTaskDetails);
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);

  useEffect(() => {
    if (!id) return;
    dispatch(apiGetTaskDetails(id));
  }, [id, dispatch]);

  const closeModal = () => {
    navigate(backLocationRef.current);
  };

  if (isLoading || !taskDetails || taskDetails.id !== Number(id)) {
    return <Loader />;
  }

  return (
    <>
      {error ? (
        <p style={{ color: "red" }}>
          {error}. Будь ласка, спробуйте перезавантажити сторінку!
        </p>
      ) : (
        <div title="Modal">
          <div className={css.backdrop}>
            <div className={css.modal}>
              <UpdateTaskForm closeModal={closeModal} />
              <ul className={css.list}>
                <li>
                  <NavLink className={activeLinkClass} to="comments">
                    Показати коментарі
                  </NavLink>
                </li>
                <li>
                  <NavLink className={activeLinkClass} to="files">
                    Показати файли
                  </NavLink>
                </li>
              </ul>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TasksDetailsPage;
