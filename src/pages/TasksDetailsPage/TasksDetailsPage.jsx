import { NavLink, Outlet, useParams } from "react-router-dom";
import Task from "../../components/Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiGetTaskDetails } from "../../redux/tasks/operations";
import {
  selectorTaskDetails,
  selectorTaskDetailsError,
  selectorTaskDetailsIsLoading,
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
  const isLoading = useSelector(selectorTaskDetailsIsLoading);
  const error = useSelector(selectorTaskDetailsError);

  console.log(id);

  useEffect(() => {
    if (!id) return;

    dispatch(apiGetTaskDetails(id));
  }, [id, dispatch]);

  console.log(taskDetails);

  return (
    <>
      {isLoading && <Loader />}
      {error ? (
        <p style={{ color: "red" }}>
          {error}. Будь ласка, спробуйте перезавантажити сторінку!
        </p>
      ) : (
        taskDetails?.id && (
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
            <div>
              <Outlet />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TasksDetailsPage;
