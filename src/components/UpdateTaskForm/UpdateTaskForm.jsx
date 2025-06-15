// Компонент з формою читання та редагування конкретного завдання

import css from "./UpdateTaskForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { selectorTaskDetails } from "../../redux/tasks/selectors";
import {
  // apiDeleteTask,
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
import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { LuDot } from "react-icons/lu";

const UpdateTaskForm = ({ closeModal }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const taskDetails = useSelector(selectorTaskDetails);
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  const users = useSelector(selectorUsers);
  const currentUser = useSelector(selectorCurrentUser);

  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    if (taskDetails?.list_enable && taskDetails.description) {
      try {
        const parsed = JSON.parse(taskDetails.description);
        if (Array.isArray(parsed)) {
          setListItems(parsed.map((item) => item.list || item));
        }
      } catch {
        // не JSON — значить рядок
      }
    }
  }, [taskDetails]);

  useEffect(() => {
    if (isLoggedIn && !currentUser?.id) {
      dispatch(apiCurrentUser());
    }
  }, [dispatch, isLoggedIn, currentUser]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Заголовок обов'язковий"),
    isList: Yup.boolean(),
    description: Yup.string().when("isList", {
      is: false,
      then: (schema) => schema.required("Опис обов’язковий"),
      otherwise: (schema) => schema,
    }),
    dateFinished: Yup.string(),
    performerId: Yup.number().required("Оберіть користувача"),
    winkType: Yup.string().oneOf(["0", "1", "2"]),
    status: Yup.boolean(),
  });

  const initialValues = {
    title: taskDetails?.title || "",
    description:
      taskDetails?.list_enable && taskDetails?.description
        ? "" // очищуємо поле, щоб не показувати JSON
        : taskDetails?.description || "",
    isList: taskDetails?.list_enable || false,
    dateFinished: taskDetails?.finished_date
      ? new Date(taskDetails.finished_date).toISOString().split("T")[0]
      : "",
    performerId: taskDetails?.performer_id?.toString() || "",
    winkType: taskDetails?.wink_type?.toString() || "0",
    status: taskDetails?.status === 2,
  };

  const handleSubmit = async (values, actions) => {
    if (values.isList && listItems.length === 0) {
      toast.error("Додайте хоча б один пункт у список");
      return;
    }

    const formattedData = {
      title: values.title,
      list_enable: values.isList,
      description: values.isList
        ? JSON.stringify(
            listItems.map((text, index) => ({
              id: index + 1,
              task_id: parseInt(id),
              list: text,
              checklist: 0,
              create_date: Math.floor(Date.now() / 1000),
              sended: null,
            }))
          )
        : values.description,
      finished_date: values.dateFinished
        ? new Date(values.dateFinished).toISOString()
        : null,
      performer_id: parseInt(values.performerId),
      wink_type: parseInt(values.winkType),
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

  // Завдання видаляється, але в'юпорт не оновлюється:
  // const onDeleteTask = (taskId) => {
  //   dispatch(apiDeleteTask(taskId))
  //     .unwrap()
  //     .then(() => {
  //       toast("Завдання успішно видалено");
  //     });
  // };

  // Завдання не видаляється, хоча додане оновлення та закриття модального вікна. Виникає помилка 500
  // const onDeleteTask = (taskId) => {
  //   const confirmDelete = window.confirm(
  //     "Ви впевнені, що хочете видалити це завдання?"
  //   );
  //   if (!confirmDelete) return;

  //   dispatch(apiDeleteTask(Number(taskId)))
  //     .unwrap()
  //     .then(async () => {
  //       toast.success("Завдання успішно видалено");

  //       // Очікуємо завершення всіх оновлень списків
  //       await Promise.all([
  //         dispatch(apiGetAllTasks()),
  //         dispatch(apiGetMyTasks()),
  //         dispatch(apiGetTasksAssignedToMe()),
  //       ]);

  //       closeModal();
  //     })
  //     .catch(() => toast.error("Помилка при видаленні"));
  // };

  return (
    <>
      {/* <button
        className={css.deleteTaskBnt}
        type="button"
        onClick={() => onDeleteTask(id)}
      >
        <MdDelete />
      </button> */}
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
                  <label className={css.listCheckbox}>
                    <Field
                      type="checkbox"
                      name="isList"
                      checked={values.isList}
                      onChange={(e) => {
                        handleChange(e);
                        // не очищуємо список при вимкненні
                      }}
                    />
                    списком
                  </label>
                </div>

                {!values.isList && typeof values.description === "string" && (
                  <div className={css.group}>
                    <label className={css.label}>
                      <span>Опис задачі</span>
                      <Field
                        type="text"
                        name="description"
                        className={css.input}
                      />
                      <ErrorMessage
                        name="description"
                        component="span"
                        className={css.errorText}
                      />
                    </label>
                  </div>
                )}

                {values.isList && (
                  <div className={css.group}>
                    {listItems.map((item, index) => (
                      <div key={index} className={css.listItem}>
                        <label className={css.item}>
                          <LuDot className={css.iconDot} />
                          {item}
                        </label>
                        <button
                          type="button"
                          className={css.deleteItemBtn}
                          onClick={() =>
                            setListItems((prev) =>
                              prev.filter((_, i) => i !== index)
                            )
                          }
                        >
                          <MdDelete />
                        </button>
                      </div>
                    ))}

                    <div className={css.newListItem}>
                      <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        className={css.input}
                        placeholder="Пункт списку"
                      />
                      <button
                        type="button"
                        className={css.addListItemBtn}
                        onClick={() => {
                          if (newItem.trim()) {
                            setListItems((prev) => [...prev, newItem.trim()]);
                            setNewItem("");
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                )}

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
