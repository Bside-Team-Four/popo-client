import { FieldValues, Path, useForm } from 'react-hook-form';

import useGetDefaultRegister from './useGetDefaultRegister';

const usePOPOForm = <FormType extends FieldValues>() => {
  const {
    register, watch, formState, resetField, setFocus, setError, handleSubmit,
  } = useForm<FormType>();

  const getDefaultRegister = useGetDefaultRegister(register);

  const getActiveCheck = (name: Path<FormType>) => !!watch(name) && !getError(name);

  const getError = (name: keyof FormType) => formState.errors[name];

  const reset = (name: Path<FormType>) => {
    resetField(name);
    setFocus(name);
  };

  return {
    register,
    watch,
    getError,
    getDefaultRegister,
    getActiveCheck,
    setFocus,
    reset,
    setError,
    handleSubmit,
  };
};

export default usePOPOForm;
