import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setStatus,
  setWinkType,
  setUserRole,
  setUserId,
  setDateType,
  setDateFilter,
  resetTasksFilters,
  setMyTasksStatus,
  setMyTasksSWinkType,
  setMyTasksSUserRole,
  setMyTasksSUserId,
  setMyTasksSDateType,
  setMyTasksSDateFilter,
  resetMyTasksFilters,
  setAssignedToMeStatus,
  setAssignedToMeWinkType,
  setAssignedToMeUserRole,
  setAssignedToMeUserId,
  setAssignedToMeDateType,
  setAssignedToMeDateFilter,
  resetAssignedTasksFilters,
} from "../../redux/filters/slice";

import css from "./TasksFilters.module.css";
import { selectorUsers } from "../../redux/user/selectors";
import { apiGetUsers } from "../../redux/user/operations";
import { useLocation } from "react-router-dom";

const TasksFilters = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectorUsers);
  const location = useLocation();

  // Автоматично визначаємо правильні фільтри для поточної вкладки
  const filters = useSelector((state) => {
    if (location.pathname === "/tasks") return state.filters.tasksFilters;
    if (location.pathname === "/tasks/my-tasks")
      return state.filters.myTasksFilters;
    if (location.pathname === "/tasks/assigned-to-me")
      return state.filters.assignedTasksFilters;
    return state.filters.tasksFilters;
  });

  // Автоматично визначаємо правильний dispatch-функціонал
  const getAction = (actionTasks, actionMyTasks, actionAssignedTasks) => {
    if (location.pathname === "/tasks") return actionTasks;
    if (location.pathname === "/tasks/my-tasks") return actionMyTasks;
    if (location.pathname === "/tasks/assigned-to-me")
      return actionAssignedTasks;
    return actionTasks;
  };

  useEffect(() => {
    dispatch(apiGetUsers());
  }, [dispatch]);

  const handleStatusChange = (e) => {
    const { value, checked } = e.target;
    const newStatus = checked
      ? [...filters.status, value]
      : filters.status.filter((item) => item !== value);
    dispatch(
      getAction(setStatus, setMyTasksStatus, setAssignedToMeStatus)(newStatus)
    );
  };

  const handleWinkTypeChange = (e) => {
    const { value, checked } = e.target;
    const newWinkType = checked
      ? [...filters.wink_type, value]
      : filters.wink_type.filter((item) => item !== value);
    dispatch(
      getAction(
        setWinkType,
        setMyTasksSWinkType,
        setAssignedToMeWinkType
      )(newWinkType)
    );
  };

  const handleUserRoleChange = (e) => {
    dispatch(
      getAction(
        setUserRole,
        setMyTasksSUserRole,
        setAssignedToMeUserRole
      )(e.target.value)
    );
  };

  const handleUserChange = (e) => {
    dispatch(
      getAction(
        setUserId,
        setMyTasksSUserId,
        setAssignedToMeUserId
      )(e.target.value)
    );
  };

  const handleDateTypeChange = (e) => {
    dispatch(
      getAction(
        setDateType,
        setMyTasksSDateType,
        setAssignedToMeDateType
      )(e.target.value)
    );
  };

  const handleDateFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch(
      getAction(
        setDateFilter,
        setMyTasksSDateFilter,
        setAssignedToMeDateFilter
      )({
        ...filters.dateFilter,
        [name]: type === "checkbox" ? checked : value,
      })
    );
  };

  const handleResetFilters = () => {
    if (location.pathname === "/tasks") {
      dispatch(resetTasksFilters());
    } else if (location.pathname === "/tasks/my-tasks") {
      dispatch(resetMyTasksFilters());
    } else if (location.pathname === "/tasks/assigned-to-me") {
      dispatch(resetAssignedTasksFilters());
    }
  };

  return (
    <div className={css.filtersContainer}>
      {/* Статус */}
      <div className={css.filterGroup}>
        <h4>Статус</h4>
        <label>
          <input
            type="checkbox"
            value="completed"
            onChange={handleStatusChange}
            checked={filters.status.includes("completed")}
          />
          Завершені задачі
        </label>
        <label>
          <input
            type="checkbox"
            value="not_completed"
            onChange={handleStatusChange}
            checked={filters.status.includes("not_completed")}
          />
          НЕ завершені задачі
        </label>
      </div>

      {/* Терміновість */}
      <div className={css.filterGroup}>
        <h4>Терміновість</h4>
        <label>
          <input
            type="checkbox"
            value="slow"
            onChange={handleWinkTypeChange}
            checked={filters.wink_type.includes("slow")}
          />
          Звичайний
        </label>
        <label>
          <input
            type="checkbox"
            value="fast"
            onChange={handleWinkTypeChange}
            checked={filters.wink_type.includes("fast")}
          />
          Терміновий
        </label>
        <label>
          <input
            type="checkbox"
            value="very_fast"
            onChange={handleWinkTypeChange}
            checked={filters.wink_type.includes("very_fast")}
          />
          Дуже терміновий
        </label>
      </div>

      {/* Користувач */}
      <div className={css.filterGroup}>
        <h4>Користувач</h4>
        <label>
          <input
            type="radio"
            name="userRole"
            value="responsible"
            onChange={handleUserRoleChange}
            checked={filters.userRole === "responsible"}
          />
          Відповідальний
        </label>
        <label>
          <input
            type="radio"
            name="userRole"
            value="creator"
            onChange={handleUserRoleChange}
            checked={filters.userRole === "creator"}
          />
          Постановник
        </label>
        <select value={filters.userId || ""} onChange={handleUserChange}>
          <option value="">Користувач:</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.firstName} {user.lastName}
            </option>
          ))}
        </select>
      </div>

      {/* Період */}
      <div className={css.filterGroup}>
        <h4>Період</h4>
        <label>
          <input
            type="radio"
            name="dateType"
            value="creation"
            onChange={handleDateTypeChange}
            checked={filters.dateType === "creation"}
          />
          Дата постановки
        </label>
        <label>
          <input
            type="radio"
            name="dateType"
            value="deadline"
            onChange={handleDateTypeChange}
            checked={filters.dateType === "deadline"}
          />
          Дата виконання
        </label>
        <label>
          <input
            type="checkbox"
            name="currentDay"
            checked={filters.dateFilter.currentDay}
            onChange={handleDateFilterChange}
          />
          Поточний день
        </label>
        {!filters.dateFilter.currentDay && (
          <div className={css.dateRangeInputs}>
            <label>
              Від:
              <input
                type="date"
                name="from"
                value={filters.dateFilter.from || ""}
                onChange={handleDateFilterChange}
              />
            </label>
            <label>
              До:
              <input
                type="date"
                name="to"
                value={filters.dateFilter.to || ""}
                onChange={handleDateFilterChange}
              />
            </label>
          </div>
        )}
      </div>

      {/* Кнопка очищення */}
      <div className={css.btnContainer}>
        <button
          className={css.btnFilter}
          type="button"
          onClick={handleResetFilters}
        >
          Очистити фільтри
        </button>
      </div>
    </div>
  );
};

export default TasksFilters;
