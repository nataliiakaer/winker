import { useEffect, useState } from "react";
import css from "./ScrollToTopButton.module.css";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 200) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    visible && (
      <button
        className={css.scrollToTop}
        onClick={scrollToTop}
        aria-label="Вгору"
      >
        ↑
      </button>
    )
  );
};

export default ScrollToTopButton;
