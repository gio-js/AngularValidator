
/**
 * @module app/components
 */ /** */
import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { ValidatorAttributeDirective } from './app.component.attribute-validator';
import { ValidatorMessages } from '../const/app.const.validator-messages';
import { ValidatorTypesEnum } from '../enums/app.enum.validator-types-enum';

/**
 * Required field (attribute directive)
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validator-password]'
})
export class ValidatorPasswordAttributeDirective extends ValidatorAttributeDirective {

  constructor(el: ElementRef, renderer: Renderer2) {
    super(el, renderer);

    // number regexp
    this.validatorType = ValidatorTypesEnum.PATTERN;
    // Minimum six characters, at least one letter, one number and one special character:
    this.validatePattern = '^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$';
    this.errorMessage = ValidatorMessages.PASSWORD;
  }

}
