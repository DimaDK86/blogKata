import { useForm } from "../../hooks";
import { loginUser } from "../../store/authSlice";
import { AuthForm } from "../../components";

export const AuthPage = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { email: "", password: "" },
    (values) => {
      const errors = {};
      if (!values.email) errors.email = "Email обязателен";
      if (!values.password) errors.password = "Пароль обязателен";
      return errors;
    },
  );

  const onSubmit = () => {
    loginUser(values);
  };

  return (
    <AuthForm
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
