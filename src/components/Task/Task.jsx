import { useSelector } from "react-redux";
import css from "./Task.module.css";
// import { MdDelete } from "react-icons/md";
import { selectorUsers } from "../../redux/user/selectors";

const Task = ({
  task: {
    id,
    title,
    status,
    wink_type,
    performer_id,
    user_id,
    created_at,
    finished_date,
    taskHasComments,
  },
  // onDeleteTask,
}) => {
  const users = useSelector(selectorUsers);

  const userName = (id) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return "Невідомо";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
          <p className={css.itemTitle}>ID: </p> {id}
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>Назва завдання: </p> {title}
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>Статус: </p>
          {status}
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>Терміновість: </p>
          {wink_type}
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>Відповідальний: </p>
          {userName(performer_id)}
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>Постановник: </p>
          {userName(user_id)}
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>Дата постановки: </p>
          {formatDate(created_at)}
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>Дата виконання: </p>
          {formatDate(finished_date)}
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>Comments: </p>{" "}
          {taskHasComments.length === 0 ? (
            <p>Коментарі відсутні</p>
          ) : (
            <p>Коментарі присутні</p>
          )}
        </li>
      </ul>

      {/* <button
        className={css.deletetBnt}
        type="button"
        onClick={() => onDeleteTask(id)}
      >
        <MdDelete />
      </button> */}
    </>
  );
};

export default Task;
