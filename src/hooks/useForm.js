import { useState } from "react";

/**
 * Хук для управления состоянием формы
 * @param {object} initialValues - Начальные значения формы
 * @param {function} [validate] - Функция валидации
 * @returns {{
 *   values: object,
 *   errors: object,
 *   handleChange: function,
 *   handleSubmit: function,
 *   resetForm: function
 * }}
 */
export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (onSubmit) => (e) => {
    e.preventDefault();
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors);

    if (!Object.keys(validationErrors).length) {
      onSubmit(values);
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    resetForm,
  };
};
