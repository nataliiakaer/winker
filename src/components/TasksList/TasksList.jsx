import { useDispatch, useSelector } from "react-redux";
import css from "./TasksList.module.css";
import { selectorUserTasks } from "../../redux/tasks/selectors";
import Task from "../Task/Task";
import { apiDeleteTask } from "../../redux/tasks/operations";
import toast from "react-hot-toast";

const TasksList = () => {
  const dispatch = useDispatch();
  const visibleTasks = useSelector(selectorUserTasks);

  const onDeleteTask = (taskId) => {
    const action = apiDeleteTask(taskId);
    dispatch(action)
      .unwrap()
      .then(() => {
        toast("Завдання успішно видалено");
      });
  };

  return (
    <ul className={css.list}>
      {Array.isArray(visibleTasks) &&
        visibleTasks.map((task) => (
          <li key={task.id} className={css.item}>
            <Task task={task} onDeleteTask={onDeleteTask}></Task>
          </li>
        ))}
    </ul>
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
