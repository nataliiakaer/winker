// Якщо користувач зайшов за неіснуючим маршрутом

import { NavLink } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.container}>
      <div className={css.textNumber}>404</div>
      <div className={css.text}>Сторінка на яку Ви зайшли, не існує</div>

      <nav>
        <NavLink to="/" className={css.link}>
          Повернутися на основну сторінку
        </NavLink>
      </nav>
    </div>
  );
};

export default NotFoundPage;
