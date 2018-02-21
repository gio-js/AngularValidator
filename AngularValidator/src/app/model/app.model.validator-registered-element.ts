import { ElementRef } from '@angular/core';
import { ValidationBehaviour } from './app.model.validation-behaviour';

/**
 * Registered element logic rapresentation
 */
export class ValidatorRegisteredElement {
  /**
   * Angular model element
   */
  public DomElement: ElementRef;

  /**
   * Validate pattern
   */
  public ValidationTypes: ValidationBehaviour[] = [];

  /**
   * Contains
   */
  public ErrorElements: any[];

  /**
   * Property name to validate
   */
  public PropertyName = '';

  /**
   * Element value based on dom element
   */
  public getElementValue(): any {
      return this.DomElement.nativeElement.value; // TODO: check for browser compatibility
  }

}
