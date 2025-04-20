// Компонент, який не буде пускати неавторизованого користувача на сторінки з приватною інформацією

import { useSelector } from "react-redux";
import { selectorAuthIsLoggedIn } from "../redux/auth/selectors";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);

  return isLoggedIn ? component : <Navigate to={redirectTo} replace />;
};

export default PrivateRoute;
