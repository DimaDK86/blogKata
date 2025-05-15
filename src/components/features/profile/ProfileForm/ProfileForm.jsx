export const ProfileForm = ({ values, onChange, onSubmit }) => {
  return (
    <form className="profile-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label>Имя пользователя</label>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={onChange}
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
        />
      </div>

      <button type="submit" className="submit-button">
        Сохранить
      </button>
    </form>
  );
};
