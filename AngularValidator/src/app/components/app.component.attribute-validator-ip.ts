/**
 * @module app/components
 */ /** */
import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { ValidatorAttributeDirective } from './app.component.attribute-validator';
import { ValidatorTypesEnum } from '../enums/app.enum.validator-types-enum';

/**
 * Required field (attribute directive)
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validator-ip]'
})
export class ValidatorIpAttributeDirective extends ValidatorAttributeDirective {

  constructor(el: ElementRef) {
    super(el);
    // number regexp
    this.validatorType = ValidatorTypesEnum.IP;
  }

}
