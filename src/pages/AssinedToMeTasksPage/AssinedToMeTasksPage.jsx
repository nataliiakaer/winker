// // Компонент авантажуж різні дані залежно від URL.

// import { useDispatch, useSelector } from "react-redux";
// import TasksList from "../../components/TasksList/TasksList";
// import css from "../TasksPage/TasksPage.module.css";
// import {
//   selectorTasksAssidnedToMe,
//   selectorTasksError,
//   selectorTasksIsLoading,
// } from "../../redux/tasks/selectors";
// import Loader from "../../components/Loader/Loader";
// import { useEffect } from "react";
// import { apiGetTasksAssignedToMe } from "../../redux/tasks/operations";
// import { useLocation } from "react-router-dom";
// import TasksFilters from "../../components/TasksFilters/TasksFilters";
// import { selectFilteredAssignedTasks } from "../../redux/filters/selectors";

// const AssinedToMeTasksPage = () => {
//   const isLoading = useSelector(selectorTasksIsLoading);
//   const error = useSelector(selectorTasksError);

//   // завдання (без фільтрів)
//   const assignedTasksRaw = useSelector(selectorTasksAssidnedToMe);

//   // завдання (з фільтрами)
//   const assignedTasks = useSelector(selectFilteredAssignedTasks);

//   const dispatch = useDispatch();
//   const location = useLocation();

//   useEffect(() => {
//     localStorage.setItem("lastVisitedTab", location.pathname);
//   }, [location.pathname]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (assignedTasksRaw.length === 0) {
//         await dispatch(apiGetTasksAssignedToMe());
//       }
//     };

//     fetchTasks();
//   }, [dispatch, assignedTasksRaw.length]);

//   const getVisibleTasks = () => {
//     if (location.pathname === "/tasks/assigned-to-me") {
//       return assignedTasks;
//     }
//     return [];
//   };

//   const visibleTasks = getVisibleTasks();

//   return (
//     <div className={css.pageWrapper}>
//       <TasksFilters />
//       <div className={css.contentWrapper}>
//         {isLoading && <Loader />}
//         {error && (
//           <p style={{ color: "red" }}>
//             {error}. Будь ласка, спробуйте перезавантажити сторінку!
//           </p>
//         )}
//         <TasksList tasks={visibleTasks} isLoading={isLoading} />
//       </div>
//     </div>
//   );
// };

// export default AssinedToMeTasksPage;
