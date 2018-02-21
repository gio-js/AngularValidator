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
    selector: '[validator]'
})
export class ValidatorGenericAttributeDirective extends ValidatorAttributeDirective {

    constructor(el: ElementRef, renderer: Renderer2) {
        super(el, renderer);
    }

}