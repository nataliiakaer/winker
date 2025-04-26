// Компонент рендерить навігацію до завдань та кнопку для виходу
// Ключове: end вказує, що активним має бути тільки /tasks, а не все, що починається з /tasks.

/* Для створення посилань використовуються компоненти <Link> та <NavLink>. 
Вони рендерять тег <a>, але стандартна поведінка посилання змінена так, що при натисканні просто оновлюється URL в адресному рядку браузера, без перезавантаження сторінки.
Компонент <NavLink> відрізняється тільки тим, що може мати додаткові стилі, якщо поточний URL збігається зі значенням пропcа to. */

import css from "./UserMenu.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const activeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const UserMenu = () => {
  return (
    <div className={css.container}>
      <NavLink to="/tasks" end className={activeLinkClass}>
        Всі завдання
      </NavLink>
      <NavLink to="/tasks/my-tasks" className={activeLinkClass}>
        Завдання від мене
      </NavLink>
      <NavLink to="/tasks/assigned-to-me" className={activeLinkClass}>
        Завдання для мене
      </NavLink>

      {/* немає шляху на бекенді, щоб користувач виходив. Наприклад, POST /api/logout */}
      {/* <NavLink to="/login_check">
        <button className={css.logoutBnt} type="button" onClick={() => {}}>
          Вийти
        </button>
      </NavLink> */}
    </div>
  );
};

export default UserMenu;
