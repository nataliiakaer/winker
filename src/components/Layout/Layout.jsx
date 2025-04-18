// компонент Layout, який рендерить компонент AppBar і огортати усі маршрути, щоб бути доступним на кожному із них. 

import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";

const Layout = ({ children }) => {
  return (
    <div>
      <AppBar />
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};

export default Layout;
