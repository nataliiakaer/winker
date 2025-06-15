// Сторінка для додавання нового завдання

import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/tasks/slice";
import { selectorAddTaskModal } from "../../redux/tasks/selectors";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import { useNavigate } from "react-router-dom";

const AddTaskModalPage = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectorAddTaskModal);
  const navigate = useNavigate();

  const closeModal = () => {
    dispatch(setModal(false));
    navigate(-1);
  };

  return (
    <div title="Modal">{modal && <AddTaskForm closeModal={closeModal} />}</div>
  );
};

export default AddTaskModalPage;
