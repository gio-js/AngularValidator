import { NgModule, ModuleWithProviders, Renderer2, RendererFactory2 } from '@angular/core';
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
import { BrowserModule } from '@angular/platform-browser';
import { BaseValidatorConfigurator } from './services/app.service.validator-configurator';
import { DependencyTokens } from './const/app.const.tokens';


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
    ValidatorRangeAttributeDirective

  ]
})
export class ValidatorsModule {

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: ValidatorsModule,
      providers: [
        { provide: DependencyTokens.VALIDATOR_CONFIGURATOR, useClass: BaseValidatorConfigurator },
        ValidatorManager
      ]
    };
  }

}
