export const AuthForm = ({ values, errors, onChange, onSubmit }) => {
  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label>Пароль</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={onChange}
          className={errors.password ? "error" : ""}
        />
        {errors.password && (
          <div className="error-message">{errors.password}</div>
        )}
      </div>

      <button type="submit" className="submit-button">
        Войти
      </button>
    </form>
  );
};
