import { Injectable } from '@angular/core';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { QuoteService } from '../services/quote.service';
import * as actions from '../actions/quote.action';

@Injectable()
export class QuoteEffects {

    /**
     * This first make sure the action type is Quote action,
     * and it then map to payload, it then try to call quoteService to get quote
     * on success then it dispatch QuoteSuccessAction with value returned,
     * otherwise it dispatch error.
     */
    @Effect()
    quote$: Observable<Action> = this.actions$
        .ofType(actions.ActionTypes.QUOTE)
        .map(toPayload)
        .switchMap(() => this.quoteService
            .getQuote()
            .map(quote => new actions.QuoteSuccessAction(quote))
            .catch(err => of(new actions.QuoteFailAction(JSON.stringify(err))))
        );

    constructor(private actions$: Actions, private quoteService: QuoteService) { }
}
