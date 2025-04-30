// // Компонент авантажуж різні дані залежно від URL.

// import { useDispatch, useSelector } from "react-redux";
// import TasksList from "../../components/TasksList/TasksList";
// import css from "../TasksPage/TasksPage.module.css";
// import {
//   selectorMyTasks,
//   selectorTasksError,
//   selectorTasksIsLoading,
// } from "../../redux/tasks/selectors";
// import Loader from "../../components/Loader/Loader";
// import { useEffect } from "react";
// import { apiGetMyTasks } from "../../redux/tasks/operations";
// import { useLocation } from "react-router-dom";
// import TasksFilters from "../../components/TasksFilters/TasksFilters";
// import { selectFilteredMyTasks } from "../../redux/filters/selectors";

// const MyTasksPage = () => {
//   const isLoading = useSelector(selectorTasksIsLoading);
//   const error = useSelector(selectorTasksError);

//   // завдання (без фільтрів)
//   const myTasksRaw = useSelector(selectorMyTasks);

//   // завдання (з фільтрами)
//   const myTasks = useSelector(selectFilteredMyTasks);

//   const dispatch = useDispatch();
//   const location = useLocation();

//   useEffect(() => {
//     localStorage.setItem("lastVisitedTab", location.pathname);
//   }, [location.pathname]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       if (myTasksRaw.length === 0) {
//         await dispatch(apiGetMyTasks());
//       }
//     };

//     fetchTasks();
//   }, [dispatch, myTasksRaw.length]);

//   const getVisibleTasks = () => {
//     if (location.pathname === "/tasks/my-tasks") {
//       return myTasks;
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

// export default MyTasksPage;
