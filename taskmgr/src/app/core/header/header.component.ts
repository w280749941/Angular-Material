import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Auth } from '../../domain/auth.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as actions from '../../actions/auth.action';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth$: Observable<Auth>;

  @Output()
  toggle = new EventEmitter<void>();

  @Output()
  toggleDarkTheme = new EventEmitter<boolean>();

  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(fromRoot.getAuthState);
  }

  ngOnInit() {

  }

  openSideBar() {
    // This event calls (toggle) function inside parent html, which calls sidenav.open()
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }

  logout() {
    this.store$.dispatch(new actions.LogoutAction(null));
  }

}
