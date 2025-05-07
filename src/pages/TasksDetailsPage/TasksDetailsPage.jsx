import { NavLink, Outlet, useParams } from "react-router-dom";
import Task from "../../components/Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { apiGetTaskDetails } from "../../redux/tasks/operations";
import {
  selectorTaskDetails,
  selectorTaskkDetailsError,
  selectorTaskkDetailsIsLoading,
} from "../../redux/tasks/selectors";
import Loader from "../../components/Loader/Loader";

const TasksDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const taskDetails = useSelector(selectorTaskDetails);
  const isLoading = useSelector(selectorTaskkDetailsIsLoading);
  const error = useSelector(selectorTaskkDetailsError);

  console.log(id);

  useEffect(() => {
    if (!id) return;

    dispatch(apiGetTaskDetails(id));
  }, [id, dispatch]);

  console.log(taskDetails);

  return (
    <>
      {isLoading && <Loader />}
      {error ? (
        <p style={{ color: "red" }}>
          {error}. Будь ласка, спробуйте перезавантажити сторінку!
        </p>
      ) : (
        taskDetails?.id && (
          <div>
            Task id {id}
            <Task task={taskDetails} />
            <div>
              <NavLink to="comments">Коментарі</NavLink>
              <NavLink to="files">Файли</NavLink>
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default TasksDetailsPage;
