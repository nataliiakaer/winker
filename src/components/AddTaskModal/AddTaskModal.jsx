// import { useDispatch, useSelector } from "react-redux";
// import css from "./AddTaskModal.module.css";
// import { IoClose } from "react-icons/io5";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import {
//   selectorAuthError,
//   selectorAuthIsLoggedIn,
// } from "../../redux/auth/selectors";
// import { selectorCurrentUser, selectorUsers } from "../../redux/user/selectors";
// import { useEffect } from "react";
// import { apiCurrentUser } from "../../redux/user/operations";

// const AddTaskModal = ({ closeModal }) => {
//   const dispatch = useDispatch();
//   const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
//   const currectUser = useSelector(selectorCurrentUser);

//   const users = useSelector(selectorUsers);
//   const error = useSelector(selectorAuthError);

//   useEffect(() => {
//     if (isLoggedIn) {
//       dispatch(apiCurrentUser());
//     }
//   }, [dispatch, isLoggedIn]);

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
//         // initialValues={}
//         // onSubmit={}
//         // validationSchema={}
//         >
//           <Form className={css.container}>
//             <div className={css.group}>
//               <label className={css.label}>
//                 <Field type="text" name="title" placeholder="Заголовок" />
//                 <ErrorMessage
//                   className={css.errorText}
//                   name="title"
//                   component="span"
//                 />
//               </label>
//             </div>

//             <div className={css.group}>
//               <label>
//                 <input type="checkbox" value="list" />
//                 списком
//               </label>
//             </div>

//             <div className={css.group}>
//               <label className={css.label}>
//                 <span>Опис задачі</span>
//                 <Field type="text" name="title" />
//                 <ErrorMessage
//                   className={css.errorText}
//                   name="title"
//                   component="span"
//                 />
//               </label>
//             </div>

//             <div className={css.group}>
//               <label>
//                 Дата закінчення:
//                 <input type="date" name="dateFinished" />
//               </label>
//             </div>

//             <div className={css.group}>
//               <label>
//                 Відповідальний:
//                 <select>
//                   <option value=""></option>
//                   {users.map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {user.firstName} {user.lastName}
//                     </option>
//                   ))}
//                 </select>
//               </label>
//               <p>
//                 Постановник: {currectUser.firstName} {currectUser.lastName}
//               </p>
//             </div>

//             <div className={css.group}>
//               <label>
//                 <input type="radio" name="speed" value="slow" />
//                 Звичайний
//               </label>
//               <label>
//                 <input type="radio" name="speed" value="fast" />
//                 Терміновий
//               </label>
//               <label>
//                 <input type="radio" name="speed" value="very_fast" />
//                 Дуже терміновий
//               </label>
//             </div>

//             <button
//               className={css.submitBnt}
//               type="submit"
//               onClick={closeModal}
//             >
//               Надіслати
//             </button>

//             {error && (
//               <p className={css.errorText}>Упс, виникла помилка... {error}</p>
//             )}
//           </Form>
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AddTaskModal;

import { useDispatch, useSelector } from "react-redux";
import css from "./AddTaskModal.module.css";
import { IoClose } from "react-icons/io5";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { selectorAuthIsLoggedIn } from "../../redux/auth/selectors";
import { selectorCurrentUser, selectorUsers } from "../../redux/user/selectors";
import { useEffect } from "react";
import { apiCurrentUser } from "../../redux/user/operations";
import { apiAddTask } from "../../redux/tasks/operations";
import * as Yup from "yup";

const AddTaskModal = ({ closeModal }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  const currentUser = useSelector(selectorCurrentUser);
  const users = useSelector(selectorUsers);

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
    dateFinished: Yup.date().required("Обов'язкове поле"),
    performerId: Yup.string().required("Оберіть відповідального"),
  });

  const handleSubmit = (values) => {
    const { title, isList, dateFinished, performerId, speed } = values;

    const description = isList
      ? JSON.stringify([
          {
            id: 1,
            task_id: 0,
            list: "1",
            checklist: 0,
            create_date: Math.floor(Date.now() / 1000),
            sended: null,
          },
          {
            id: 2,
            task_id: 0,
            list: "2",
            checklist: 0,
            create_date: Math.floor(Date.now() / 1000),
            sended: null,
          },
          {
            id: 3,
            task_id: 0,
            list: "3",
            checklist: 0,
            create_date: Math.floor(Date.now() / 1000),
            sended: null,
          },
        ])
      : "string";

    const formData = {
      title,
      description,
      created_at: new Date().toISOString(),
      task_type: 0,
      type_base_plane_date: new Date().toISOString(),
      type_reg_daily_finished_time: new Date().toISOString(),
      type_reg_weekly_day: "",
      type_reg_weekly_time: new Date().toISOString(),
      type_reg_month_day: 0,
      type_reg_month_time: new Date().toISOString(),
      finished_date: new Date(dateFinished).toISOString(),
      wink_type: parseInt(speed),
      status: 0,
      user_id: currentUser.id,
      performer_id: parseInt(performerId),
      parent: "",
      list_enable: isList,
    };

    dispatch(apiAddTask(formData));
    closeModal();
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
    </div>
  );
};

export default AddTaskModal;
