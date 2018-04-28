import { NgModule, SkipSelf, Optional } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { loadSvgResources } from '../utils/svg.util';
import { AppRoutingModule } from '../app-routing.module';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/zip';
import 'rxjs/add/observable/range';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/count';
import 'rxjs/add/operator/do';
import 'hammerjs';
import '../utils/debug.util';
import { ServicesModule } from '../services/services.module';
import { AppStoreModule } from '../reducers';
@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    ServicesModule.forRoot(),
    AppStoreModule,
    AppRoutingModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://localhost:3000',
      },
    },
  ]
})
export class CoreModule {
  // @SkipSelft to prevent infinity loop.
  // @Optional for first time construction
  constructor(@Optional() @SkipSelf() parent: CoreModule,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    if (parent) {
      throw new Error('Already exist a core module, can not load more');
    }
    loadSvgResources(iconRegistry, sanitizer);
  }
}
