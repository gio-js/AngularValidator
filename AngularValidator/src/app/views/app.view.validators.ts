import { Component, Renderer2 } from '@angular/core';
import { ValidatorManager } from '../services/app.service.validator-manager';

@Component({
  selector: 'app-view-validators',
  templateUrl: 'app.view.validators.html'
})
export class AppViewValidatorsDemo {

  public validatorManager: ValidatorManager = null; // new ValidatorManager(this.renderer);

  constructor(private renderer: Renderer2, validator: ValidatorManager) {
    this.validatorManager = validator;
  }

  public runValidation() {
    this.validatorManager.Validate();
  }

}
