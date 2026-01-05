import { useState } from 'react';

export const useForm = (initialValues, validationSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  const validate = () => {
    try {
      if (validationSchema) {
        validationSchema.parse(values);
      }
      setErrors({});
      return true;
    } catch (error) {
      const formattedErrors = {};
      if (error.issues && Array.isArray(error.issues)) {
        error.issues.forEach(err => {
          formattedErrors[err.path[0]] = err.message;
        });
      }
      setErrors(formattedErrors);
      return false;
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    setErrors
  };
};
