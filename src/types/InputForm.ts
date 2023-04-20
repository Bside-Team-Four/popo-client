import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputItem<ValueType> = {
  register: UseFormRegisterReturn;
  value: ValueType;
  error?: FieldError;
  onClickReset: ()=>void;
};

export default InputItem;
