import React from "react";

const TasksList = () => {
  return (
    <div>
      <p>Task</p>
      <p>Task</p>

      <p>Task</p>

      <p>Task</p>

      <p>Task</p>

      <p>Task</p>

      <p>Task</p>

      <p>Task</p>

      {/* коли завантажується список завдань після входу, добавити Індикатор завантаження */}

      {/* {loading && (
        <ClipLoader
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {error && (
        <p>
          На жаль, щось пішло не так! Будь ласка, спробуйте перезавантажити цю
          сторінку або зайти пізніше!
        </p>
      )}
      {tasks.length > 0 && <TasksList items={tasks} />} */}
    </div>
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
