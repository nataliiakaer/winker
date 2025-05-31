import { useDispatch, useSelector } from "react-redux";
import { setModal } from "../../redux/tasks/slice";
import { selectorAddTaskModal } from "../../redux/tasks/selectors";
import AddTaskModal from "../../components/AddTaskModal/AddTaskModal";
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
    <div title="Modal">{modal && <AddTaskModal closeModal={closeModal} />}</div>
  );
};

export default AddTaskModalPage;
