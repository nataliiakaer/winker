// компонент Layout, який рендерить компонент AppBar і огортати усі маршрути, щоб бути доступним на кожному із них.

import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";

const Layout = ({ children }) => {
  return (
    <>
      <header className={css.container}>
        <AppBar />
      </header>
      <main>
        <Suspense fallback={null}>{children}</Suspense>
      </main>
    </>
  );
};

export default Layout;
