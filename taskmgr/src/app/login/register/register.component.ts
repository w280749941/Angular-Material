import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { isValidAddr, extractInfo, getAddrByCode } from '../../utils/identity.util';
import { isValidDate } from '../../utils/date.util';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  selectedTab = 0;
  form: FormGroup;
  avatars$: Observable<string[]>;
  private _sub: Subscription;
  private readonly avatarName = 'avatars';

  constructor(private fb: FormBuilder) {

    this.avatars$ = Observable
      .range(1, 16)
      .map(i => `${this.avatarName}:svg-${i}`)
      .reduce((r, x) => [...r, x], []);
  }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;
    this.form = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      repeat: ['', Validators.required],
      avatar: [img],
      dateOfBirth: [''],
      address: ['', Validators.maxLength(80)],
      identity: []
    });
    const id$ = this.form.get('identity').valueChanges
      .debounceTime(300)
      .filter(v => this.form.get('identity').valid);

    this._sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.patchValue({address: addr});
        this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
      if (isValidDate(info.dateOfBirth)) {
        const date = info.dateOfBirth;
        this.form.patchValue({dateOfBirth: date});
        this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
      }
    });
  }

  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  onSubmit({value, valid}, e: Event) {
    e.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
    // this.store$.dispatch(
    //   new actions.RegisterAction({
    //     password: value.password,
    //     name: value.name,
    //     email: value.email,
    //     avatar: value.avatar,
    //     identity: value.identity,
    //     address: value.address,
    //     dateOfBirth: value.dateOfBirth
    //   }));
  }

  prevTab() {
    this.selectedTab = 0;
  }

  nextTab() {
    this.selectedTab = 1;
  }

  onTabChange(index) {
    this.selectedTab = index;
  }
}

