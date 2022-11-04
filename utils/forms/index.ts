import { LiteralUnion } from 'react-hook-form';

export const getValidationErrorMessage = (
  inputName: string,
  type:
    | LiteralUnion<
        | 'required'
        | 'min'
        | 'max'
        | 'maxLength'
        | 'minLength'
        | 'pattern'
        | 'validate'
        | 'valueAsNumber'
        | 'valueAsDate'
        | 'value'
        | 'setValueAs'
        | 'shouldUnregister',
        string
      >
    | undefined,
  charCount?: number
) => {
  switch (type) {
    case 'required':
      return `${inputName} is a required field`;
    case 'pattern':
      return `${inputName} is invalid`;
    case 'minLength':
      return `Your ${inputName} must be more than ${
        charCount ? charCount : 0
      } characters`;
    default:
      return '';
  }
};
