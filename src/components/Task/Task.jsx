import css from "./Task.module.css";

const Task = ({ task: { id, title, created_at, status }, onDeleteTask }) => {
  return (
    <>
      <ul className={css.list}>
        <li className={css.item}>
          <p className={css.itemTitle}>Назва завдання: </p> {title}
        </li>
        <li className={css.itemTitle}>
          <p className={css.item}>Дата створення: </p> {created_at}
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>Статус: </p>
          {status}
        </li>
      </ul>

      <button
        className={css.deletetBnt}
        type="button"
        onClick={() => onDeleteTask(id)}
      >
        Видалити
      </button>
    </>
  );
};

export default Task;
