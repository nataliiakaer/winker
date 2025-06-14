import css from "./ButtonUpdateLists.module.css";
import { PiArrowsClockwiseBold } from "react-icons/pi";
import { useDispatch } from "react-redux";
import {
  apiGetAllTasks,
  apiGetMyTasks,
  apiGetTasksAssignedToMe,
} from "../../redux/tasks/operations";
import toast from "react-hot-toast"; 

const ButtonUpdateLists = () => {
  const dispatch = useDispatch();

  const onUpdateLists = async () => {
    try {
      await Promise.all([
        dispatch(apiGetAllTasks()).unwrap(),
        dispatch(apiGetMyTasks()).unwrap(),
        dispatch(apiGetTasksAssignedToMe()).unwrap(),
      ]);
      toast.success("Списки завдань оновлено");
    } catch (error) {
      toast.error("Не вдалося оновити списки завдань", error);
    }
  };

  return (
    <button
      onClick={onUpdateLists}
      className={css.btnUpdate}
      title="Оновити списки завдань"
    >
      <PiArrowsClockwiseBold />
    </button>
  );
};

export default ButtonUpdateLists;
