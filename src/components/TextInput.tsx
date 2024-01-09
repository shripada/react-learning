import React, { ChangeEvent } from 'react';
import { act } from 'react-dom/test-utils';

/**
 * Props that the TextInput component accepts
 */
export interface TextInputProps {
  /**
   * a unique id, for the text input. This will be used as css id to uniquely
   * target the input especially by the label's htmlFor. This is optional.
   * If not supplied a unique id will be derived by using React.useId.
   */
  id?: string;
  /**
   * represents the user facing label that denotes what the input stands for, for example user name, password etc.
   */
  label: string;

  /**
   * An optional error string, if supplied, will be displayed below the input field.
   */
  error?: string;

  /**
   * optional handler that is called when user changes the text by inputting characters
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
/**
 * We need to be able to associate a label with our text input. Also if there is an error
 * that we might want to display below the input field. This component tries to achieve this
 * by wrapping a  standard input element and then, adding a label and then error display below the
 * input element. This is an uncontrolled component.
 */
export function TextInput({ id, label, error, onChange }: TextInputProps) {
  let actualId = React.useId();
  actualId = id ?? actualId;
  return (
    <>
      <label htmlFor={actualId} className="text-blue-600">
        {label}
      </label>
      <input
        type="text"
        id={actualId}
        onChange={onChange}
        className={`block border border-solid  text-xl mt-2`}
      ></input>
      {error ? <div className="text-red-600">{error}</div> : null}
    </>
  );
}
