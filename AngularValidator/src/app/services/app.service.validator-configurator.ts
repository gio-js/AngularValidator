import { ValidatorRegisteredElement } from '../model/app.model.validator-registered-element';
import { IValidatorConfigurator } from '../interfaces/app.interface.validator-configurator';
import { Renderer2, Injectable } from '@angular/core';


/**
 * Validator configurator service
 */
@Injectable()
export class ValidatorConfigurator implements IValidatorConfigurator {

  getControlElementSuccessClassName(): string {
    return 'validator-success';
  }

  getControlElementErrorClassName(): string {
    return 'validator-error';
  }

  /**
   * Customize the error handling defining a proprietary function
   * @param renderer Renderer angular element.
   * @param element Validator element.
   * @param errorMessage Error message to add on the interface.
   * @returns Return true in case the functions handles the error interface attachment, otherwise false.
   */
  handleAttachError(renderer: Renderer2, element: ValidatorRegisteredElement, errorMessage: string): boolean {
    return false;
  }

}
