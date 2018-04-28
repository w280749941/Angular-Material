import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { QuoteEffects } from './quote.effects';

@NgModule({
    declarations: [],
    imports: [
        EffectsModule.run(QuoteEffects),
    ],
    exports: [],
    providers: [],
})
export class AppEffectsModule { }
