import { ValidatorRegisteredElement } from '../model/app.model.validator-registered-element';
import { Renderer2 } from '@angular/core';

/**
 * Defines an interface for the service used to configure the validator manager
 */
export interface IValidatorConfigurator {

  getControlElementSuccessClassName(): string;

  getControlElementErrorClassName(): string;

  handleAttachError(renderer: Renderer2, element: ValidatorRegisteredElement, errorMessage: string): boolean;

}
