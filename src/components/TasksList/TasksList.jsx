// import { useDispatch } from "react-redux";
import css from "./TasksList.module.css";
import Task from "../Task/Task";
// import { apiDeleteTask } from "../../redux/tasks/operations";
// import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const TasksList = ({ tasks, isLoading }) => {
  // const dispatch = useDispatch();
  const MotionUl = motion.ul;
  const MotionLi = motion.li;

  // const onDeleteTask = (taskId) => {
  //   const action = apiDeleteTask(taskId);
  //   dispatch(action)
  //     .unwrap()
  //     .then(() => {
  //       toast("Завдання успішно видалено");
  //     });
  // };

  if (!isLoading && (!tasks || tasks.length === 0)) {
    return <p>Список завдань порожній</p>;
  }

  return (
    <AnimatePresence mode="wait">
      <MotionUl
        className={css.list}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        key={tasks.length} // для правильного перезавантаження анімації
      >
        {tasks.map((task) => (
          <MotionLi
            key={task.id}
            className={css.item}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <Task task={task} /*onDeleteTask={onDeleteTask}*/ />
          </MotionLi>
        ))}
      </MotionUl>
    </AnimatePresence>
  );
};

export default TasksList;
