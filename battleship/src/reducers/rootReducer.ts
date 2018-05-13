import { combineReducers } from 'redux';
import { Modules, ModulesStateInterface } from 'modules';

export const rootReducer = combineReducers({
    [Modules.REDUCER_NAME]: Modules.reducer,
});

export interface GlobalState extends ModulesStateInterface {}
