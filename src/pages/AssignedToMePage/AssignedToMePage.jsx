// Компонент завантажує завдання, призначені для мене

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectorTasksAssidnedToMe } from "../../redux/tasks/selectors";
import { selectFilteredAssignedTasks } from "../../redux/filters/selectors";
import { apiGetTasksAssignedToMe } from "../../redux/tasks/operations";
import TasksContainer from "../../components/TasksContainer/TasksContainer";

const AssignedToMePage = () => {
  const dispatch = useDispatch();
  const assignedTasksList = useSelector(selectorTasksAssidnedToMe); // завдання (без фільтрів)
  const assignedTasks = useSelector(selectFilteredAssignedTasks); // завдання (з фільтрами)

  useEffect(() => {
    // перевірка, чи список завдань вже був завантажений, щоб не dispatch санку кожного разу
    if (assignedTasksList.length === 0) {
      dispatch(apiGetTasksAssignedToMe());
    }
  }, [dispatch, assignedTasksList.length]);

  const visibleTasks = assignedTasks;

  return <TasksContainer tasks={visibleTasks} />;
};

export default AssignedToMePage;
