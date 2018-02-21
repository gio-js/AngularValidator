import { ValidatorTypesEnum } from '../enums/app.enum.validator-types-enum';

/**
 * Defines a validation element result
 */
export class ValidatorElementResult {

  /**
   * Validator property name
   */
  public PropertyName = '';

  /**
   * Validation type
   */
  public ValidatorType: ValidatorTypesEnum = ValidatorTypesEnum.UNDEFINED;

  /**
   * Has the validation been completed without error?
   */
  public IsValid = false;

}
