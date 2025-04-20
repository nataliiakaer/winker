// При переході на адресу "/", відбувається автоматичний перехід на завдання або сторінку входу.
//Щоб автоматично перенаправляти користувача на потрібну сторінку в залежності від авторизації, потрібно використовувати useEffect разом із useNavigate з бібліотеки react-router-dom.

/* Для створення посилань використовуються компоненти <Link> та <NavLink>. 
Вони рендерять тег <a>, але стандартна поведінка посилання змінена так, що при натисканні просто оновлюється URL в адресному рядку браузера, без перезавантаження сторінки.
Компонент <NavLink> відрізняється тільки тим, що може мати додаткові стилі, якщо поточний URL збігається зі значенням пропcа to. */

// import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectorAuthIsLoggedIn } from "../../redux/auth/selectors";

const HomePage = () => {
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);

  return isLoggedIn ? (
    <Navigate to="/tasks" replace />
  ) : (
    <Navigate to="/login_check" replace />
  );

  // const navigate = useNavigate();
  // const isLoggedIn = useSelector(selectorAuthIsLoggedIn);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     navigate("/tasks");
  //   } else {
  //     navigate("/login_check");
  //   }
  // }, [isLoggedIn, navigate]);

  // return null; // Нічого не рендеримо, бо одразу перенаправляємо
};

export default HomePage;
