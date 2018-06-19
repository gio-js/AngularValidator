import { ElementRef, Inject, Renderer2 } from '@angular/core';
import { ValidatorTypesEnum } from '../enums/app.enum.validator-types-enum';
import { ValidatorRegisteredElement } from '../model/app.model.validator-registered-element';
import { ValidatorElementResult } from '../model/app.model.validator-element-result';
import { ValidationBehaviour } from '../model/app.model.validation-behaviour';
import { ValidatorMessages } from '../const/app.const.validator-messages';
import { IValidatorConfigurator } from '../interfaces/app.interface.validator-configurator';
import { DependencyTokens } from '../const/app.const.tokens';


/**
 * Defines a validation element result
 */
export class ValidatorManager {

  /**
   * @param renderer
   */
  constructor( @Inject(DependencyTokens.VALIDATOR_CONFIGURATOR) private serviceConfigurator: IValidatorConfigurator) {
    this.renderer = serviceConfigurator.getRenderer();
  }

  /**
   * Internal DOM renderer
   */
  private renderer: Renderer2 = null;

  /**
   * Validation result
   */
  private internalResults: Array<ValidatorElementResult> = [];

  /**
   * Elements to validate
   */
  private RegisteredElements: Array<ValidatorRegisteredElement> = [];

  /**
   * Does the validations returns a valid state?
   */
  public IsValid(): boolean {
    for (const res of this.internalResults) {
      if (!res.IsValid) {
        return false;
      }
    }

    return true;
  }

  /**
   * Setup a validation state manually
   * @param property element
   * @param type validation type
   * @param valid is valid?
   */
  public SetValidation(property: string, type: ValidatorTypesEnum, valid: boolean): void {
    for (const res of this.internalResults) {
      if (res.PropertyName === property && res.ValidatorType === type) {
        res.IsValid = valid;
        return;
      }
    }

    this.internalResults.push({
      PropertyName: property,
      ValidatorType: type,
      IsValid: valid
    });
  }

  /**
   *
   * @param element dom element
   * @param model ref data model
   */
  public RegisterElement(element: ElementRef, property: string): void {
    let registeredElement = this.GetRegisteredElement(property)
    if (registeredElement == null) {
      registeredElement = new ValidatorRegisteredElement();
      registeredElement.DomElement = element;
      registeredElement.ValidationTypes = [];
      registeredElement.PropertyName = property;
      registeredElement.ErrorElements = [];

      this.RegisteredElements.push(registeredElement);
    }
  }

  /**
   *
   * @param element dom element
   * @param model ref data model
   */
  public UnRegisterElement(property: string): void {
    const registeredElement = this.GetRegisteredElement(property);
    if (registeredElement != null) {
      // remove errors
      this.removeError(registeredElement);

      // remove registered element
      const index = this.registeredElementIndex(registeredElement.PropertyName);
      this.RegisteredElements.splice(index, 1);

      // remove result
      this.removeValidationResult(registeredElement.PropertyName);
    }
  }

  /**
   *
   * @param element dom element
   * @param model ref data model
   */
  public UnRegisterElements(properties: string[]): void {
    for (const property of properties) {
      this.UnRegisterElement(property);
    }
  }

  /**
   *
   * @param element dom element
   * @param model ref data model
   */
  public AppendValidation(property: string, type: ValidationBehaviour): void {
    const hasValidation = this.HasValidation(property, type);
    const registeredElement = this.GetRegisteredElement(property);

    if (registeredElement == null) {
      throw new Error('registeredElement not found.');
    }

    if (hasValidation === false) {
      registeredElement.ValidationTypes.push(type);
    }
  }

  /**
   *
   * @param element dom element
   * @param model ref data model
   */
  public AppendRequiredValidation(property: string): void {
    const requiredValidationBehaviour: ValidationBehaviour = {
      Priority: -1,
      ValidationType: ValidatorTypesEnum.REQUIRED,
      ValidationPattern: null,
      ValidationCallback: (element: ValidatorRegisteredElement) => {
        let hasAnyValue = true;
        const value = element.getElementValue();

        if (value === null || typeof value === undefined || value === '') {
          hasAnyValue = false;
        }

        return hasAnyValue;
      },
      ValidationErrorMessage: ValidatorMessages.REQUIRED
    };

    this.AppendValidation(property, requiredValidationBehaviour);
  }

