import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
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
          <div title="Modal">
            <div className={css.backdrop}>
              <div className={css.modal}>
                <UpdateTaskForm taskId={id} />
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
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TasksDetailsPage;
