import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFormStore = create(
  persist(
    (set, get) => ({
      forms: {},

      initForm: (formId, initialValues) => {
        const state = get();
        const existingForm = state.forms[formId];

        if (!existingForm) {
          set((state) => ({
            forms: {
              ...state.forms,
              [formId]: {
                values: initialValues,
              },
            },
          }));
        } else {
          // Optional: Merge initialValues if there are new fields not in persisted state
          // For now, we trust the persisted state, but maybe we should ensure all keys exist
          // simpler approach: just trust persistence. If user wants to reset, they call reset.
        }
      },
      setFieldValue: (formId, field, value) => {
        set((state) => ({
          forms: {
            ...state.forms,
            [formId]: {
              ...state.forms[formId],
              values: {
                ...(state.forms[formId]?.values || {}),
                [field]: value,
              },
            },
          },
        }));
      },
      resetForm: (formId, initialValues) => {
        set((state) => ({
          forms: {
            ...state.forms,
            [formId]: {
              values: initialValues,
            },
          },
        }));
      },
    }),
    {
      name: "form-storage",
      // partialize: (state) => ({ forms: state.forms }), // Default behavior persists everything, which is what we want for 'forms'
    },
  ),
);

export default useFormStore;