  /**
   *
   * @param element dom element
   * @param model ref data model
   */
  public AppendRequiredValidationList(properties: string[]): void {
    for (const property of properties) {
      this.AppendRequiredValidation(property);
    }
  }

  /**
   *
   * @param element dom element
   * @param model ref data model
   */
  public AppendIpValidation(property: string): void {
    const requiredValidationBehaviour: ValidationBehaviour = {
      Priority: -1,
      ValidationType: ValidatorTypesEnum.IP,
      ValidationPattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
      ValidationCallback: null,
      ValidationErrorMessage: ValidatorMessages.IP
    };

    this.AppendValidation(property, requiredValidationBehaviour);
  }

  /**
   *
   * @param element dom element
   * @param model ref data model
   */
  public AppendIntegerValidation(property: string): void {
    const requiredValidationBehaviour: ValidationBehaviour = {
      Priority: -1,
      ValidationType: ValidatorTypesEnum.INTEGER,
      ValidationPattern: '^[-+]?[0-9]*$',
      ValidationCallback: null,
      ValidationErrorMessage: ValidatorMessages.INTEGER
    };

    this.AppendValidation(property, requiredValidationBehaviour);
  }

  /**
   *
   * @param element dom element
   * @param model ref data model
   */
  public AppendEthernetPortValidation(property: string): void {
    const requiredValidationBehaviour: ValidationBehaviour = {
      Priority: -1,
      ValidationType: ValidatorTypesEnum.PORT,
      ValidationPattern: '^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$',
      ValidationCallback: null,
      ValidationErrorMessage: ValidatorMessages.PORT
    };

    this.AppendValidation(property, requiredValidationBehaviour);
  }


  /**
   * Get the registered element for validation
   * @param property property element
   */
  public HasValidation(property: string, validationType: ValidationBehaviour): boolean {
    const registeredElement = this.GetRegisteredElement(property);

    if (!registeredElement) {
      return false;
    }

    for (const registeredValidation of registeredElement.ValidationTypes) {
      if (validationType.ValidationType === ValidatorTypesEnum.PATTERN &&
        validationType.ValidationPattern === registeredValidation.ValidationPattern) {
        return true;
      } else if (registeredValidation.ValidationType === validationType.ValidationType) {
        return true;
      }
    }
    return false;
  }

  /**
   * Get the registered element for validation
   * @param property property element
   */
  public GetRegisteredElement(property: string) {
    return this.RegisteredElements.find(e => e.PropertyName === property);
  }

  /**
   * Dispose the validator element
   */
  public Clear() {
    // unregister elements
    for (const el of this.RegisteredElements) {
      this.UnRegisterElement(el.PropertyName);
    }

    // clear arrays
    this.RegisteredElements.length = 0;
    this.internalResults.length = 0;
  }

  /**
   * Dispose the validator element
   */
  public Dispose() {
    this.Clear();

    // null arrays
    this.RegisteredElements = null;
    this.internalResults = null;
  }

  /**
   * Validate registered elements
   */
  public Validate(): void {
    // clear previous validations
    this.internalResults.length = 0;

    for (const el of this.RegisteredElements) {
      this.validateElement(el);
    }
  }

  /**
   * Get the registered element index for validation
   * @param property property element
   */
  public registeredElementIndex(property: string) {
    return this.RegisteredElements.findIndex(e => e.PropertyName === property);
  }

  /**
   * Internal element validation
   */
  private validateElement(element: ValidatorRegisteredElement) {
    // clear error
    this.removeError(element);

    // check for element disabled
    if (element.DomElement.nativeElement.disabled === true) {
      return;
    } // no validation required

    // check for errors
    for (const validation of element.ValidationTypes.sort(v => v.Priority)) {
      const invalid = this.isInvalid(element, validation);

      if (invalid) { // append dom error
        let errorMessage = validation.ValidationErrorMessage;
        if (validation.ValidationErrorMessageFormatter) {
          errorMessage = validation.ValidationErrorMessageFormatter(errorMessage);
        }

        this.appendError(element, errorMessage);
      }

      // set validation
      this.SetValidation(element.PropertyName, validation.ValidationType, !invalid);
    }

  }

