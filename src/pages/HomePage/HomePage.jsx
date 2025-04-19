// При переході на адресу "/", відбувається автоматичний перехід на завдання або сторінку входу.

/* Для створення посилань використовуються компоненти <Link> та <NavLink>. 
Вони рендерять тег <a>, але стандартна поведінка посилання змінена так, що при натисканні просто оновлюється URL в адресному рядку браузера, без перезавантаження сторінки.
Компонент <NavLink> відрізняється тільки тим, що може мати додаткові стилі, якщо поточний URL збігається зі значенням пропcа to. */

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorAuthIsLoggedIn } from "../../redux/auth/selectors";

// import css from "./HomePage.modelu.css";

const HomePage = () => {
  // return <p className={css.title}>Сайт для відображення завдань</p>;

  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);

  if (!isLoggedIn) {
    return <Link to="/login_check" />;
  }
  return <Link to="/tasks" />;
};

export default HomePage;
