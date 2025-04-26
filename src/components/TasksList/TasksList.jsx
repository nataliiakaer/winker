import { useDispatch } from "react-redux";
import css from "./TasksList.module.css";
import Task from "../Task/Task";
import { apiDeleteTask } from "../../redux/tasks/operations";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const TasksList = ({ tasks, isLoading }) => {
  const dispatch = useDispatch();
  const MotionUl = motion.ul;
  const MotionLi = motion.li;

  const onDeleteTask = (taskId) => {
    const action = apiDeleteTask(taskId);
    dispatch(action)
      .unwrap()
      .then(() => {
        toast("Завдання успішно видалено");
      });
  };

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
            <Task task={task} onDeleteTask={onDeleteTask} />
          </MotionLi>
        ))}
      </MotionUl>
    </AnimatePresence>
  );
};

export default TasksList;

// src/components/TaskList/TaskList.js

// // 1. Імпортуємо хук
// import { useSelector } from 'react-redux';
// import { Task } from '../Task/Task';

// const getVisibleTasks = (tasks, statusFilter) => {
//   switch (statusFilter) {
//     case 'active':
//       return tasks.filter((task) => !task.completed);
//     case 'completed':
//       return tasks.filter((task) => task.completed);
//     default:
//       return tasks;
//   }
// };

// export const TaskList = () => {
// 	// 2. Отримуємо масив завдань із стану Redux
//   const tasks = useSelector((state) => state.tasks.items);

//   // 3. Отримуємо значення фільтра із стану Redux
//   const statusFilter = useSelector((state) => state.filters.status);

//   // 4. Обчислюємо масив завдань, які необхідно відображати в інтерфейсі
//   const visibleTasks = getVisibleTasks(tasks, statusFilter);

//   return (
//     <ul className={css.list}>
//       {visibleTasks.map((task) => (
//         <li className={css.listItem} key={task.id}>
//           <Task task={task} />
//         </li>
//       ))}
//     </ul>
//   );
// };
