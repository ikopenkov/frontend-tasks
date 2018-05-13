import { createModuleHelper } from 'utils/stateHelper';
import { RoomsModuleInterface } from './roomsModule';

export const REDUCER_NAME = 'modules';

const { reducer, createModule } = createModuleHelper({
    actionPrefix: 'MODULES',
    reducerName: REDUCER_NAME,
});

export const Modules = {
    reducer,
    createModule,
    REDUCER_NAME,
};

interface ModulesState extends RoomsModuleInterface {}

export interface ModulesStateInterface {
    [REDUCER_NAME]: ModulesState;
}
