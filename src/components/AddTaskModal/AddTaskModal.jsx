// import { useDispatch, useSelector } from "react-redux";
// import css from "./AddTaskModal.module.css";
// import { IoClose } from "react-icons/io5";
// import { Form, Formik } from "formik";
// import { useEffect } from "react";
// import * as Yup from "yup";
// import { apiCurrentUser } from "../../redux/user/operations";
// import { selectorAuthIsLoggedIn } from "../../redux/auth/selectors";
// import { selectorCurrentUser } from "../../redux/user/selectors";
// import {
//   apiAddTask,
//   apiGetAllTasks,
//   apiGetMyTasks,
//   apiGetTasksAssignedToMe,
// } from "../../redux/tasks/operations";
// import toast from "react-hot-toast";
// import TaskMainElementsForm from "../TaskMainElementsForm/TaskMainElementsForm";

// const AddTaskModal = ({ closeModal }) => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
//   const currentUser = useSelector(selectorCurrentUser);

//   useEffect(() => {
//     if (isLoggedIn) {
//       dispatch(apiCurrentUser());
//     }
//   }, [dispatch, isLoggedIn]);

//   const initialValues = {
//     title: "",
//     description: "",
//     isList: false,
//     dateFinished: "",
//     performerId: "",
//     speed: "0",
//   };

//   const validationSchema = Yup.object({
//     title: Yup.string().required("Обов'язкове поле"),
//     dateFinished: Yup.date().required("Обов'язкове поле"),
//     performerId: Yup.string().required("Оберіть відповідального"),
//   });

//   const handleSubmit = (values, actions) => {
//     const { title, description, isList, dateFinished, performerId, speed } =
//       values;

//     const newTask = {
//       title,
//       description,
//       created_at: new Date().toISOString(),
//       task_type: 0,
//       finished_date: new Date(dateFinished).toISOString(),
//       wink_type: parseInt(speed),
//       status: 0,
//       user_id: currentUser.id,
//       performer_id: parseInt(performerId),
//       list_enable: isList,
//     };

//     dispatch(apiAddTask(newTask))
//       .unwrap()
//       .then(() => {
//         toast("Завдання успішно добавлено");

//         // Оновлюємо всі списки
//         Promise.all([
//           dispatch(apiGetMyTasks()).unwrap(),
//           dispatch(apiGetTasksAssignedToMe()).unwrap(),
//           dispatch(apiGetAllTasks()).unwrap(), // якщо потрібно
//         ]).then(() => {
//           closeModal(); // Закриваємо тільки після оновлення всіх
//         });

//         actions.resetForm();
//       })
//       .catch((err) => {
//         toast.error("Помилка при додаванні завдання");
//         console.error(err);
//       });
//   };

//   return (
//     <div className={css.backdrop}>
//       <div className={css.modal}>
//         <button
//           className={css.closeModalBtn}
//           type="button"
//           aria-label="Close modal button"
//           onClick={closeModal}
//         >
//           <IoClose />
//         </button>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ values, handleChange }) => (
//             <Form className={css.container}>
//               <TaskMainElementsForm
//                 values={values}
//                 handleChange={handleChange}
//               />

//               <button className={css.submitBtn} type="submit">
//                 Надіслати
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AddTaskModal;

// // AddTaskModal.jsx

import { useDispatch, useSelector } from "react-redux";
import css from "./AddTaskModal.module.css";
import { IoClose } from "react-icons/io5";
import { Form, Formik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { apiCurrentUser } from "../../redux/user/operations";
import { selectorAuthIsLoggedIn } from "../../redux/auth/selectors";
import {
  apiAddTask,
  apiGetMyTasks,
  apiGetTasksAssignedToMe,
  apiGetAllTasks,
} from "../../redux/tasks/operations";
import toast from "react-hot-toast";
import TaskMainElementsForm from "../TaskMainElementsForm/TaskMainElementsForm";
import { selectorCurrentUser } from "../../redux/user/selectors";

const AddTaskModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  const currentUser = useSelector(selectorCurrentUser);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(apiCurrentUser());
    }
  }, [dispatch, isLoggedIn]);

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
    dateFinished: Yup.date().nullable(),
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
      user_id: parseInt(currentUser.id),
      performer_id: parseInt(performerId),
      list_enable: isList,
    };

    try {
      await dispatch(apiAddTask(newTask)).unwrap();
      toast.success("Завдання успішно добавлено");

      await Promise.all([
        dispatch(apiGetMyTasks()).unwrap(),
        dispatch(apiGetTasksAssignedToMe()).unwrap(),
        dispatch(apiGetAllTasks()).unwrap(),
      ]);

      actions.resetForm();
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Помилка при додаванні завдання");
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
              <TaskMainElementsForm
                values={values}
                handleChange={handleChange}
              />
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

export default AddTaskModal;
