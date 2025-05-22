import { NavLink, Outlet, useParams } from "react-router-dom";
import Task from "../../components/Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiGetTaskDetails } from "../../redux/tasks/operations";
import {
  selectorTaskDetails,
  selectorTasksError,
  selectorTasksIsLoading,
} from "../../redux/tasks/selectors";
import Loader from "../../components/Loader/Loader";
import css from "./TasksDetailsPage.module.css";
import clsx from "clsx";

const activeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const TasksDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const taskDetails = useSelector(selectorTaskDetails);
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);

  useEffect(() => {
    if (!id) return;
    dispatch(apiGetTaskDetails(id));
  }, [id, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {error ? (
        <p style={{ color: "red" }}>
          {error}. Будь ласка, спробуйте перезавантажити сторінку!
        </p>
      ) : (
        taskDetails !== null && (
          <div>
            Task id {id}
            <div className={css.taskDatailContainer}>
              <Task task={taskDetails} />
            </div>
            <ul className={css.list}>
              <li>
                <NavLink className={activeLinkClass} to="comments">
                  Коментарі
                </NavLink>
              </li>
              <li>
                <NavLink className={activeLinkClass} to="files">
                  Файли
                </NavLink>
              </li>
            </ul>
            <Outlet />
          </div>
        )
      )}
    </>
  );
};

export default TasksDetailsPage;
