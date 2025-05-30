// компонент Layout, який рендерить компонент AppBar і огортати усі маршрути, щоб бути доступним на кожному із них.

import { Suspense } from "react";
import AppBar from "../AppBar/AppBar";
import css from "./Layout.module.css";
import Loader from "../Loader/Loader";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

const Layout = ({ children }) => {
  return (
    <>
      <header className={css.container}>
        <AppBar />
      </header>
      <main>
        <Suspense fallback={<Loader />}>{children}</Suspense>{" "}
        {/* або fallback={null} */}
        <ScrollToTopButton /> {/* завжди відображається над усім */}
      </main>
    </>
  );
};

export default Layout;
