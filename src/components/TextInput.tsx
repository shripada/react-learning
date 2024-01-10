import React, { ChangeEvent } from 'react';
import { ComponentProps } from 'react';

/**
 * Props that the TextInput component accepts. We compose our type by taking help of type helper
 * ComponentProps of React. This helps us to get the type of the underlying DOM element- input
 */

type TextInputProps = ComponentProps<'input'> & {
  id?: string;
  label: string;
  error: string;
  type: string;
};
/**
 * We need to be able to associate a label with our text input. Also if there is an error
 * that we might want to display below the input field. This component tries to achieve this
 * by wrapping a  standard input element and then, adding a label and then error display below the
 * input element. This is an uncontrolled component.
 */
export function TextInput({
  id,
  label,
  type, //we have pulled out the type here to ensure, we handle it correctly. ...delegated won't have it and thus no fear of getting overriden with an unwanted value such as checkbox.
  error,
  ...delegated
}: TextInputProps) {
  let actualId = React.useId();
  actualId = id ?? actualId;
  // We dont want accidental overrides of type to something meaningless to our context
  const validTypes = ['text', 'number', 'password'];
  const isValidType = validTypes.includes(type);
  return (
    <>
      <label htmlFor={actualId} className="text-blue-600">
        {label}
      </label>
      <input
        {...delegated} //Putting delegated props here or to the end, has no difference in our case as there are no conflicts
        type={isValidType ? type : 'text'}
        id={actualId}
        className={`block border border-solid  text-xl mt-2`}
      ></input>
      {error ? <div className="text-red-600">{error}</div> : null}
    </>
  );
}
