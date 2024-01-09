## TextInput component

We want some additional embellishment around default `input` field. Basically we want a proper label, and an optional error too to be displayed below the input

## tapping the input capabilities

`input` is quite a powerful component and has tons of props already on it. When we wrap the input, a problem arises as to how do we pass these down to underlying input component?

### Adding the required props manually

Let us say we want to turn the input into a `required` one, or we might want to set min or max number of characters to be entered (say password must be 12 chars min). Lets give it a try.
