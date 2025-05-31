import { useSelector } from "react-redux";
import css from "./TaskMainElementsForm.module.css";
import { selectorCurrentUser, selectorUsers } from "../../redux/user/selectors";
import { ErrorMessage, Field } from "formik";

const TaskMainElementsForm = ({ values, handleChange }) => {
  const users = useSelector(selectorUsers);
  const currentUser = useSelector(selectorCurrentUser);

  return (
    <>
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
          <img className={css.imgSpeed} src="/src/images/assets/snail64.png" alt="Звичайний" />
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
          <img className={css.imgSpeed} src="/src/images/assets/rabbit32.png" alt="Терміновий" />
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
          <img className={css.imgSpeed} src="/src/images/assets/kat64.png" alt="Дуже терміновий" />
        </label>
      </div>
    </>
  );
};

export default TaskMainElementsForm;
