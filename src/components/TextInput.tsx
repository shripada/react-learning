import React, { ChangeEvent, ForwardedRef, MutableRefObject } from 'react';
import { ComponentProps, useImperativeHandle } from 'react';
import { cn } from '../utils';
/**
 * Props that the TextInput component accepts. We compose our type by taking help of type helper
 * ComponentProps of React. This helps us to get the type of the underlying DOM element- input
 */

type TextInputProps = Omit<
  ComponentProps<'input'> & {
    id?: string;
    label: string;
    error?: string;
    type: string;
    className?: string;
    /**
     * better abstraction, we get the text that is entered directly than the low level event
     */
    handleChange: (text: string) => void;
  },
  'onChange'
>; // Want everything from 'input' but not onChange

type ForwardRefProps = TextInputProps & ForwardedRef<HTMLInputElement | null>;

/**
 * We need to be able to associate a label with our text input. Also if there is an error
 * that we might want to display below the input field. This component tries to achieve this
 * by wrapping a  standard input element and then, adding a label and then error display below the
 * input element. This is an uncontrolled component.
 */
function TextInputInternal(
  {
    id,
    label,
    type, //we have pulled out the type here to ensure, we handle it correctly. ...delegated won't have it and thus no fear of getting overriden with an unwanted value such as checkbox.
    error,
    className,
    handleChange,
    ...delegated
  }: TextInputProps,
  ref: ForwardedRef<{ focus: () => void } | null>
) {
  let actualId = React.useId();
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef?.current?.focus();
      setFocused(true);
    },
  }));
  actualId = id ?? actualId;
  // We dont want accidental overrides of type to something meaningless to our context
  const validTypes = ['text', 'number', 'password'];
  const isValidType = validTypes.includes(type);

  return (
    <>
      <label
        htmlFor={actualId}
        className={cn('text-blue-600', focused ? 'text-red-800' : null)}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        {...delegated} // We want to ignore any onChange, so delegate props must be passed first
        type={isValidType ? type : 'text'}
        id={actualId}
        className={cn(
          `disabled:opacity-65 block border border-solid  text-base mt-2 py-1 px-1`,
          className
        )}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          handleChange(event.target.value);
        }}
      ></input>
      {error ? <div className="text-red-600">{error}</div> : null}
    </>
  );
}

const TextInput = React.forwardRef(TextInputInternal);

export { TextInput };
