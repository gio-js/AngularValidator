import { ValidatorRegisteredElement } from '../model/app.model.validator-registered-element';
import { Renderer2 } from '@angular/core';
import { AttachErrorElementHandle } from '../model/app.model.attach-error-element-handle';

/**
 * Defines an interface for the service used to configure the validator manager
 */
export interface IValidatorConfigurator {

  /**
   * The css class name used in case of error validation
   */
  getControlElementErrorClassName(): string;

  /**
   * The DOM renderer
   */
  getRenderer(): Renderer2;

  /**
   * Customize the error handling defining a proprietary function
   * @param renderer Renderer angular element.
   * @param element Validator element.
   * @param errorMessage Error message to add on the interface.
   * @returns Return true in case the functions handles the error interface attachment, otherwise false.
   */
  handleAttachError(renderer: Renderer2, element: ValidatorRegisteredElement, errorMessage: string): AttachErrorElementHandle;

}
