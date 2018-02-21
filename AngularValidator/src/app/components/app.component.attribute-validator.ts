/**
 * @module app/components
 */ /** */
import { ValidatorRequiredAttributeDirective } from './app.component.attribute-validator-required';
import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { EventEmitter, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ValidatorTypesEnum } from '../enums/app.enum.validator-types-enum';
import { ValidatorRegisteredElement } from '../model/app.model.validator-registered-element';
import { ValidationBehaviour } from '../model/app.model.validation-behaviour';
import { ValidatorManager } from '../services/app.service.validator-manager';

/**
 * Required field (attribute directive)
 */
export class ValidatorAttributeDirective implements AfterViewInit {

  /**
   * Angula model element
   */
  @Input() ngModel: any;

  /**
   * Validate pattern
   */
  // tslint:disable-next-line:no-input-rename
  @Input('validator-pattern') validatePattern = '';

  /**
   * Validate result
   */
  // tslint:disable-next-line:no-input-rename
  @Input('validator-manager') validatorManager: ValidatorManager = null;

  /**
   * Property name to validate
   */
  // tslint:disable-next-line:no-input-rename
  @Input('validator-property') propertyName = '';

  /**
   * Element data are required (set to true by validator-required attribute)
   */
  public validatorRequired = true;

  /**
   * DOM errors elements
   */
  private errorElements: Array<any> = null;

  /**
   * Generic error message
   */
  protected errorMessage = 'Generic error';

  /**
   * Validator type
   */
  protected validatorType: ValidatorTypesEnum = ValidatorTypesEnum.UNDEFINED;

  /**
   * Validation callback, in case of advanced validation
   * @returns True if the control contains a valid value, otherwise false.
   */
  protected validationCallback: (element: ValidatorRegisteredElement) => boolean = null;

  /**
   * Validation message formatter
   * @returns The formatted validation error message
   */
  protected validationErrorMessageFormatter: (baseMessage: string) => string = null;

  /**
   * Define a new validator: required
   * @param el native element
   * @param renderer renderer element
   */
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  /**
   * Component initialization
   */
  ngAfterViewInit(): void {
    if (!this.validatorManager) {
      console.error('Missing ValidatorManager object. Adding validation for property: ' + this.propertyName);
      return;
    }

    // register element
    this.validatorManager.RegisterElement(this.el, this.propertyName);

    // append validation
    switch (this.validatorType) {
      case ValidatorTypesEnum.IP:
        this.validatorManager.AppendIpValidation(this.propertyName);
        break;

      case ValidatorTypesEnum.INTEGER:
        this.validatorManager.AppendIntegerValidation(this.propertyName);
        break;

      case ValidatorTypesEnum.PORT:
        this.validatorManager.AppendEthernetPortValidation(this.propertyName);
        break;

      default:
        const validationBehaviour: ValidationBehaviour = {
          Priority: 0,
          ValidationType: this.validatorType,
          ValidationPattern: this.validatePattern,
          ValidationCallback: this.validationCallback,
          ValidationErrorMessageFormatter: this.validationErrorMessageFormatter,
          ValidationErrorMessage: this.errorMessage
        };

        this.validatorManager.AppendValidation(this.propertyName, validationBehaviour);
        break;
    }

    // append required validation
    // if (this.validatorRequired) {
    //     const requiredValidationBehaviour: ValidationBehaviour = {
    //         Priority: -1,
    //         ValidationType: ValidatorTypesEnum.REQUIRED,
    //         ValidationPattern: null,
    //         ValidationCallback: (element: ValidatorRegisteredElement) => {
    //             let hasAnyValue = true;
    //             const value = element.getElementValue();

    //             if (value === null || typeof value === undefined || value === '') {
    //                 hasAnyValue = false;
    //             }

    //             return hasAnyValue;
    //         },
    //         ValidationErrorMessage: ValidatorMessages.REQUIRED
    //     };

    //     this.validatorManager.AppendValidation(this.propertyName, requiredValidationBehaviour);
    // }
  }

  // /**
  //  *
  //  * @param changes data model changes
  //  */
  // ngOnChanges(changes: SimpleChanges) {
  //     this.validateElement();
  // }

}
