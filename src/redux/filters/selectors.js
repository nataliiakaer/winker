import { createSelector } from "@reduxjs/toolkit";

// Вибираємо всі завдання
export const selectAllTasks = (state) => state.tasks.allTasks;
export const selectMyTasks = (state) => state.tasks.myTasks;
export const selectAssignedTasks = (state) => state.tasks.assignedTasks;

// Вибираємо фільтри
export const selectAllTasksFilters = (state) => state.filters.tasksFilters;
export const selectMyTasksFilters = (state) => state.filters.myTasksFilters;
export const selectAssignedTasksFilters = (state) =>
  state.filters.assignedTasksFilters;

//  1. Фільтрація для ВСІХ завдань
export const selectFilteredAllTasks = createSelector(
  [selectAllTasks, selectAllTasksFilters],
  (tasks, filters) => {
    if (!tasks) return [];

    return applyFilters(tasks, filters);
  }
);

//  2. Фільтрація для "Завдання від мене"
export const selectFilteredMyTasks = createSelector(
  [selectMyTasks, selectMyTasksFilters],
  (tasks, filters) => {
    if (!tasks) return [];

    return applyFilters(tasks, filters);
  }
);

//  3. Фільтрація для "Завдання для мене"
export const selectFilteredAssignedTasks = createSelector(
  [selectAssignedTasks, selectAssignedTasksFilters],
  (tasks, filters) => {
    if (!tasks) return [];

    return applyFilters(tasks, filters);
  }
);

//  Функція фільтрації (Одна спільна для всіх)
const applyFilters = (tasks, filters) => {
  return (
    tasks
      .filter((task) => {
        //Фільтрація по статусу виконання
        const selectedStatuses = filters.status;

        // Якщо обидва вибрані — показуємо все
        if (
          selectedStatuses.includes("completed") &&
          selectedStatuses.includes("not_completed")
        ) {
          return true;
        }

        if (selectedStatuses.includes("completed") && task.status !== 2)
          return false;
        if (selectedStatuses.includes("not_completed") && task.status === 2)
          return false;

        return true;
      })

      .filter((task) => {
        // Фільтр по терміновості
        if (
          filters.wink_type.length > 0 &&
          !filters.wink_type.includes(mapWinkType(task.wink_type))
        ) {
          return false;
        }
        return true;
      })
      // .filter((task) => {
      //   const selectedSpeed = filters.wink_type;
      //   // Фільтрація по швидкості
      //   if (selectedSpeed.length === 0) {
      //     return true; // Якщо нічого не вибрано — показуємо все
      //   }

      //   // Якщо завдання має тип, який вибраний
      //   if (
      //     (selectedSpeed.includes("slow") && task.wink_type === 0) ||
      //     (selectedSpeed.includes("fast") && task.wink_type === 1) ||
      //     (selectedSpeed.includes("very_fast") && task.wink_type === 2)
      //   ) {
      //     return true;
      //   }

      //   return false;
      // })

      .filter((task) => {
        // Фільтрація по відповідальному або постановнику
        if (!filters.userRole || !filters.userId) {
          return true; // Якщо не вибрана роль або користувач — фільтр не застосовується
        }

        if (filters.userRole === "responsible") {
          return task.performer_id === Number(filters.userId);
        }

        if (filters.userRole === "creator") {
          return task.user_id === Number(filters.userId);
        }

        return true;
      })
      

      .filter((task) => {
        const { dateType, dateFilter } = filters;

        let taskDate = null;

        // Визначаємо дату по вибору
        if (dateType === "creation") {
          taskDate = task.created_at;
        } else if (dateType === "deadline") {
          taskDate = task.finished_date;
        }

        if (!taskDate) return true; // Якщо у завдання немає дати — НЕ виключати, показати

        const formattedTaskDate = taskDate.split("T")[0];

        // Якщо обраний "Поточний день"
        if (dateFilter.currentDay) {
          const today = new Date().toISOString().split("T")[0];
          return formattedTaskDate === today;
        }

        // Якщо обрано обидві дати "Від" і "До"
        if (dateFilter.from && dateFilter.to) {
          return (
            formattedTaskDate >= dateFilter.from &&
            formattedTaskDate <= dateFilter.to
          );
        }

        // Якщо користувач не вибрав нічого по датах — показуємо завдання
        return true;
      })
  );
};

