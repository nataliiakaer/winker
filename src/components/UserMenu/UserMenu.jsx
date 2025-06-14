// Компонент рендерить навігацію до завдань та кнопку для виходу
// Ключове: end вказує, що активним має бути тільки /tasks, а не все, що починається з /tasks.

/* Для створення посилань використовуються компоненти <Link> та <NavLink>. 
Вони рендерять тег <a>, але стандартна поведінка посилання змінена так, що при натисканні просто оновлюється URL в адресному рядку браузера, без перезавантаження сторінки.
Компонент <NavLink> відрізняється тільки тим, що може мати додаткові стилі, якщо поточний URL збігається зі значенням пропcа to. */

import css from "./UserMenu.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { selectorCurrentUser } from "../../redux/user/selectors";
import { useEffect, useState } from "react";
import { selectorAuthIsLoggedIn } from "../../redux/auth/selectors";
import { apiCurrentUser } from "../../redux/user/operations";

import { persistor } from "../../redux/store";
import { logout } from "../../redux/auth/operations";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const activeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const UserMenu = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);
  const currectUser = useSelector(selectorCurrentUser);

  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    dispatch(logout()); // Диспатчимо дію logout, яка має повернути всі частини state до initialState
    persistor.purge(); // Очищає збережені дані persist (наприклад, токени, дані tasks тощо)
    window.location.reload(); // ✅ примусове перезавантаження сторінки, щоб бути впевненим, що всі дані скинулись
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(apiCurrentUser());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <>
      <div className={css.navContainer}>
        <NavLink to="/" end className={activeLinkClass}>
          Всі завдання
        </NavLink>
        <NavLink to="/tasks/my-tasks" className={activeLinkClass}>
          Завдання від мене
        </NavLink>
        <NavLink to="/tasks/assigned-to-me" className={activeLinkClass}>
          Завдання для мене
        </NavLink>
      </div>

      <div className={css.nameContainer}>
        <div
          className={`${css.userName} ${showLogout ? css.act : ""}`}
          onClick={() => setShowLogout((prev) => !prev)}
        >
          <p>
            {currectUser.firstName} {currectUser.lastName}
          </p>
          {showLogout ? (
            <IoIosArrowUp className={css.iconName} />
          ) : (
            <IoIosArrowDown className={css.iconName} />
          )}
        </div>
        {showLogout && (
          <div className={css.popup}>
            <p className={css.userData}>{currectUser.email}</p>
            <p className={css.userData}>{currectUser.company.name}</p>
            <button className={css.logoutButton} onClick={handleLogout}>
              Вихід
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserMenu;
