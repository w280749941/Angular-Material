import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../domain/quote.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  quote: Quote = {
    cn: 'CN Fallback',
    en: 'EN Fallback',
    pic: 'assets/img/quote_fallback.jpg',
  };
  constructor(private fb: FormBuilder, private quoteService$: QuoteService) {
    this.quoteService$
      .getQuote()
      .subscribe(q => this.quote = q);
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
