// Компонент відображає список завдань та їх розподілення

import css from "./TasksList.module.css";
import Task from "../Task/Task";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorListViewMode } from "../../redux/listViewMode/selector";
import clsx from "clsx";
import { RiLock2Fill } from "react-icons/ri";

const TasksList = ({ tasks, isLoading }) => {
  const location = useLocation();
  const MotionUl = motion.ul;
  const MotionLi = motion.li;
  const viewMode = useSelector(selectorListViewMode);

  if (!isLoading && (!tasks || tasks.length === 0)) {
    return <p>Список завдань порожній</p>;
  }

  // Сортування по декількох критеріях: спочатку по даті створення від новіших до старіших, а якщо дати однакові — по id)
  const sortedByDateThenId = [...tasks].sort((a, b) => {
    const dateDiff = new Date(b.created_at) - new Date(a.created_at);
    if (dateDiff !== 0) return dateDiff;
    return b.id - a.id; // Додаткове сортування, якщо дати однакові
  });

  // Сортування по id від найбільшого до найменшого:
  // const sortedByIdDesc = [...tasks].sort((a, b) => b.id - a.id);

  // Сортування по даті створення від новіших до старіших:
  // const sortedByDateTime = [...tasks].sort(
  //   (a, b) => new Date(b.created_at) - new Date(a.created_at)
  // );

  return (
    <AnimatePresence mode="wait">
      <MotionUl
        className={viewMode === "grid" ? css.listGrid : css.listList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        key={sortedByDateThenId.length} // для правильного перезавантаження анімації
      >
        {Array.isArray(sortedByDateThenId) &&
          sortedByDateThenId.map((task) => (
            <Link
              key={task.id}
              state={{ from: location }}
              to={`/tasks/${task.id}`}
              className={clsx(
                css.item,
                viewMode === "grid" ? css.itemGrid : css.itemList
              )}
            >
              <MotionLi
                key={task.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Task task={task} />
                {task.status === 2 && <RiLock2Fill className={css.isDone} />}
              </MotionLi>
            </Link>
          ))}
      </MotionUl>
    </AnimatePresence>
  );
};

export default TasksList;
