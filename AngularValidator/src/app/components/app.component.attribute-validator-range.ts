/**
 * @module app/components
 */ /** */
import { Directive, ElementRef, Input, Renderer2, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ValidatorAttributeDirective } from './app.component.attribute-validator';
import { ValidatorMessages } from '../const/app.const.validator-messages';
import { ValidatorTypesEnum } from '../enums/app.enum.validator-types-enum';
import { ValidatorRegisteredElement } from '../model/app.model.validator-registered-element';

/**
 * Required field (attribute directive)
 */
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[validator-range]'
})
export class ValidatorRangeAttributeDirective extends ValidatorAttributeDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('validator-range-from')
  public RangeFrom: number = 0;

  // tslint:disable-next-line:no-input-rename
  @Input('validator-range-from-inclusive')
  public RangeFromInclusive;

  // tslint:disable-next-line:no-input-rename
  @Input('validator-range-to')
  public RangeTo: number = 0;

  // tslint:disable-next-line:no-input-rename
  @Input('validator-range-to-inclusive')
  public RangeToInclusive;


  constructor(el: ElementRef) {
    super(el);
    this.errorMessage = ValidatorMessages.RANGE;
    this.validatorType = ValidatorTypesEnum.RANGE;
    // validation
    // this.validatorRequired = true;
    this.validationErrorMessageFormatter = (baseMessage: string) => {
      let message = baseMessage;
      const valueExcludedFrom: string = (this.RangeFromInclusive ? '' : ' (value excluded)');
      const valueExcludedTo: string = (this.RangeToInclusive ? '' : ' (value excluded)');
      message = message.replace('{0}', this.RangeFrom.toString() + valueExcludedFrom);
      message = message.replace('{1}', this.RangeTo.toString() + valueExcludedTo);
      return message;
    };
    this.validationCallback = (element: ValidatorRegisteredElement) => {
      const value = element.getElementValue();

      if (value === '' || value == null || typeof value === 'undefined') {
        return true;
      }

      if (isNaN(value)) {
        return false;
      }

      const rangeFromInclusive = (
        this.RangeFromInclusive === true ||
        this.RangeFromInclusive === 'true' ||
        this.RangeFromInclusive === 1
      );

      const rangeToInclusive = (
        this.RangeToInclusive === true ||
        this.RangeToInclusive === 'true' ||
        this.RangeToInclusive === 1
      );

      const parsedValue = parseFloat(value);

      const isFromValid = ((rangeFromInclusive === true && (this.RangeFrom <= parsedValue)) ||
        (rangeFromInclusive === false && (this.RangeFrom < parsedValue)));
      const isToValid = ((rangeToInclusive === true && (this.RangeTo >= parsedValue)) ||
        (rangeToInclusive === false && (this.RangeTo > parsedValue)));

      return (isFromValid && isToValid);
    };
  }

}
