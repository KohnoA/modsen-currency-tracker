import { InputHTMLAttributes, useId } from 'react';
import styles from './Input.module.scss';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  labelName?: string;
  className?: string;
};

export default function Input({ labelName, className, ...inputProps }: InputProps) {
  const id = useId();

  return (
    <label htmlFor={id} className={className}>
      {labelName}
      <input className={styles.input} id={id} {...inputProps} />
    </label>
  );
}