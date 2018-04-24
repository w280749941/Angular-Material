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

import 'hammerjs';
@NgModule({
  imports: [
    HttpModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
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
