import { useParams } from "react-router-dom";
// import Task from "../../components/Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiGetTaskDetails } from "../../redux/tasks/operations";
import {
  // selectorAddTaskModal,
  selectorTaskDetails,
  selectorTasksError,
  selectorTasksIsLoading,
} from "../../redux/tasks/selectors";
import Loader from "../../components/Loader/Loader";
// import css from "./TasksDetailsPage.module.css";
// import clsx from "clsx";
import UpdateTaskModal from "../../components/UpdateTaskModal/UpdateTaskModal";

// const activeLinkClass = ({ isActive }) => {
//   return clsx(css.link, isActive && css.active);
// };

const TasksDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const modal = useSelector(selectorAddTaskModal);

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
            <UpdateTaskModal />
          </div>
        )
      )}

      {/* taskDetails !== null && (
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
        ) */}
      {/* )} */}

      {/* <div className={css.backdrop}>
            <div className={css.modal}>
              <button
                className={css.closeModalBtn}
                type="button"
                aria-label="Close modal button"
                onClick={closeModal}
              >
                <IoClose />
              </button>
      
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, handleChange }) => (
                  <Form className={css.container}>
                    <div className={css.group}>
                      <label className={css.label}>
                        <Field
                          type="text"
                          name="title"
                          placeholder="Заголовок"
                          className={css.input}
                        />
                        <ErrorMessage
                          className={css.errorText}
                          name="title"
                          component="span"
                        />
                      </label>
                    </div>
      
                    <div className={css.group}>
                      <label>
                        <Field
                          type="checkbox"
                          name="isList"
                          checked={values.isList}
                          onChange={handleChange}
                        />
                        списком
                      </label>
                    </div>
      
                    <div className={css.group}>
                      <label className={css.label}>
                        <span>Опис задачі</span>
                        <Field type="text" name="description" className={css.input} />
                        <ErrorMessage
                          className={css.errorText}
                          name="description"
                          component="span"
                        />
                      </label>
                    </div>
      
                    <div className={css.group}>
                      <label>
                        Дата закінчення:
                        <Field
                          type="date"
                          name="dateFinished"
                          className={css.input}
                        />
                        <ErrorMessage
                          className={css.errorText}
                          name="dateFinished"
                          component="span"
                        />
                      </label>
                    </div>
      
                    <div className={css.group}>
                      <label>
                        Відповідальний:
                        <Field as="select" name="performerId" className={css.select}>
                          <option value="">Оберіть користувача</option>
                          {users.map((user) => (
                            <option key={user.id} value={user.id}>
                              {user.firstName} {user.lastName}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          className={css.errorText}
                          name="performerId"
                          component="span"
                        />
                      </label>
                      <p>
                        Постановник: {currentUser.firstName} {currentUser.lastName}
                      </p>
                    </div>
      
                    <div className={css.group}>
                      <label>
                        <Field type="radio" name="speed" value="0" />
                        Звичайний
                      </label>
                      <label>
                        <Field type="radio" name="speed" value="1" />
                        Терміновий
                      </label>
                      <label>
                        <Field type="radio" name="speed" value="2" />
                        Дуже терміновий
                      </label>
                    </div>
      
                    <button className={css.submitBtn} type="submit">
                      Надіслати
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div> */}
    </>
  );
};

export default TasksDetailsPage;
