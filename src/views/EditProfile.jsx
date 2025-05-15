import { useAuth } from "../../hooks/useAuth";
import { useForm } from "../../hooks";
import { updateUserProfile } from "../../store/authSlice";
import { ProfileForm } from "../../components";

export const EditProfile = () => {
  const { user } = useAuth();
  const { values, handleChange, handleSubmit } = useForm({
    username: user?.username || "",
    email: user?.email || "",
    image: user?.image || "",
  });

  return (
    <ProfileForm
      values={values}
      onChange={handleChange}
      onSubmit={handleSubmit(updateUserProfile)}
    />
  );
};
