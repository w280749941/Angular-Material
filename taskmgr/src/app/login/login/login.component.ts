import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';
import { Quote } from '../../domain';
import * as authActions from '../../actions/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(private fb: FormBuilder,
    private store$: Store<fromRoot.State>) {
    this.quote$ = this.store$.select(fromRoot.getQuote);
    this.store$.dispatch(new actions.QuoteAction(null));
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['xxx@gmail.com', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    });
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    this.store$.dispatch(new authActions.LoginAction(value));
    // this.form.controls['email'].setValidators(this.validate); // Set validator programmatically.
  }

  // validate(c: FormControl): { [key: string]: any } {
  //   if (!c.value) {
  //     return null;
  //   }
  //   const pattern = /^xxx+/;
  //   if (pattern.test(c.value)) {
  //     return null;
  //   }
  //   return {
  //     emailNotValid: 'Email is not good'
  //   };
  // }

}
