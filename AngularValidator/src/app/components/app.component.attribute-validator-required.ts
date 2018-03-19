/**
 * @module app/components
 */ /** */
import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { ValidatorAttributeDirective } from './app.component.attribute-validator';
import { ValidatorRegisteredElement } from '../model/app.model.validator-registered-element';
import { ValidatorMessages } from '../const/app.const.validator-messages';
import { ValidatorTypesEnum } from '../enums/app.enum.validator-types-enum';

/**
 * Required field (attribute directive)
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validator-required]'
})
export class ValidatorRequiredAttributeDirective extends ValidatorAttributeDirective {

  constructor(el: ElementRef) {
    super(el);
    this.errorMessage = ValidatorMessages.REQUIRED;
    this.validatorType = ValidatorTypesEnum.REQUIRED;
    this.validatorRequired = true;
    this.validationCallback = (element: ValidatorRegisteredElement) => {
      let hasAnyValue = true;
      const value = element.getElementValue();

      if (value === null || typeof value === undefined || value === '') {
        hasAnyValue = false;
      }

      return hasAnyValue;
    };
  }

  // public static ValidateEmptyValue(element: ValidatorRegisteredElement): boolean {
  //     let hasAnyValue = true;

  //     if (element.NgModel === null || typeof element.NgModel === undefined || element.NgModel === "")
  //         hasAnyValue = false;

  //     return hasAnyValue;
  // }

}
