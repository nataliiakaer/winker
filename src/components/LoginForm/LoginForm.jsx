// Форма для входу на сайт

/* Для того щоб сповістити Redux про те, що в інтерфейсі відбулася якась подія, необхідно відправити екшен. 
Для цього у бібліотеці React Redux є хук useDispatch(), який повертає посилання на функцію надсилання екшенів dispatch. 
Тобто, щоб змінити стан при взаємодії з інтерфейсом, потрібно використовувати хук useDispatch() */

import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import css from "./LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { apiLogin } from "../../redux/auth/operations";
import { selectorAuthError } from "../../redux/auth/selectors";

const INITIAL_VALUES = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectorAuthError);

  const handleSubmit = (values, actions) => {
    dispatch(apiLogin(values));
    actions.resetForm();
  };

  const LoginValidationSchema = Yup.object().shape({
    // email: Yup.string()
      // .email("Неправильна адреса електронної пошти")
      // .required("Обов'язкова наявність електронної пошти"),
    password: Yup.string().required("Вкажіть пароль."),
  });

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={LoginValidationSchema}
    >
      <Form className={css.container}>
        <label className={css.label}>
          <span>Email</span>
          <Field type="text" name="email" />
          <ErrorMessage
            className={css.errorText}
            name="email"
            component="span"
          />
        </label>
        <label className={css.label}>
          <span>Пароль</span>
          <Field type="password" name="password" />
          <ErrorMessage
            className={css.errorText}
            name="password"
            component="span"
          />
        </label>
        <button className={css.submitBnt} type="submit">
          Увійти
        </button>

        {error && (
          <p className={css.errorText}>Упс, виникла помилка... {error}</p>
        )}
      </Form>
    </Formik>
  );
};

export default LoginForm;
