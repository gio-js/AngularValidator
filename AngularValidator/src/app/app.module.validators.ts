
import { NgModule, ModuleWithProviders, Renderer2 } from '@angular/core';
import { ValidatorGenericAttributeDirective } from './components/app.component.attribute-validator-generic';
import { ValidatorRequiredAttributeDirective } from './components/app.component.attribute-validator-required';
import { ValidatorIntegerAttributeDirective } from './components/app.component.attribute-validator-integer';
import { ValidatorFloatAttributeDirective } from './components/app.component.attribute-validator-float';
import { ValidatorIpAttributeDirective } from './components/app.component.attribute-validator-ip';
import { ValidatorPortAttributeDirective } from './components/app.component.attribute-validator-port';
import { ValidatorGuidAttributeDirective } from './components/app.component.attribute-validator-guid';
import { ValidatorPasswordAttributeDirective } from './components/app.component.attribute-validator-password';
import { ValidatorRangeAttributeDirective } from './components/app.component.attribute-validator-range';
import { ValidatorManager } from './services/app.service.validator-manager';
import { IValidatorConfigurator } from './interfaces/app.interface.validator-configurator';
import { ValidatorConfigurator } from './services/app.service.validator-configurator';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ValidatorGenericAttributeDirective,
    ValidatorRequiredAttributeDirective,
    ValidatorIntegerAttributeDirective,
    ValidatorFloatAttributeDirective,
    ValidatorIpAttributeDirective,
    ValidatorPortAttributeDirective,
    ValidatorGuidAttributeDirective,
    ValidatorPasswordAttributeDirective,
    ValidatorRangeAttributeDirective,

  ],
  exports: [
    ValidatorGenericAttributeDirective,
    ValidatorRequiredAttributeDirective,
    ValidatorIntegerAttributeDirective,
    ValidatorFloatAttributeDirective,
    ValidatorIpAttributeDirective,
    ValidatorPortAttributeDirective,
    ValidatorGuidAttributeDirective,
    ValidatorPasswordAttributeDirective,
    ValidatorRangeAttributeDirective,

  ]
})
export class ValidatorsModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ValidatorsModule,
      providers: [
        ValidatorConfigurator,
        // { provide: ValidatorConfigurator, deps: [Renderer2], useFactory: ValidatorConfiguratorFactory },
        ValidatorManager
      ]
    };
  }

}


// components
export * from './components/app.component.attribute-validator-required';
export * from './components/app.component.attribute-validator-integer';
export * from './components/app.component.attribute-validator-float';
export * from './components/app.component.attribute-validator-generic';
export * from './components/app.component.attribute-validator-ip';
export * from './components/app.component.attribute-validator-port';
export * from './components/app.component.attribute-validator-guid';
export * from './components/app.component.attribute-validator-password';
export * from './components/app.component.attribute-validator-range';
export * from './components/app.component.attribute-validator';

// consts
export * from './const/app.const.validator-messages';
export * from './const/app.const.validator-types';

// enums
export * from './enums/app.enum.validator-types-enum';

// models
export * from './model/app.model.validation-behaviour';
export * from './model/app.model.validator-element-result';
export * from './model/app.model.validator-registered-element';
