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

//__________________________________________________________________________________________________________________________________________________________

// import { useDispatch, useSelector } from "react-redux";
// import { selectTasks, selectFilters } from "../../redux/tasks/selectors";
// import { apiDeleteTask } from "../../redux/tasks/operations";
// import { motion, AnimatePresence } from "framer-motion";
// import toast from "react-hot-toast";
// import css from "./TasksList.module.css";
// import Task from "../Task/Task";

// const MotionUl = motion.ul;
// const MotionLi = motion.li;

// const TasksList = ({ isLoading }) => {
//   const dispatch = useDispatch();
//   const tasks = useSelector(selectTasks);
//   const filters = useSelector(selectFilters);

//   const onDeleteTask = (taskId) => {
//     const action = apiDeleteTask(taskId);
//     dispatch(action)
//       .unwrap()
//       .then(() => {
//         toast("Завдання успішно видалено");
//       });
//   };

//   const applyFilters = (tasks) => {
//     return tasks
//       .filter((task) => {
//         // Фільтр статусу
//         if (filters.status === "completed" && !task.completed) return false;
//         if (filters.status === "not_completed" && task.completed) return false;
//         return true;
//       })
//       .filter((task) => {
//         // Фільтр терміновості
//         if (filters.urgency.length === 0) return true;
//         return filters.urgency.includes(task.urgency);
//       })
//       .filter((task) => {
//         // Фільтр користувача
//         if (!filters.userRole || !filters.userId) return true;
//         if (filters.userRole === "responsible" && task.responsibleUserId !== filters.userId) return false;
//         if (filters.userRole === "creator" && task.creatorUserId !== filters.userId) return false;
//         return true;
//       })
//       .filter((task) => {
//         // Фільтр дати
//         if (filters.dateFilter.currentDay) {
//           const today = new Date().toISOString().split("T")[0];
//           const taskDate = filters.dateType === "creation" ? task.createdAt.split("T")[0] : task.deadlineAt.split("T")[0];
//           return taskDate === today;
//         }

//         if (filters.dateFilter.from && filters.dateFilter.to) {
//           const taskDate = filters.dateType === "creation" ? task.createdAt.split("T")[0] : task.deadlineAt.split("T")[0];
//           return taskDate >= filters.dateFilter.from && taskDate <= filters.dateFilter.to;
//         }

//         return true;
//       });
//   };

//   const filteredTasks = applyFilters(tasks);

//   if (isLoading) {
//     return (
//       <ul className={css.list}>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <li key={index} className={css.item}>
//             Завантаження...
//           </li>
//         ))}
//       </ul>
//     );
//   }

//   if (filteredTasks.length === 0) {
//     return <p>Список завдань порожній</p>;
//   }

//   return (
//     <AnimatePresence mode="wait">
//       <MotionUl
//         className={css.list}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.3 }}
//         key={filteredTasks.length}
//       >
//         {filteredTasks.map((task) => (
//           <MotionLi
//             key={task.id}
//             className={css.item}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             transition={{ duration: 0.3 }}
//           >
//             <Task task={task} onDeleteTask={onDeleteTask} />
//           </MotionLi>
//         ))}
//       </MotionUl>
//     </AnimatePresence>
//   );
// };

// export default TasksList;
