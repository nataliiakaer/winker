// Компонент з коментарями, їх додаванням/редагуванням/видаленням

import { useParams } from "react-router-dom";
import css from "./TaskComments.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { selectorCurrentUser, selectorUsers } from "../../redux/user/selectors";
import toast from "react-hot-toast";
import {
  selectorTasksError,
  selectorTasksIsLoading,
} from "../../redux/tasks/selectors";
import { selectorTaskComments } from "../../redux/comments/selector";
import {
  apiAddTaskComment,
  apiDeleteTaskComment,
  apiGetTaskComments,
  apiUpdateTaskComment,
} from "../../redux/comments/operations";
import {
  apiGetAllTasks,
  apiGetMyTasks,
  apiGetTaskDetails,
  apiGetTasksAssignedToMe,
} from "../../redux/tasks/operations";

const TaskComments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const comments = useSelector(selectorTaskComments);
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);
  const users = useSelector(selectorUsers);
  const currentUser = useSelector(selectorCurrentUser);

  const [newComment, setNewComment] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);
  const [editCommentId, setEditCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    if (!id) return;
    dispatch(apiGetTaskComments(id));
  }, [id, dispatch]);

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

  // Сортування по даті створення від новіших до старіших:
  const sortedByDateTime = [...comments].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const now = new Date().toISOString();
    const formData = {
      comment: newComment.trim(),
      createdAt: now,
      updatedAt: now,
    };

    dispatch(apiAddTaskComment({ id, formData }))
      .unwrap()
      .then(() => {
        toast.success("Коментар додано");
        dispatch(apiGetAllTasks());
        dispatch(apiGetMyTasks());
        dispatch(apiGetTasksAssignedToMe());
        dispatch(apiGetTaskDetails(id));
        dispatch(apiGetTaskComments(id));
      });

    setNewComment("");
    setIsInputActive(false);
  };

  const handleEdit = (comment) => {
    setEditCommentId(comment.id);
    setEditedText(comment.comment);
  };

  const handleSaveEdit = () => {
    if (!editedText.trim()) return;

    const formData = {
      comment: editedText.trim(),
    };

    dispatch(
      apiUpdateTaskComment({ taskId: id, commentId: editCommentId, formData })
    )
      .unwrap()
      .then(() => {
        toast.success("Коментар оновлено!");
        setEditCommentId(null);
        setEditedText("");
        dispatch(apiGetTaskComments(id));
      })
      .catch(() => toast.error("Не вдалося оновити коментар"));
  };

  const handleDelete = (commentId) => {
    const confirmDelete = window.confirm(
      "Ви впевнені, що хочете видалити цей коментар?"
    );
    if (!confirmDelete) return;

    dispatch(apiDeleteTaskComment({ taskId: id, commentId }))
      .unwrap()
      .then(() => {
        toast.success("Коментар видалено");
        dispatch(apiGetAllTasks());
        dispatch(apiGetMyTasks());
        dispatch(apiGetTasksAssignedToMe());
        dispatch(apiGetTaskDetails(id));
        dispatch(apiGetTaskComments(id));
      })
      .catch(() => toast.error("Помилка при видаленні"));
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
            placeholder="Додати коментар"
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
            {sortedByDateTime.map((comment) => (
              <li key={comment.id} className={css.item}>
                {editCommentId === comment.id ? (
                  <div className={css.editContainer}>
                    <input
                      type="text"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className={css.inputNewComment}
                    />
                    <button
                      onClick={handleSaveEdit}
                      className={css.btnSaveEdit}
                    >
                      💾
                    </button>
                    <button
                      onClick={() => setEditCommentId(null)}
                      className={css.btnCancelEdit}
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <p className={css.comment}> {comment.comment}</p>
                    <p className={css.user}>{userName(comment.user)}</p>
                    <p className={css.createdDate}>
                      {formatDate(comment.createdAt)}
                    </p>

                    <div className={css.commentControls}>
                      {currentUser.id === comment.user && (
                        <button onClick={() => handleEdit(comment)}>✎</button>
                      )}
                      {/* Видалити може тільки той, хто створив коментар: */}
                      {/* {(currentUser.id === comment.user ||
                        currentUser.id === taskAuthorId) && (
                        <button
                          onClick={() => handleDelete(comment.id)}
                          className={css.btnDelete}
                        >
                          🗑
                        </button>
                      )} */}
                      <button
                        onClick={() => handleDelete(comment.id)}
                        className={css.btnDelete}
                      >
                        🗑
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className={css.textNoReviews}>Коментарі відсутні</p>
        )}
      </section>
    </>
  );
};

export default TaskComments;
