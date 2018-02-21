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
    selector: '[validator-port]'
})
export class ValidatorPortAttributeDirective extends ValidatorAttributeDirective {

    constructor(el: ElementRef, renderer: Renderer2) {
        super(el, renderer);
        // number regexp
        this.validatorType = ValidatorTypesEnum.PORT;
    }

}
