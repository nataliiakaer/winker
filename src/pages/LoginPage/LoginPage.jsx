import LoginForm from "../../components/LoginForm/LoginForm.jsx";

const LoginPage = () => {
  return (
    <div>
      {/* умова: Якщо користувач залогінився, тоді буде відображатися список контактів та кнопка LogOut. Якщо не залогінився, тоді по центру форма для входу з логіном та паролем. */}
      <LoginForm />
    </div>
  );
};

export default LoginPage;
