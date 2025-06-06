import css from "./UpdateTaskForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { selectorTaskDetails } from "../../redux/tasks/selectors";
import {
  apiGetAllTasks,
  apiGetMyTasks,
  apiGetTaskDetails,
  apiGetTasksAssignedToMe,
  apiUpdateTaskDetails,
} from "../../redux/tasks/operations";
import { selectorAuthIsLoggedIn } from "../../redux/auth/selectors";
import { selectorCurrentUser, selectorUsers } from "../../redux/user/selectors";
import { apiCurrentUser } from "../../redux/user/operations";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

const UpdateTaskForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const taskDetails = useSelector(selectorTaskDetails);
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  const users = useSelector(selectorUsers);
  const currentUser = useSelector(selectorCurrentUser);

  useEffect(() => {
    if (isLoggedIn && !currentUser?.id) {
      dispatch(apiCurrentUser());
    }
  }, [dispatch, isLoggedIn, currentUser]);

  const closeModal = () => {
    navigate(-1);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Заголовок обов'язковий"),
    isList: Yup.boolean(),
    description: Yup.string(),
    dateFinished: Yup.string(),
    performerId: Yup.number().required("Оберіть користувача"),
    winkType: Yup.string().oneOf(["0", "1", "2"]),
    status: Yup.boolean(),
  });

  const initialValues = {
    title: taskDetails.title || "",
    isList: taskDetails.list_enable ?? false,
    description: taskDetails.description || "",
    dateFinished: taskDetails.finished_date
      ? taskDetails.finished_date.slice(0, 10)
      : "",
    performerId: taskDetails.performer_id || "",
    winkType: String(taskDetails.wink_type ?? 0),
    status: taskDetails.status === 2,
  };

  const handleSubmit = async (values, actions) => {
    const formattedData = {
      title: values.title,
      list_enable: values.isList,
      description: values.description,
      finished_date: values.dateFinished,
      performerId: Number(values.performerId),
      wink_type: Number(values.winkType),
      status: values.status ? 2 : 0,
    };

    try {
      await toast.promise(
        dispatch(
          apiUpdateTaskDetails({ taskId: id, formData: formattedData })
        ).unwrap(),
        {
          loading: "Оновлюємо завдання...",
          success: "Завдання успішно оновлено",
          error: "Помилка при оновленні",
        }
      );

      console.log(formattedData);

      await Promise.all([
        dispatch(apiGetAllTasks()),
        dispatch(apiGetMyTasks()),
        dispatch(apiGetTasksAssignedToMe()),
        dispatch(apiGetTaskDetails(id)),
      ]);

      actions.resetForm();
      closeModal();
    } catch (error) {
      console.error("Помилка при оновленні завдання:", error);
    }
  };

  return (
    <>
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, handleChange }) => (
              /* {({ values, handleChange, dirty }) => ( */
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
                    <Field
                      type="text"
                      name="description"
                      className={css.input}
                    />
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
                    <Field
                      as="select"
                      name="performerId"
                      className={css.select}
                    >
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
                    Постановник:{" "}
                    {(() => {
                      const user = users.find(
                        (user) => user.id === taskDetails.user_id
                      );
                      return user
                        ? `${user.firstName} ${user.lastName}`
                        : "Невідомий користувач";
                    })()}
                  </p>
                </div>

                <div className={css.winkTypeGroup}>
                  <label
                    className={`${css.winkTypeOption} ${
                      values.winkType === "0" ? css.selected : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="winkType"
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
                    className={`${css.winkTypeOption} ${
                      values.winkType === "1" ? css.selected : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="winkType"
                      value="1"
                      className={css.hiddenRadio}
                    />
                    <img
                      className={css.imgSpeed}
                      src="/src/images/assets/rabbit64.png"
                      alt="Терміновий"
                    />
                  </label>
                  <label
                    className={`${css.winkTypeOption} ${
                      values.winkType === "2" ? css.selected : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="winkType"
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
                <div className={css.group}>
                  <label>
                    <Field
                      type="checkbox"
                      name="status"
                      disabled={taskDetails.status === 2}
                    />
                    Завершити завдання
                  </label>
                </div>
                <button className={css.submitBtn} type="submit">
                  Зберегти
                </button>
                {/* Кнопка показується тільки після початку редагування форми: */}
                {/* {dirty && (
                    <button className={css.submitBtn} type="submit">
                      Зберегти
                    </button>
                  )} */}
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default UpdateTaskForm;
