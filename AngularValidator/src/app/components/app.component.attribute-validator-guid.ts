import {ValidatorTypesEnum} from '../enums/app.enum.validator-types-enum';
/**
 * @module app/components
 */ /** */
import { Directive, ElementRef, Input, Renderer2, SimpleChanges } from '@angular/core';
import { NgModel } from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { ValidatorAttributeDirective } from './app.component.attribute-validator';

/**
 * Required field (attribute directive)
 */
@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[validator-guid]'
})
export class ValidatorGuidAttributeDirective extends ValidatorAttributeDirective {

    constructor(el: ElementRef) {
        super(el);

        // number regexp
        this.validatorType = ValidatorTypesEnum.PATTERN;
        this.validatePattern = '^[{(]?[0-9A-F]{8}[-]?([0-9A-F]{4}[-]?){3}[0-9A-F]{12}[)}]?$';
        this.errorMessage = 'The value must be a valid guid value.'
    }

}
