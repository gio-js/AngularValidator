/**
 * @module app/components
 */ /** */
import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { ValidatorAttributeDirective } from './app.component.attribute-validator';
import { ValidatorTypesEnum } from '../enums/app.enum.validator-types-enum';
import { ValidatorMessages } from '../const/app.const.validator-messages';

/**
 * Required field (attribute directive)
 */
@Directive({
  selector: '[validator-float]'
})
export class ValidatorFloatAttributeDirective extends ValidatorAttributeDirective {

  constructor(el: ElementRef) {
    super(el);
    this.errorMessage = ValidatorMessages.FLOAT;
    this.validatorType = ValidatorTypesEnum.FLOAT;

    // number regexp
    this.validatePattern = '^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$';
    this.errorMessage = 'The value must be a valid decimal value.'
  }

}
