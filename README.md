# AngularValidator
A simple plugin Angular component for custom form validation.


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/ng5-validator.svg)](https://badge.fury.io/js/ng5-validator.svg)
<!-- 
[![Build Status](https://travis-ci.org/gio-js/AngularValidator.svg?branch=master)](https://travis-ci.org/gio-js/AngularValidator)
-->

# ng5-validator

Angular 5 - Forms validation


## Live demo
http://www.giovannisorgente.it/AngularValidator/


## Getting started

`npm i --save ng5-validator`

Add following lines into your

**module:**

```typescript
import { ValidatorsModule } from './ng5-validator';
```

add ValidatorsModule to your module imports section<br/>
```typescript
imports: [ ValidatorsModule.forRoot() ]
```

inject the ValidatorManager service in your view component:<br/>
```typescript
@Component({
  selector: 'app-view-validators',
  templateUrl: 'app.view.validators.html'
})
export class AppViewValidatorsDemo {

  public validatorManager: ValidatorManager = null;

  constructor(validator: ValidatorManager) {
    this.validatorManager = validator;
  }

  public runValidation() {
    this.validatorManager.Validate();
  }

}
```

use the unobtrusive validation by html:<br/>
```html
<input type="text" validator-required [validator-manager]="validatorManager" [validator-property]="'RequiredField'">

<input type="text" validator-required validator-integer [validator-manager]="validatorManager" [validator-property]="'IntegerField'">

<input type="text" validator-ip [validator-manager]="validatorManager" [validator-property]="'IPField'">

<input type="text"
            validator-range
            validator-range-from="5"
            validator-range-to="10"
            validator-range-from-inclusive="true"
            validator-range-to-inclusive="true"
            required="false"
            [validator-manager]="validatorManager" [validator-property]="'RangeFieldValidation'">
```

access the validation results looking at the ValidatorManager service:<br/>
```html
<h3>Errors</h3>
<pre>
  Global -> Is Valid: {{ validatorManager.IsValid() }}

  <table>
    <thead>
      <tr>
        <td>Property</td>
        <td>ValidationType</td>
        <td>Is Valid?</td>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let el of validatorManager.Results">
        <td>{{ el.PropertyName }}</td>
        <td>{{ el.ValidatorType }}</td>
        <td>{{ el.IsValid }}</td>
      </tr>
    </tbody>
  </table>
</pre>
```

<br/>
