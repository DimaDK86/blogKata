import { useForm } from "../../hooks";
import { registerUser } from "../../store/authSlice";
import { RegistrationForm } from "../../components";

export const Registration = () => {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { username: "", email: "", password: "" },
    // Валидация...
  );

  return (
    <RegistrationForm
      values={values}
      errors={errors}
      onChange={handleChange}
      onSubmit={handleSubmit(registerUser)}
    />
  );
};
