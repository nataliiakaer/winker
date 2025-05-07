// Компонент рендерить навігацію та компонент AuthNav. Водночас авторизований користувач замість AuthNav має бачити UserMenu з завданнями. Тобто, шапку сайту

/* Для створення посилань використовуються компоненти <Link> та <NavLink>. 
Вони рендерять тег <a>, але стандартна поведінка посилання змінена так, що при натисканні просто оновлюється URL в адресному рядку браузера, без перезавантаження сторінки.
Компонент <NavLink> відрізняється тільки тим, що може мати додаткові стилі, якщо поточний URL збігається зі значенням пропcа to. */

import { Link } from "react-router-dom";
import AuthNav from "../AuthNav/AuthNav.jsx";
import UserMenu from "../UserMenu/UserMenu.jsx";
import css from "./AppBar.module.css";
import { useSelector } from "react-redux";
import { selectorAuthIsLoggedIn } from "../../redux/auth/selectors.js";

const AppBar = () => {
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);

  return (
    <nav className={css.container}>
      <div className={css.logoContainer}>
        <Link to="/" className={css.link}>
          Winker
        </Link>
      </div>

      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </nav>
  );
};

export default AppBar;
