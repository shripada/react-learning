## TextInput component

We want some additional embellishment around default `input` field. Basically we want a proper label, and an optional error too to be displayed below the input

## tapping the input capabilities

`input` is quite a powerful component and has tons of props already on it. When we wrap the input, a problem arises as to how do we pass these down to underlying input component?

### Adding the required props manually

Let us say we want to turn the input into a `required` one, or we might want to set min or max number of characters to be entered (say password must be 12 chars min). Lets give it a try.

### Adding required props manually is not scalable!

We quickly realised that covering all props that `input` has is very difficult, and manually typing it into our props interface is daunting. React should not be that hard!. Luckily React provides a special type extractor helper
[`ComponentProps`](https://www.totaltypescript.com/react-component-props-type-helper). Using this we can bring all the props of input merged into our props. It is as simple as this:

```
import { ComponentProps } from "react";
type TextInputProps  = ComponentProps<"input"> & {label:string, error?:string}
```

From the structure of our component it is clear that, we want to work on only our custom props and then simply pass on the props of input. We are not really interested in them. This is where the prop delegation comes into help. It is a simple technique where object destructuring is used to collect our individual props, and then collect all props that we simply want to delegate down in a variable, usually we name it as `delegated`

```
 function TextInput({label, error, ...delegated}: TextInputProps){

    // consume label and error
    <input type="text" {...delegated}>
 }
```

#### one dilemma - should we pass `delegated` before or after some explicit props for input?

In our case, ours in text input. So chance is that user might want to use this input as a text, number, or say password type as well. If we pass delegated props first and then give our default type text, then user can never change the type

```
 function TextInput({label, error, ...delegated}: TextInputProps){

    // consume label and error
    <input {...delegated} type="text">
 }
```

How do we solve this? The simple trick is simply pull out the 'type' prop out from delegated props, and give special treatment to it.

```
 function TextInput({label, error, type ...delegated}: TextInputProps){
  const validTypes = ['text', 'number', 'password'];
  const isValidType = validTypes.includes(type);
  const inputType = isValidType ? type : 'text' // Fallback to text, in case we receive invalid type
    <input {...delegated} type={inputType}>
    ...
 }
```

So this tradeoff of which position we need to destructure is totally dependent on our context. In the case of this TextInput component it sounds like that is the right choice!. But imagine if it were a checkbox type. Probably we never want someone to override that, and there we would prefer passing delegated props first and then overide the type to always have value 'chekbox'

```
// no need of explit type prop here, as it is always checkbox
function CheckBox({label,...delegated}: TextInputProps){

    // this is correct
    <input {...delegated} type={"checkbox"}>
    ...
    // this is dangerous as someone can override the type to something else and
    // since we are passing delegated at end 'checkbox' can be overridden to something else.
    <input type={"checkbox"} {...delegated} >
 }
```

### Levels of abstraction

For the user's of our TextInput, may onChange is quit a low level API to use to get the text that was typed. May be we actually provide a callback `handleChange` that will extract the text from the event and
pass that instead of the low level event itself.

Once we bring in this, do we need to disallow the low level `onChange`? This is a tradeoff. We can allow both, or disallow `onChange`. Or look for onChange, only if the `handleChange` is missing.

#### overriding onChange with handleChange

```
type TextInputProps = ComponentProps<'input'> & {
  id?: string;
  label: string;
  error: string;
  type: string;
  /**
   * better abstraction, we get the text that is entered directly than the low level event
   */
  handleChange: (text: string) => void;
};

function TextInput(...){

    ...
     <input
        {...delegated} // We want to ignore any onChange, so delegate props must be passed first
        type={isValidType ? type : 'text'}
        id={actualId}
        className={`block border border-solid  text-base mt-2 py-1 px-1`}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          handleChange(event.target.value);
        }}
    ...
}

```
