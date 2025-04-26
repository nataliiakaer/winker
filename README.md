# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

Наявний код:

//файл App.jsx
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route
            path="/tasks"
            element={<PrivateRoute component={<TasksPage />}></PrivateRoute>}
          /> */}
          <Route
            path="/tasks"
            element={<PrivateRoute component={<TasksPage />}></PrivateRoute>}
          >
            <Route
              path="my-tasks"
              element={<PrivateRoute component={<TasksPage />}></PrivateRoute>}
            />
            <Route
              path="assigned-to-me"
              element={<PrivateRoute component={<TasksPage />}></PrivateRoute>}
            />
          </Route>
          <Route
            path="/login_check"
            element={<RestrictedRoute component={<LoginPage />} />}
          />
          <Route path="*" element={<NotFoundPage />} /> // перехід за неіснуючим
          посиланням
        </Routes>


//файл AppBar.jsx
const AppBar = () => {
  const isLoggedIn = useSelector(selectorAuthIsLoggedIn);

  return (
    <div className={css.container}>
      <nav>
        <NavLink to="/" className={css.link}>
          Winker
        </NavLink>
      </nav>

      {isLoggedIn ? <UserMenu /> : <AuthNav />}
    </div>
  );
};

//файл UserMenu.jsx
const activeLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const UserMenu = () => {
  return (
    <div className={css.container}>
      <NavLink to="/tasks" className={activeLinkClass}>
        Всі завдання
      </NavLink>
      <NavLink to="/tasks/my-tasks" className={activeLinkClass}>
        Завдання від мене
      </NavLink>
      <NavLink to="/tasks/assigned-to-me" className={activeLinkClass}>
        Завдання для мене
      </NavLink>

      {/* немає шляху на бекенді, щоб користувач виходив. Наприклад, POST /api/logout */}
      {/* <NavLink to="/login_check">
        <button className={css.logoutBnt} type="button" onClick={() => {}}>
          Вийти
        </button>
      </NavLink> */}
    </div>
  );
};

//файл TasksPage.jsx
const TasksPage = () => {
  const isLoading = useSelector(selectorTasksIsLoading);
  const error = useSelector(selectorTasksError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetTasksAssignedToMe());
  }, [dispatch]);

  return (
    <div className={css.section}>
      {isLoading && <Loader />}
      {error !== null && (
        <p style={{ color: "red" }}>
          {error}. Будь ласка, спробуйте перезавантажити цю сторінку або зайти
          пізніше!
        </p>
      )}
      <TasksList />
    </div>
  );
};

//файл TasksList.jsx
const TasksList = () => {
  const dispatch = useDispatch();
  const visibleTasks = useSelector(selectorUserTasks);

  const onDeleteTask = (taskId) => {
    const action = apiDeleteTask(taskId);
    dispatch(action)
      .unwrap()
      .then(() => {
        toast("Завдання успішно видалено");
      });
  };

  return (
    <ul className={css.list}>
      {/* {visibleTasks?.length === 0 && <li>Список завдань порожній</li>} */}
      {Array.isArray(visibleTasks) &&
        visibleTasks.map((task) => (
          <li key={task.id} className={css.item}>
            <Task task={task} onDeleteTask={onDeleteTask}></Task>
          </li>
        ))}
    </ul>
  );
};

//файл operations.js
export const apiGetTasksAssignedToMe = createAsyncThunk(
  "tasks/getTasksAssignedToMe",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("api/tasks/assigned-to-me");
      console.log(data);
      return data; // те, що повертається з санки потрапляє в action.payload в статусі fullfilled
    } catch (error) {
      return thunkApi.rejectWithValue(error.message); // те, що повертається з санки потрапляє в action.payload в статусі rejected
    }
  }
);

export const apiGetMyTasks = createAsyncThunk(
  "tasks/getMyTasks",
  async (_, thunkApi) => {
    try {
      const { data } = await instance.get("api/tasks/my-tasks");
      console.log(data);
      return data; // те, що повертається з санки потрапляє в action.payload в статусі fullfilled
    } catch (error) {
      return thunkApi.rejectWithValue(error.message); // те, що повертається з санки потрапляє в action.payload в статусі rejected
    }
  }
);


//файл slice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  apiDeleteTask,
  apiGetMyTasks,
  apiGetTasksAssignedToMe,
} from "./operations";

const INITIAL_STATE = {
  tasks: [],
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(apiGetTasksAssignedToMe.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetTasksAssignedToMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(apiGetTasksAssignedToMe.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiGetMyTasks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiGetMyTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tasks = action.payload;
      })
      .addCase(apiGetMyTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(apiDeleteTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(apiDeleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.tasks = state.tasks.filter(
          (task) => task.id !== action.payload.id
        );
      })
      .addCase(apiDeleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;


