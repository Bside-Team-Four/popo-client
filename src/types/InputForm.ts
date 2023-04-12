import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type InputItem = {
  register: UseFormRegisterReturn;
  value: string;
  error?: FieldError;
  onClickReset: ()=>void;
};

export default InputItem;
