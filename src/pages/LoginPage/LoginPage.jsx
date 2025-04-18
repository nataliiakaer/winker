import LoginForm from "../../components/LoginForm/LoginForm.jsx";

const LoginPage = () => {
  return (
    <div>
      {/* умова: Якщо користувач залогінився, тоді буде відображатися список контактів та кнопка LogOut. Якщо не залогінився, тоді по центру форма для входу з логіном та паролем. */}
      <LoginForm />

      {/* коли завантажується список завдань після входу, добавити Індикатор завантаження */}

      {/* {loading && (
        <ClipLoader
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}
      {error && (
        <p>
          На жаль, щось пішло не так! Будь ласка, спробуйте перезавантажити цю
          сторінку або зайти пізніше!
        </p>
      )}
      {tasks.length > 0 && <TasksList items={tasks} />} */}
    </div>
  );
};

export default LoginPage;
