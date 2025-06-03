// Компонент з формою для створення нового завдання

import { useDispatch, useSelector } from "react-redux";
import css from "./AddTaskForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { apiCurrentUser } from "../../redux/user/operations";
import { selectorAuthIsLoggedIn } from "../../redux/auth/selectors";
import { selectorCurrentUser, selectorUsers } from "../../redux/user/selectors";
import {
  apiAddTask,
  apiGetAllTasks,
  apiGetMyTasks,
  apiGetTasksAssignedToMe,
} from "../../redux/tasks/operations";
import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

const AddTaskForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  const users = useSelector(selectorUsers);
  const currentUser = useSelector(selectorCurrentUser);

  useEffect(() => {
    if (isLoggedIn && !currentUser?.id) {
      dispatch(apiCurrentUser());
    }
  }, [dispatch, isLoggedIn, currentUser]);

  const initialValues = {
    title: "",
    description: "",
    isList: false,
    dateFinished: "",
    performerId: "",
    speed: "0",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Обов'язкове поле"),
    performerId: Yup.string().required("Оберіть відповідального"),
  });

  const handleSubmit = async (values, actions) => {
    const { title, description, isList, dateFinished, performerId, speed } =
      values;

    const newTask = {
      title,
      description,
      created_at: new Date().toISOString(),
      task_type: 0,
      finished_date: dateFinished ? new Date(dateFinished).toISOString() : null,
      wink_type: parseInt(speed),
      status: 0,
      user_id: currentUser.id,
      performer_id: parseInt(performerId),
      list_enable: isList,
    };

    try {
      await toast.promise(dispatch(apiAddTask(newTask)).unwrap(), {
        loading: "Додаємо завдання...",
        success: "Завдання успішно створено",
        error: "Помилка при додаванні",
      });

      await Promise.all([
        dispatch(apiGetAllTasks()),
        dispatch(apiGetMyTasks()),
        dispatch(apiGetTasksAssignedToMe()),
      ]);

      actions.resetForm();
      closeModal();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={css.backdrop}>
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
                    placeholder="Оберіть дату (необов’язково)"
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

              <div className={css.speedGroup}>
                <label
                  className={`${css.speedOption} ${
                    values.speed === "0" ? css.selected : ""
                  }`}
                >
                  <Field
                    type="radio"
                    name="speed"
                    value="0"
                    className={css.hiddenRadio}
                  />
                  <img
                    className={css.imgSpeed}
                    src="/src/images/assets/snail64.png"
                    alt="Звичайний"
                  />
                </label>
                <label
                  className={`${css.speedOption} ${
                    values.speed === "1" ? css.selected : ""
                  }`}
                >
                  <Field
                    type="radio"
                    name="speed"
                    value="1"
                    className={css.hiddenRadio}
                  />
                  <img
                    className={css.imgSpeed}
                    src="/src/images/assets/rabbit32.png"
                    alt="Терміновий"
                  />
                </label>
                <label
                  className={`${css.speedOption} ${
                    values.speed === "2" ? css.selected : ""
                  }`}
                >
                  <Field
                    type="radio"
                    name="speed"
                    value="2"
                    className={css.hiddenRadio}
                  />
                  <img
                    className={css.imgSpeed}
                    src="/src/images/assets/kat64.png"
                    alt="Дуже терміновий"
                  />
                </label>
              </div>
              <button className={css.submitBtn} type="submit">
                Надіслати
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddTaskForm;
