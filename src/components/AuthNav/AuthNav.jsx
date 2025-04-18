// Компонент рендерить навігацію для входу на сайт. Також можна додати посилання на Реєстрацію.

/* Для створення посилань використовуються компоненти <Link> та <NavLink>. 
Вони рендерять тег <a>, але стандартна поведінка посилання змінена так, що при натисканні просто оновлюється URL в адресному рядку браузера, без перезавантаження сторінки.
Компонент <NavLink> відрізняється тільки тим, що може мати додаткові стилі, якщо поточний URL збігається зі значенням пропcа to. */

import clsx from "clsx";
import css from "./AuthNav.module.css";
import { NavLink } from "react-router-dom";

const activeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const AuthNav = () => {
  return (
    <div>
      <NavLink to="/login_check" className={activeLinkClass}>
        Увійти
      </NavLink>
    </div>
  );
};

export default AuthNav;
