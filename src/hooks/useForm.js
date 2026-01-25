import { useState, useEffect } from 'react';
import useFormStore from '../store/formStore';

export const useForm = (initialValues, validationSchema, options = {}) => {
  const { externalError, clearError, formId } = options;

  const initForm = useFormStore((state) => state.initForm);
  const setFieldValue = useFormStore((state) => state.setFieldValue);
  const resetFormStore = useFormStore((state) => state.resetForm);
  const storeFormState = useFormStore((state) => formId ? state.forms[formId] : null);

  const [localValues, setLocalValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formId) {
      initForm(formId, initialValues);
    }
  }, [formId, initForm, initialValues]);

  const values = formId && storeFormState ? storeFormState.values : localValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (formId) {
      setFieldValue(formId, name, value);
    } else {
      setLocalValues(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (externalError && clearError) {
      clearError();
    }
  };

  useEffect(() => {
    return () => {
      if (clearError) {
        clearError();
      }
    };
  }, [clearError]);

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
    if (formId) {
      resetFormStore(formId, initialValues);
    } else {
      setLocalValues(initialValues);
    }
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    validate,
    reset,
    setErrors
  };
};