  /**
   * Append the error element
   * @param el Element in error
   */
  private appendError(element: ValidatorRegisteredElement, errorMessage: string) {
    // append elements to internal dom array
    if (element.ErrorElements == null) {
      element.ErrorElements = [];
    }

    // custom error handler
    const errorHandle = this.serviceConfigurator.handleAttachError(this.renderer, element, errorMessage);

    if (errorHandle && errorHandle.HasBeenHandled === true) {

      element.ErrorElements.push(
        errorHandle.DomElement
      );

    } else {

      // get parents
      const parent: any = this.renderer.parentNode(element.DomElement.nativeElement);
      const formGroupElement: any = this.closestElement(element.DomElement.nativeElement, '.form-group', 'body');
      const errorElementClass: string = this.serviceConfigurator.getControlElementErrorClassName();

      // create error element block message
      const errorElement: any = this.renderer.createElement('span');
      this.renderer.addClass(errorElement, 'help-block');
      this.renderer.addClass(errorElement, 'help-block-error');
      this.renderer.addClass(errorElement, errorElementClass);
      this.renderer.setProperty(errorElement, 'innerHTML', errorMessage);

      // append elements
      this.renderer.appendChild(parent, errorElement);
      // this.renderer.appendChild(parent, errorIcon);

      // set error css style
      if (formGroupElement) {
        this.renderer.addClass(formGroupElement, 'has-error');
      }

      element.ErrorElements.push(
        errorElement
      );

    }

  }

  /**
   * Remove the errors elements
   * @param el Element in error
   */
  private removeError(element: ValidatorRegisteredElement) {
    if (!element.ErrorElements || element.ErrorElements.length === 0) {
      return;
    }

    // get parents
    const parent: any = this.renderer.parentNode(element.DomElement.nativeElement);
    const formGroupElement: any = this.closestElement(element.DomElement.nativeElement, '.form-group', 'body');

    for (let errorElement of element.ErrorElements) {
      this.renderer.removeChild(parent, errorElement);
      errorElement = null;
    }

    // remove error css style
    if (formGroupElement) {
      this.renderer.removeClass(formGroupElement, 'has-error');
    }

    // clear errors elements
    element.ErrorElements.length = 0;
  }

  /**
   * Errors elements already created?
   */
  private hasErrorsElements(element: ValidatorRegisteredElement): boolean {
    return (element.ErrorElements && element.ErrorElements.length > 0);
  }

  /**
   * Remove validation result by index
   */
  private removeValidationResult(property: string) {
    let resultIndex = this.internalResults.findIndex(r => r.PropertyName === property);

    while (resultIndex >= 0) {
      this.internalResults.splice(resultIndex, 1);
      resultIndex = this.internalResults.findIndex(r => r.PropertyName === property);
    }
  }

  /**
   * Checks wheter the element has any value or not
   */
  // private checkElementAnyValue(): boolean {
  //     let hasAnyValue = true;
  //     if (this.ngModel === null || typeof this.ngModel === undefined || this.ngModel === "")
  //         hasAnyValue = false;

  //     // set validator state
  //     if (this.validatorResult && this.propertyName && this.validatorType) {
  //         this.validatorResult.setValidation(this.propertyName, ValidatorTypes.REQUIRED, hasAnyValue);
  //     }

  //     return hasAnyValue;
  // }

  /**
   * Is the input invalid?
   */
  private isInvalid(element: ValidatorRegisteredElement, type: ValidationBehaviour): boolean {
    let invalid = false;
    const model = element.getElementValue();

    // check pattern
    if (type.ValidationPattern && model !== '' && model != null) {
      const rxp = new RegExp(type.ValidationPattern);
      if (rxp.test(model) === false) {
        invalid = true;
      }
    }

    if (invalid === false && type.ValidationCallback) {
      invalid = (type.ValidationCallback(element) === false);
    }

    // // set validator state
    // if (this.validatorResult && this.propertyName && this.validatorType) {
    //     this.setValidation(this.propertyName, this.validatorType, !invalid);
    // }

    return invalid;
  }

  /**
   * Get closest element by selector
   * @param el
   * @param selector
   * @param stopSelector
   */
  private closestElement(el: any, selector: string, stopSelector: string) {
    let retval = null;
    while (el) {
      if (el.matches(selector)) {
        retval = el;
        break;
      } else if (stopSelector && el.matches(stopSelector)) {
        break;
      }
      el = el.parentElement;
    }
    return retval;
  }

  /**
   * Results collection
   */
  public get Results(): Array<ValidatorElementResult> {
    return this.internalResults.slice(0);
  }

}
