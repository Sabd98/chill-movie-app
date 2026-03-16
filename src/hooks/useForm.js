import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initForm, setFieldValue, resetForm } from '../store/formSlice';

export const useForm = (initialValues, validationSchema, options = {}) => {
  const { externalError, clearError, formId } = options;
  const dispatch = useDispatch();
  
  const storeFormState = useSelector((state) => 
    formId ? state.form.forms[formId] : null
  );

  const [localValues, setLocalValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formId) {
      dispatch(initForm({ formId, initialValues }));
    }
  }, [formId, initialValues, dispatch]);

  const values = formId && storeFormState ? storeFormState.values : localValues;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (formId) {
      dispatch(setFieldValue({ formId, field: name, value }));
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
      dispatch(resetForm({ formId, initialValues }));
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
