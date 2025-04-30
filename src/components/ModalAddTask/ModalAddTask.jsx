import { useDispatch, useSelector } from "react-redux";
// import css from "./ModalAddTask.module.css";
import Modal from "react-modal";
import { selectorModalAddTask } from "../../redux/tasks/selectors";

const ModalAddTask = () => {
  const dispatch = useDispatch();
  const modal = useSelector(selectorModalAddTask);

  const closeModal = () => {
    dispatch(modal(false));
  };

  return (
    <Modal isOpen={modal}>
      Modal
      <button onClick={closeModal}>close</button>
    </Modal>
  );
};

export default ModalAddTask;
