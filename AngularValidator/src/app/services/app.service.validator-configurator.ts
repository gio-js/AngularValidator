import { ValidatorRegisteredElement } from '../model/app.model.validator-registered-element';
import { IValidatorConfigurator } from '../interfaces/app.interface.validator-configurator';
import { Renderer2, Injectable, RendererFactory2, Inject } from '@angular/core';
import { AttachErrorElementHandle } from '../model/app.model.attach-error-element-handle';



/**
 * Validator configurator service
 */
@Injectable()
export class BaseValidatorConfigurator implements IValidatorConfigurator {

  private renderer: Renderer2 = null;

  constructor( @Inject(RendererFactory2) rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);

  }

  /**
   * The css class name used in case of validation error
   */
  getControlElementErrorClassName(): string {
    return 'validator-error';
  }

  /**
   * The DOM renderer
   */
  getRenderer(): Renderer2 {
    return this.renderer;
  }

  /**
   * Customize the error handling defining a proprietary function
   * @param renderer Renderer angular element.
   * @param element Validator element.
   * @param errorMessage Error message to add on the interface.
   * @returns Return true in case the functions handles the error interface attachment, otherwise false.
   */
  handleAttachError(renderer: Renderer2, element: ValidatorRegisteredElement, errorMessage: string): AttachErrorElementHandle {
    return {
      HasBeenHandled: false,
      DomElement: null
    };
  }

}
