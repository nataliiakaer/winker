import { useDispatch, useSelector } from "react-redux";
import css from "./ModalAddTask.module.css";
import { IoClose } from "react-icons/io5";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  selectorAuthError,
  selectorAuthIsLoggedIn,
} from "../../redux/auth/selectors";
import { selectorCurrentUser, selectorUsers } from "../../redux/user/selectors";
import { useEffect } from "react";
import { apiCurrentUser } from "../../redux/user/operations";

const ModalAddTask = ({ closeModal }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  const currectUser = useSelector(selectorCurrentUser);

  const users = useSelector(selectorUsers);
  const error = useSelector(selectorAuthError);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(apiCurrentUser());
    }
  }, [dispatch, isLoggedIn]);

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
        // initialValues={}
        // onSubmit={}
        // validationSchema={}
        >
          <Form className={css.container}>
            <div className={css.group}>
              <label className={css.label}>
                <Field type="text" name="title" placeholder="Заголовок" />
                <ErrorMessage
                  className={css.errorText}
                  name="title"
                  component="span"
                />
              </label>
            </div>

            <div className={css.group}>
              <label>
                <input type="checkbox" value="list" />
                списком
              </label>
            </div>

            <div className={css.group}>
              <label className={css.label}>
                <span>Опис задачі</span>
                <Field type="text" name="title" />
                <ErrorMessage
                  className={css.errorText}
                  name="title"
                  component="span"
                />
              </label>
            </div>

            <div className={css.group}>
              <label>
                Дата закінчення:
                <input type="date" name="dateFinished" />
              </label>
            </div>

            <div className={css.group}>
              <label>
                Відповідальний:
                <select>
                  <option value=""></option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.firstName} {user.lastName}
                    </option>
                  ))}
                </select>
              </label>
              <p>
                Постановник: {currectUser.firstName} {currectUser.lastName}
              </p>
            </div>

            <div className={css.group}>
              <label>
                <input type="radio" name="speed" value="slow" />
                Звичайний
              </label>
              <label>
                <input type="radio" name="speed" value="fast" />
                Терміновий
              </label>
              <label>
                <input type="radio" name="speed" value="very_fast" />
                Дуже терміновий
              </label>
            </div>

            <button
              className={css.submitBnt}
              type="submit"
              onClick={closeModal}
            >
              Надіслати
            </button>

            {error && (
              <p className={css.errorText}>Упс, виникла помилка... {error}</p>
            )}
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default ModalAddTask;
