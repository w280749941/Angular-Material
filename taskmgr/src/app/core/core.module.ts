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
import 'rxjs/add/operator/take';

import 'hammerjs';
import { ServicesModule } from '../services/services.module';
@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    SharedModule,
    ServicesModule.forRoot(),
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
