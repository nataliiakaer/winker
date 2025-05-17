

import { useParams } from "react-router-dom";
import css from "./TaskComments.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { selectorUsers } from "../../redux/user/selectors";
import toast from "react-hot-toast";
import { selectorTasksError, selectorTasksIsLoading } from "../../redux/tasks/selectors";
import { selectorTaskComments } from "../../redux/comments/selector";
import { apiAddTaskComment, apiDeleteTaskComment, apiGetTaskComments } from "../../redux/comments/operations";

const TaskComments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const comments = useSelector(selectorTaskComments);
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);
  const users = useSelector(selectorUsers);

  const [newComment, setNewComment] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);

  useEffect(() => {
    if (!id) return;
    dispatch(apiGetTaskComments(id));
  }, [id, dispatch]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const now = new Date().toISOString();
    const formData = {
      comment: newComment.trim(),
      createdAt: now,
      updatedAt: now,
    };

    dispatch(apiAddTaskComment({ id, formData }));
    setNewComment("");
    setIsInputActive(false);
  };

  const handleDelete = (commentId) => {
    const confirmDelete = window.confirm(
      "Ви впевнені, що хочете видалити цей коментар?"
    );
    if (!confirmDelete) return;

    dispatch(apiDeleteTaskComment({ taskId: id, commentId }))
      .unwrap()
      .then(() => toast.success("Коментар видалено"))
      .catch(() => toast.error("Помилка при видаленні"));
  };

  const userName = (userId) => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : "Невідомо";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <p>Whoops, something went wrong! Please try again later.</p>}
      <section>
        <div
          className={`${css.containerNewComment} ${
            isInputActive ? css.activeContainer : ""
          }`}
        >
          <input
            type="text"
            placeholder="Додати завдання"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onFocus={() => setIsInputActive(true)}
            className={css.inputNewComment}
          />
          <button
            className={css.btnNewComment}
            type="button"
            onClick={handleAddComment}
          >
            +
          </button>
        </div>

        {Array.isArray(comments) && comments.length > 0 ? (
          <ul className={css.list}>
            {comments.map((comment) =>
              comment ? (
                <li className={css.item} key={comment.id}>
                  <p className={css.comment}>Коментар: {comment.comment}</p>
                  <p className={css.user}>
                    Користувач: {userName(comment.user)}
                  </p>
                  <p className={css.createdDate}>
                    Дата створення: {formatDate(comment.createdAt)}
                  </p>
                  <div className={css.commentControls}>
                    {/* <button onClick={() => handleEdit(comment)}>✎</button> */}
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className={css.btnDelete}
                    >
                      🗑
                    </button>
                  </div>
                </li>
              ) : null
            )}
          </ul>
        ) : (
          <p className={css.textNoReviews}>Коментарі відсутні</p>
        )}
      </section>
    </>
  );
};

export default TaskComments;
