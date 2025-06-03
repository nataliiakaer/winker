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
// import { IoIosArrowDown } from "react-icons/io";
// import { IoIosArrowUp } from "react-icons/io";

const activeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const TasksDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const taskDetails = useSelector(selectorTaskDetails);
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);

  // const [showBlock, setShowSlock] = useState(false);

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
                <UpdateTaskForm />
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
                {/* <div className={css.block}>
                  <div
                    className={`${css.link} ${showBlock ? css.active : ""}`}
                    onClick={() => setShowSlock((prev) => !prev)}
                  ></div>

                  {showBlock && <div className={css.popup}></div>}
                </div> */}
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TasksDetailsPage;
