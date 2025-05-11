import { useParams } from "react-router-dom";
import css from "./TaskComments.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  selectorTaskComments,
  selectorTaskDetailsError,
  selectorTaskDetailsIsLoading,
} from "../../redux/tasks/selectors";
import Loader from "../Loader/Loader";
import { useEffect } from "react";
import { apiGetTaskComments } from "../../redux/tasks/operations";
import { selectorUsers } from "../../redux/user/selectors";

const TaskComments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const comments = useSelector(selectorTaskComments);
  const isLoading = useSelector(selectorTaskDetailsIsLoading);
  const error = useSelector(selectorTaskDetailsError);
  const users = useSelector(selectorUsers);

  useEffect(() => {
    if (!id) return;

    dispatch(apiGetTaskComments(id));
  }, [id, dispatch]);

  console.log(comments);

  const userName = (id) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      return `${user.firstName} ${user.lastName}`;
    }
    return "Невідомо";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";

    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      {Array.isArray(comments) && comments.length > 0 && (
        <section className={css.section}>
          <ul className={css.list}>
            {comments.map((comment) => {
              if (comment) {
                return (
                  <li className={css.item} key={comment.id}>
                    <p className={css.comment}>Коментар: {comment.comment}</p>
                    <p className={css.user}>
                      Користувач: {userName(comment.user)}
                    </p>
                    <p className={css.createdDate}>
                      Дата створення: {formatDate(comment.createdAt)}
                    </p>
                  </li>
                );
              }
              return;
            })}
          </ul>
        </section>
      )}

      {isLoading && <Loader />}
      {error && (
        <p>
          Whoops, something went wrong! Please try reloading this page or try
          again later!
        </p>
      )}
    </>
  );
};

export default TaskComments;
