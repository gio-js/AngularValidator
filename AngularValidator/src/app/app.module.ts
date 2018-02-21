import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { ValidatorsModule } from './app.module.validators';
import { AppViewValidatorsDemo } from './views/app.view.validators';


@NgModule({
  declarations: [
    AppViewValidatorsDemo
  ],
  imports: [
    ValidatorsModule.forRoot(),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppViewValidatorsDemo]
})
export class AppModule { }
