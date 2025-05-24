// import { useDispatch } from "react-redux";
import css from "./TasksList.module.css";
import Task from "../Task/Task";
// import { apiDeleteTask } from "../../redux/tasks/operations";
// import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectorListViewMode } from "../../redux/listViewMode/selector";
import clsx from "clsx";

const TasksList = ({ tasks, isLoading }) => {
  const location = useLocation();
  // const dispatch = useDispatch();
  const MotionUl = motion.ul;
  const MotionLi = motion.li;
  const viewMode = useSelector(selectorListViewMode);

  if (!isLoading && (!tasks || tasks.length === 0)) {
    return <p>Список завдань порожній</p>;
  }

  const sortTaskDate = tasks.sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at)
  );

  // const onDeleteTask = (taskId) => {
  //   dispatch(apiDeleteTask(taskId))
  //     .unwrap()
  //     .then(() => {
  //       toast("Завдання успішно видалено");
  //     });
  // };

  return (
    <AnimatePresence mode="wait">
      <MotionUl
        className={viewMode === "grid" ? css.listGrid : css.listList}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        key={sortTaskDate.length} // для правильного перезавантаження анімації
      >
        {Array.isArray(sortTaskDate) &&
          sortTaskDate.map((task) => (
            <Link
              state={{ from: location }}
              to={`/tasks/${task.id}`}
              key={task.id}
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
                <Task task={task} /*onDeleteTask={onDeleteTask}*/ />
              </MotionLi>
            </Link>
          ))}
      </MotionUl>
    </AnimatePresence>
  );
};

export default TasksList;
