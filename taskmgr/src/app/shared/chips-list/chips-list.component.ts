import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, ControlValueAccessor, FormBuilder, FormControl } from '@angular/forms';
import { User } from '../../domain';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chips-list',
  templateUrl: './chips-list.component.html',
  styleUrls: ['./chips-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ChipsListComponent),
      multi: true,
    }
  ],
})
export class ChipsListComponent implements OnInit, ControlValueAccessor {

  @Input() multiple = true;
  @Input() label = 'Add/Edit Member';
  @Input() placeholderText = 'Please enter member email';
  items: User[];
  form: FormGroup;
  memberResults$: Observable<User[]>;
  constructor(private fb: FormBuilder, private service: UserService) {
    this.items = [];
  }

  ngOnInit() {
    this.form = this.fb.group({
      memberSearch: ['']
    });
    this.memberResults$ = this.form.get('memberSearch').valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .filter(s => s && s.length > 1)
      .switchMap(str => this.service.searchUsers(str))
      .debug('Test: ---');
  }
  private propagateChange = (_: any) => {};

  public writeValue(obj: User[]) {
    if (obj && this.multiple) {
      const userEntities = obj.reduce((entities, user) => {
        return { ...entities, [user.id]: user };
      }, {});
      if (this.items) {
        const remaining = this.items.filter(item => !userEntities[item.id]);
        this.items = [...remaining, ...obj];
      }
    } else if (obj && !this.multiple) {
      this.items = [...obj];
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {

  }

  public validate(c: FormControl) {
    return this.items ? null : {
      chipListInvalid: {
        valid: false,
      },
    };
  }

  removeMember(member: User) {
    const ids = this.items.map(u => u.id);
    const i = ids.indexOf(member.id);
    if (this.multiple) {
      this.items = [...this.items.slice(0, i), ...this.items.slice(i + 1)];
    } else {
      this.items = [];
    }
    this.form.patchValue({ memberSearch: '' });
    this.propagateChange(this.items);
  }

  handleMemberSelection(user: User) {
    if (this.items.map(u => u.id).indexOf(user.id) !== -1) {
      return;
    }
    if (this.multiple) {
      this.items = [...this.items, user];
    } else {
      this.items = [user];
    }
    this.form.patchValue({ memberSearch: user.name });
    this.propagateChange(this.items);
  }

  displayUser(user: User): string {
    return user ? user.name : '';
  }

  get displayInput() {
    return this.multiple || (this.items.length === 0);
  }
}
