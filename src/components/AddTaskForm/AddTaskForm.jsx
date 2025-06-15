// Компонент з формою для створення нового завдання

import { useDispatch, useSelector } from "react-redux";
import css from "./AddTaskForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
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
import { LuDot } from "react-icons/lu";
import { MdDelete } from "react-icons/md";

const AddTaskForm = ({ closeModal }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  const users = useSelector(selectorUsers);
  const currentUser = useSelector(selectorCurrentUser);

  const [listItems, setListItems] = useState([]);
  const [newItem, setNewItem] = useState("");

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
    winkType: "0",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Обов'язкове поле"),
    performerId: Yup.string().required("Оберіть відповідального"),
    description: Yup.string().when("isList", {
      is: false,
      then: (schema) => schema.required("Опис не може бути порожнім"),
      otherwise: (schema) => schema,
    }),
  });

  const handleSubmit = async (values, actions) => {
    if (values.isList && listItems.length === 0) {
      toast.error("Додайте хоча б один пункт у список");
      return;
    }

    const { title, description, isList, dateFinished, performerId, winkType } =
      values;

    const finalDescription = isList
      ? JSON.stringify(
          listItems.map((item, index) => ({
            id: index + 1,
            task_id: 0,
            list: item,
            checklist: 0,
            create_date: Math.floor(Date.now() / 1000),
            sended: null,
          }))
        )
      : description;

    const newTask = {
      title,
      description: finalDescription,
      created_at: new Date().toISOString(),
      task_type: 0,
      finished_date: dateFinished ? new Date(dateFinished).toISOString() : null,
      wink_type: parseInt(winkType),
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
      setListItems([]);
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
                <label className={css.listCheckbox}>
                  <Field
                    type="checkbox"
                    name="isList"
                    checked={values.isList}
                    onChange={handleChange}
                  />
                  списком
                </label>
              </div>

              {!values.isList ? (
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
              ) : (
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
                        if (newItem.trim() !== "") {
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

              <div className={css.winkTypeGroup}>
                {["0", "1", "2"].map((value) => (
                  <label
                    key={value}
                    className={`${css.winkTypeOption} ${
                      values.winkType === value ? css.selected : ""
                    }`}
                  >
                    <Field
                      type="radio"
                      name="winkType"
                      value={value}
                      className={css.hiddenRadio}
                    />
                    <img
                      className={css.imgSpeed}
                      src={`/src/images/assets/${
                        value === "0"
                          ? "snail64.png"
                          : value === "1"
                          ? "rabbit64.png"
                          : "kat64.png"
                      }`}
                      alt="Швидкість"
                    />
                  </label>
                ))}
              </div>

              {/* <div className={css.winkTypeGroup}>
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
              </div> */}

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
