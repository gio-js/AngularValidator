import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ValidatorsModule } from 'ng-form-validator';
import { AppViewValidatorsDemo } from './views/app.view.validators';


@NgModule({
  declarations: [
    AppViewValidatorsDemo
  ],
  imports: [
    BrowserModule,
    ValidatorsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppViewValidatorsDemo]
})
export class AppModule { }
