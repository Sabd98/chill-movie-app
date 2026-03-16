import { createSlice } from '@reduxjs/toolkit';

const loadFormsFromStorage = () => {
  try {
    const serializedState = localStorage.getItem('form_storage');
    if (serializedState === null) {
      return {};
    }
    const parsed = JSON.parse(serializedState);
    return parsed.state?.forms || {};
  } catch (err) {
    console.error(err);
    return {};
  }
};

const initialState = {
  forms: loadFormsFromStorage(), 
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    initForm: (state, action) => {
      const { formId, initialValues } = action.payload;
      if (!state.forms[formId]) {
        state.forms[formId] = { values: initialValues };
        localStorage.setItem('form_storage', JSON.stringify({ state: { forms: state.forms }, version: 0 }));
      }
    },
    setFieldValue: (state, action) => {
      const { formId, field, value } = action.payload;
      if (state.forms[formId]) {
        state.forms[formId].values = {
          ...state.forms[formId].values,
          [field]: value,
        };
        localStorage.setItem('form_storage', JSON.stringify({ state: { forms: state.forms }, version: 0 }));
      }
    },
    resetForm: (state, action) => {
      const { formId, initialValues } = action.payload;
       if (state.forms[formId]) {
        state.forms[formId].values = initialValues;
        localStorage.setItem('form_storage', JSON.stringify({ state: { forms: state.forms }, version: 0 }));
       }
    },
  },
});

export const { initForm, setFieldValue, resetForm } = formSlice.actions;
export default formSlice.reducer;
