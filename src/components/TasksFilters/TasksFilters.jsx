import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  applyFilters,
  resetFilters,
  setDateFilter,
  setDateType,
  setStatus,
  setUrgency,
  setUserId,
  setUserRole,
} from "../../redux/filters/slice";

import css from "./TasksFilters.module.css";
import { selectFilters } from "../../redux/filters/selectors";
import { apiGetUsers } from "../../redux/user/operations";
import { selectorUsers } from "../../redux/user/selectors";

const TasksFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const users = useSelector(selectorUsers);

  useEffect(() => {
    dispatch(apiGetUsers());
  }, [dispatch]);

  const handleStatusChange = (e) => {
    dispatch(setStatus(e.target.value));
  };

  const handleUrgencyChange = (e) => {
    const { value, checked } = e.target;
    const newUrgency = checked
      ? [...filters.urgency, value]
      : filters.urgency.filter((item) => item !== value);
    dispatch(setUrgency(newUrgency));
  };

  const handleUserRoleChange = (e) => {
    dispatch(setUserRole(e.target.value));
  };

  const handleUserChange = (e) => {
    dispatch(setUserId(e.target.value));
  };

  const handleDateTypeChange = (e) => {
    dispatch(setDateType(e.target.value));
  };

  const handleDateFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    dispatch(
      setDateFilter({
        ...filters.dateFilter,
        [name]: type === "checkbox" ? checked : value,
      })
    );
  };

  return (
    <div className={css.filtersContainer}>
      {/* Фільтр 1 - Статус */}
      <div className={css.filterGroup}>
        <h4>Статус</h4>
        <label>
          <input
            type="checkbox"
            value="completed"
            onChange={handleStatusChange}
            checked={filters.status.includes("completed")}
          />{" "}
          Завершені задачі
        </label>
        <label>
          <input
            type="checkbox"
            value="not_completed"
            onChange={handleStatusChange}
            checked={filters.status.includes("not_completed")}
          />{" "}
          НЕ завершені задачі
        </label>
      </div>

      {/* Фільтр 2 - Терміновість */}
      <div className={css.filterGroup}>
        <h4>Терміновість</h4>
        <label>
          <input
            type="checkbox"
            value="slow"
            onChange={handleUrgencyChange}
            checked={filters.urgency.includes("slow")}
          />{" "}
          Повільно
        </label>
        <label>
          <input
            type="checkbox"
            value="fast"
            onChange={handleUrgencyChange}
            checked={filters.urgency.includes("fast")}
          />{" "}
          Швидко
        </label>
        <label>
          <input
            type="checkbox"
            value="very_fast"
            onChange={handleUrgencyChange}
            checked={filters.urgency.includes("very_fast")}
          />{" "}
          Дуже швидко
        </label>
      </div>

      {/* Фільтр 3 - Користувачі */}
      <div className={css.filterGroup}>
        <h4>Користувач</h4>
        <label>
          <input
            type="radio"
            name="userRole"
            value="responsible"
            onChange={handleUserRoleChange}
          />
          Відповідальний
        </label>
        <label>
          <input
            type="radio"
            name="userRole"
            value="creator"
            onChange={handleUserRoleChange}
          />
          Постановник
        </label>
        <select value={filters.userId || ""} onChange={handleUserChange}>
          <option value="">Користувач:</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      {/* Фільтр 4 - Дати */}
      <div className={css.filterGroup}>
        <h4>Період</h4>
        <label>
          <input
            type="radio"
            name="dateType"
            value="creation"
            onChange={handleDateTypeChange}
          />
          Дата постановки
        </label>
        <label>
          <input
            type="radio"
            name="dateType"
            value="deadline"
            onChange={handleDateTypeChange}
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
      {!filters.applied && (
        <div className={css.btnContainer}>
          <button
            className={css.btnFilter}
            type="button"
            onClick={() => dispatch(resetFilters())}
          >
            Очистити фільтри
          </button>
          <button
            className={css.btnFilter}
            type="button"
            onClick={() => dispatch(applyFilters())}
          >
            Застосувати фільтри
          </button>
        </div>
      )}
    </div>
  );
};

export default TasksFilters;
