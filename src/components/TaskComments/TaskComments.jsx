import { useParams } from "react-router-dom";
import css from "./TaskComments.module.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { selectorCurrentUser, selectorUsers } from "../../redux/user/selectors";
import toast from "react-hot-toast";
import {
  // selectorTaskDetails,
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
  apiGetMyTasks,
  apiGetTaskDetails,
  apiGetTasksAssignedToMe,
} from "../../redux/tasks/operations";
import { ToastContainer } from "react-toastify";

const TaskComments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const comments = useSelector(selectorTaskComments);
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);
  const users = useSelector(selectorUsers);
  const currentUser = useSelector(selectorCurrentUser);
  // const taskDetails = useSelector(selectorTaskDetails);
  // const taskAuthorId = taskDetails?.author;

  const [newComment, setNewComment] = useState("");
  const [isInputActive, setIsInputActive] = useState(false);

  const [editCommentId, setEditCommentId] = useState(null);
  const [editedText, setEditedText] = useState("");

  console.log(comments);

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

    dispatch(apiAddTaskComment({ id, formData }))
      .unwrap()
      .then(() => {
        toast.success("Коментар додано");
        dispatch(apiGetMyTasks());
        dispatch(apiGetTasksAssignedToMe());
        dispatch(apiGetTaskDetails(id));
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
        dispatch(apiGetMyTasks());
        dispatch(apiGetTasksAssignedToMe());
        dispatch(apiGetTaskDetails(id));
        dispatch(apiGetTaskComments(id));
      })
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
            {comments.map((comment) => (
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
      {/* Toast сповіщення */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
};

export default TaskComments;

// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   apiGetTaskComments,
//   apiAddTaskComment,
//   apiUpdateTaskComment,
//   apiDeleteTaskComment,
// } from "../../redux/comments/operations";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import {
//   selectorTasksError,
//   selectorTasksIsLoading,
// } from "../../redux/tasks/selectors";
// import { selectorTaskComments } from "../../redux/comments/selector";

// const TaskComments = ({ taskId }) => {
//   const dispatch = useDispatch();
//   const comments = useSelector(selectorTaskComments);
//   const isLoading = useSelector(selectorTasksIsLoading);
//   const error = useSelector(selectorTasksError);
//   //   const users = useSelector(selectorUsers);
//   //   const currentUser = useSelector(selectorCurrentUser);
//   //   const taskDetails = useSelector(selectorTaskDetails);
//   //   const taskAuthorId = taskDetails?.author;

//   //   const [newComment, setNewComment] = useState("");
//   //   const [isInputActive, setIsInputActive] = useState(false);

//   //   const [editCommentId, setEditCommentId] = useState(null);
//   //   const [editedText, setEditedText] = useState("");
//   const [newComment, setNewComment] = useState("");
//   const [editCommentId, setEditCommentId] = useState(null);
//   const [editedText, setEditedText] = useState("");

//   useEffect(() => {
//     if (taskId) {
//       dispatch(apiGetTaskComments(taskId));
//     }
//   }, [dispatch, taskId]);

//   const handleAddComment = () => {
//     if (!newComment.trim()) return;

//     const formData = {
//       comment: newComment.trim(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     dispatch(apiAddTaskComment({ taskId, formData }))
//       .unwrap()
//       .then(() => {
//         toast.success("Коментар додано!");
//         setNewComment("");
//         dispatch(apiGetTaskComments(taskId)); // оновлення списку
//       })
//       .catch(() => toast.error("Не вдалося додати коментар"));
//   };

//   const handleEdit = (comment) => {
//     setEditCommentId(comment.id);
//     setEditedText(comment.comment);
//   };

//   const handleSaveEdit = () => {
//     if (!editedText.trim()) return;

//     const formData = {
//       comment: editedText.trim(),
//       createdAt:
//         comments.find((c) => c.id === editCommentId)?.createdAt ||
//         new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     };

//     dispatch(
//       apiUpdateTaskComment({ taskId, commentId: editCommentId, formData })
//     )
//       .unwrap()
//       .then(() => {
//         toast.success("Коментар оновлено!");
//         setEditCommentId(null);
//         setEditedText("");
//         dispatch(apiGetTaskComments(taskId));
//       })
//       .catch(() => toast.error("Не вдалося оновити коментар"));
//   };

//   const handleDelete = (commentId) => {
//     const confirmDelete = window.confirm(
//       "Ви впевнені, що хочете видалити цей коментар?"
//     );
//     if (!confirmDelete) return;

//     dispatch(apiDeleteTaskComment({ taskId, commentId }))
//       .unwrap()
//       .then(() => {
//         toast.success("Коментар видалено!");
//         dispatch(apiGetTaskComments(taskId));
//       })
//       .catch(() => toast.error("Помилка при видаленні"));
//   };

//   return (
//     <div>
//       {isLoading && <Loader />}
//       {error && <p>Whoops, something went wrong! Please try again later.</p>}
//       <h3>Коментарі</h3>
//       <ul>
//         {comments.map((comment) => (
//           <li key={comment.id}>
//             {editCommentId === comment.id ? (
//               <>
//                 <input
//                   value={editedText}
//                   onChange={(e) => setEditedText(e.target.value)}
//                 />
//                 <button onClick={handleSaveEdit}>Зберегти</button>
//                 <button onClick={() => setEditCommentId(null)}>
//                   Скасувати
//                 </button>
//               </>
//             ) : (
//               <>
//                 <p>{comment.comment}</p>
//                 <small>{new Date(comment.createdAt).toLocaleString()}</small>
//                 <div>
//                   <button onClick={() => handleEdit(comment)}>
//                     Редагувати
//                   </button>
//                   <button onClick={() => handleDelete(comment.id)}>
//                     Видалити
//                   </button>
//                 </div>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//       <div>
//         <input
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Новий коментар"
//         />
//         <button onClick={handleAddComment}>Додати</button>
//       </div>
//       {/* Toast сповіщення */}
//       <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
//     </div>
//   );
// };

// export default TaskComments;