// Допоміжна функція для порівняння терміновості
const mapWinkType = (winkTypeValue) => {
  switch (winkTypeValue) {
    case 0:
      return "slow";
    case 1:
      return "fast";
    case 2:
      return "very_fast";
    default:
      return "";
  }
};

// import { createSelector } from "@reduxjs/toolkit";

// // Вибираємо всі завдання
// export const selectTasks = (state) => state.tasks.allTasks;

// // Вибираємо поточні фільтри
// export const selectAllTasksFilters = (state) => state.filters.tasksFilters;
// export const selectMyTasksFilters = (state) => state.filters.myTasksFilters;
// export const selectAssignedTasksFilters = (state) =>
//   state.filters.assignedTasksFilters;

// // Основний селектор фільтрації завдань
// export const selectFilteredTasks = createSelector(
//   [selectTasks, selectAllTasksFilters],
//   (tasks, filters) => {
//     if (!tasks) return [];

//     return tasks
//       .filter((task) => {
//         //Фільтрація по статусу виконання
//         const selectedStatuses = filters.status;

//         // Якщо обидва вибрані — показуємо все
//         if (
//           selectedStatuses.includes("completed") &&
//           selectedStatuses.includes("not_completed")
//         ) {
//           return true;
//         }

//         if (selectedStatuses.includes("completed") && task.status !== 2)
//           return false;
//         if (selectedStatuses.includes("not_completed") && task.status === 2)
//           return false;

//         return true;
//       })

//       .filter((task) => {
//         const selectedSpeed = filters.wink_type;
//         // Фільтрація по швидкості
//         if (selectedSpeed.length === 0) {
//           return true; // Якщо нічого не вибрано — показуємо все
//         }

//         // Якщо завдання має тип, який вибраний
//         if (
//           (selectedSpeed.includes("slow") && task.wink_type === 0) ||
//           (selectedSpeed.includes("fast") && task.wink_type === 1) ||
//           (selectedSpeed.includes("very_fast") && task.wink_type === 2)
//         ) {
//           return true;
//         }

//         return false;
//       })

//       .filter((task) => {
//         // Фільтрація по відповідальному або постановнику
//         if (!filters.userRole || !filters.userId) {
//           return true; // Якщо не вибрана роль або користувач — фільтр не застосовується
//         }

//         if (filters.userRole === "responsible") {
//           return task.performer_id === Number(filters.userId);
//         }

//         if (filters.userRole === "creator") {
//           return task.user_id === Number(filters.userId);
//         }

//         return true;
//       })

//       .filter((task) => {
//         const { dateType, dateFilter } = filters;

//         let taskDate = null;

//         // Визначаємо дату по вибору
//         if (dateType === "creation") {
//           taskDate = task.created_at;
//         } else if (dateType === "deadline") {
//           taskDate = task.finished_date;
//         }

//         if (!taskDate) return true; // Якщо у завдання немає дати — НЕ виключати, показати

//         const formattedTaskDate = taskDate.split("T")[0];

//         // Якщо обраний "Поточний день"
//         if (dateFilter.currentDay) {
//           const today = new Date().toISOString().split("T")[0];
//           return formattedTaskDate === today;
//         }

//         // Якщо обрано обидві дати "Від" і "До"
//         if (dateFilter.from && dateFilter.to) {
//           return (
//             formattedTaskDate >= dateFilter.from &&
//             formattedTaskDate <= dateFilter.to
//           );
//         }

//         // Якщо користувач не вибрав нічого по датах — показуємо завдання
//         return true;
//       });
//   }
// );
