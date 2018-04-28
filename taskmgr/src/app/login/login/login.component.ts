import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/quote.action';
import { Quote } from '../../domain';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote$: Observable<Quote>;

  constructor(private fb: FormBuilder, private quoteService$: QuoteService,
    private store$: Store<fromRoot.State>) {
    this.quote$ = this.store$.select(state => state.quote.quote);
    this.quoteService$
      .getQuote()
      .subscribe(q => {
        this.store$.dispatch({ type: actions.ActionTypes.QUOTE_SUCCESS, payload: q });
      });
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['xxx@gmail.com', Validators.compose([Validators.required, Validators.email, this.validate])],
      password: ['', Validators.required]
    });
  }

  onSubmit({ value, valid }, ev: Event) {
    ev.preventDefault();
    console.log(JSON.stringify(value, null, 2));
    console.log(valid);
    this.form.controls['email'].setValidators(this.validate); // Set validator programmatically.
  }

  validate(c: FormControl): { [key: string]: any } {
    if (!c.value) {
      return null;
    }
    const pattern = /^xxx+/;
    if (pattern.test(c.value)) {
      return null;
    }
    return {
      emailNotValid: 'Email is not good'
    };
  }

}
