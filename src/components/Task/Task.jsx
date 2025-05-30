import { useSelector } from "react-redux";
import css from "./Task.module.css";
// import { MdDelete } from "react-icons/md";
import { selectorUsers } from "../../redux/user/selectors";
import { GoX } from "react-icons/go";
import { GoCheck } from "react-icons/go";

const Task = ({
  task: {
    title,
    // description,
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
    return `${day}.${month}.${year}`;
  };

  const getUrgencyIcon = (type) => {
    switch (type) {
      case 0:
        return (
          <img
            className={css.imgSpeed}
            src="/src/images/assets/snail64.png"
            alt="Звичайний"
          />
        );
      case 1:
        return (
          <img
            className={css.imgSpeed}
            src="/src/images/assets/rabbit32.png"
            alt="Терміновий"
          />
        );
      case 2:
        return (
          <img
            className={css.imgSpeed}
            src="/src/images/assets/kat64.png"
            alt="Дуже терміновий"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
          <p> {title}</p>
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>Терміновість: </p>
          {getUrgencyIcon(wink_type)}
        </li>
        {/* <li className={css.item}>
          <p className={css.itemTitle}>Опис: </p>
          {description}
        </li> */}
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
          <p className={css.itemTitle}>Коментарі: </p>{" "}
          {taskHasComments.length === 0 ? (
            <GoX className={css.iconCommentRed} />
          ) : (
            <GoCheck className={css.iconCommentGreen} />
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
