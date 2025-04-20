// import { useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import TasksList from "../../components/TasksList/TasksList";
import css from "./TasksPage.module.css";
import {
  selectorTasksError,
  selectorTasksIsLoading,
} from "../../redux/tasks/selectors";
import Loader from "../../components/Loader/Loader";
import { useEffect } from "react";
import { apiGetAllTasks } from "../../redux/tasks/operations";

const TasksPage = () => {
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetAllTasks());
  }, [dispatch]);

  return (
    <div className={css.section}>
      {isLoading && <Loader />}
      {error !== null && (
        <p style={{ color: "red" }}>
          {error}. Будь ласка, спробуйте перезавантажити цю сторінку або зайти
          пізніше!
        </p>
      )}
      <TasksList />
    </div>
  );
};

export default TasksPage;
