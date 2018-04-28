import { NgModule } from '@angular/core';
import { StoreModule, combineReducers, ActionReducer } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import * as fromQuote from './quote.reducer';
import { compose } from '@ngrx/core/src/compose';
import { environment } from '../../environments/environment';

// import * as class from '../actions/class';

// Top level state
export interface State {
    quote: fromQuote.State;
}

// Top level initial state
const initialState: State = {
    quote: fromQuote.initialState,
};

// All reducers
const reducers = {
    quote: fromQuote.reducer,
};

// Prod & Dev reducers
const productionReducers: ActionReducer<State> = combineReducers(reducers);
// Return error during devlopment if developer change immutable states.
// storeFreeze is a parameter for combineReducers function
const developmentReducers: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);

export function reducer(state = initialState, action: any): State {
    return environment.production
        ? productionReducers(state, action)
        : developmentReducers(state, action);
}

@NgModule({
    imports: [
        StoreModule.provideStore(reducer),
        RouterStoreModule.connectRouter(),
        StoreDevtoolsModule.instrumentOnlyWithExtension(),
    ],
})
export class AppStoreModule { }