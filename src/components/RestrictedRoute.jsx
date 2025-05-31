// Компонент, який захищає сторінки входу та реєстації від потравляння на них, вже авторизованого користувача.
// Користувача, який увійшов на сайт, вже не зможе попасти по шляху "api/login_check"
// replace перезаписує поточну URL-сторінку в історії браузера, щоб користувач не міг повернутися назад.

import { useSelector } from "react-redux";
import { selectorAuthIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

const RestrictedRoute = ({ component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);

  return isLoggedIn ? <Navigate to={redirectTo} replace /> : component;
};

export default RestrictedRoute;
