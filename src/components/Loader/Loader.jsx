// Компонент з блоком, який відображається на екрані під час завантаження даних

import { ClipLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.backdrop}>
      <div className={css.container}>
        <p>Будь ласка зачекайте, дані завантажуються</p>
        <ClipLoader color="#1bab31" size={60} />
      </div>
    </div>
  );
};

export default Loader;
