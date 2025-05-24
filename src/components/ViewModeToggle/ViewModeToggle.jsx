import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import clsx from "clsx";
import css from "./ViewModeToggle.module.css";
import { selectorListViewMode } from "../../redux/listViewMode/selector";
import { setViewMode } from "../../redux/listViewMode/slice";

const ViewModeToggle = () => {
  const dispatch = useDispatch();
  const viewMode = useSelector(selectorListViewMode);

  return (
    <div className={css.wrapper}>
      <button
        data-tooltip-id="view-tooltip"
        data-tooltip-content="Список: один елемент в рядку"
        onClick={() => dispatch(setViewMode("list"))}
        className={clsx(css.button, {
          [css.active]: viewMode === "list",
        })}
        aria-label="Перемкнути на список"
      >
        📃
      </button>

      <button
        data-tooltip-id="view-tooltip"
        data-tooltip-content="Плитка: по два елементи в рядку"
        onClick={() => dispatch(setViewMode("grid"))}
        className={clsx(css.button, {
          [css.active]: viewMode === "grid",
        })}
        aria-label="Перемкнути на плитку"
      >
        🧱
      </button>

      <Tooltip id="view-tooltip" place="bottom" />
    </div>
  );
};

export default ViewModeToggle;
