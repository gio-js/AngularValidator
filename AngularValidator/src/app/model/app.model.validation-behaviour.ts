import { ValidatorTypesEnum } from '../enums/app.enum.validator-types-enum';
import { ValidatorRegisteredElement } from './app.model.validator-registered-element';

/**
 * Defines the validation behaviour
 */
export class ValidationBehaviour {

  /**
   * Validation priority type
   */
  public Priority = 0;

  /**
   * Defines the validation type
   */
  public ValidationType: ValidatorTypesEnum = ValidatorTypesEnum.UNDEFINED;

  /**
   * Define the validation pattern, used in case of ValidationType CUSTOM
   */
  public ValidationPattern = '';

  /**
   * Defines a validation callback
   * @returns True if the control contains a valid value, otherwise false.
   */
  public ValidationCallback: (element: ValidatorRegisteredElement) => boolean = null;

  /**
   * Validator error message
   */
  public ValidationErrorMessage = '';

  /**
   * Validator error message formatter, used to format the specified ValidationErrorMessage
   */
  public ValidationErrorMessageFormatter?: (baseMessage: string) => string = null;

}
