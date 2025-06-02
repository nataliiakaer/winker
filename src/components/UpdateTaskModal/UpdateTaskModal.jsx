import css from "./UpdateTaskModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setModal } from "../../redux/tasks/slice";
import { IoClose } from "react-icons/io5";
import { NavLink, Outlet, useNavigate, useParams } from "react-router-dom";
import Task from "../Task/Task";
import { selectorTaskDetails } from "../../redux/tasks/selectors";
import { apiGetTaskDetails } from "../../redux/tasks/operations";
import clsx from "clsx";

const activeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const UpdateTaskModal = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskDetails = useSelector(selectorTaskDetails);

  useEffect(() => {
    if (!id) return;
    dispatch(apiGetTaskDetails(id));
  }, [id, dispatch]);

  const closeModal = () => {
    dispatch(setModal(false));
    navigate(-1);
  };

  return (
    <div className={css.backdrop}>
      <div className={css.modal}>
        <button className={css.submitBtn} type="submit">
          Зберегти
        </button>
        <button
          className={css.closeModalBtn}
          type="button"
          aria-label="Close modal button"
          onClick={closeModal}
        >
          <IoClose />
        </button>
        {taskDetails !== null && (
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
        )}
        {/* <Task /> */}
        {/* <Formik
        // initialValues={initialValues}
        // validationSchema={validationSchema}
        // onSubmit={handleSubmit}
        >
          {() => (
            <Form className={css.container}>
              <Task />
            </Form>
          )}
        </Formik> */}
      </div>
    </div>
  );
};

export default UpdateTaskModal;
