interface Action<State> {
    type: string;
    payload: {
        moduleName: string;
        moduleState?: State;
        initialState?: State;
        partName?: string;
        partData?: any; // TODO: remove any
    };
}

interface StateType {
    [key: string]: any;
}

const createReducer = <StateGeneric extends StateType>(
    actionPrefix: string,
) => {
    return (state: StateGeneric, action: Action<StateGeneric>) => {
        if (action && action.type.indexOf(actionPrefix) === 0) {
            const {
                payload: {
                    moduleName,
                    moduleState,
                    initialState,
                    partName,
                    partData,
                },
            } = action;

            if (moduleState) {
                // use Object.assign in place of spread because TS bug not fixed yet https://github.com/Microsoft/TypeScript/issues/14409
                return Object.assign({}, state, {
                    [moduleName]: Object.assign({}, moduleState),
                });
            }

            // use Object.assign in place of spread because TS has bug not fixed yet https://github.com/Microsoft/TypeScript/issues/14409
            return Object.assign({}, state, {
                [moduleName]: Object.assign(
                    {},
                    state[moduleName] || initialState,
                    {
                        [partName]: partData,
                    },
                ),
            });
        }

        return {};
    };
};

interface ConstructorParams<StateGeneric extends StateType>
    extends HelperCreatorParams {
    name: string;
    initialState: StateGeneric;
}

class Module<
    StateGeneric extends StateType,
    GlobalStateGeneric extends StateType
> {
    _moduleName: string;
    _initialState: StateGeneric;
    _reducerName: string;
    _actionPrefix: string;

    constructor({
        name,
        initialState,
        reducerName,
        actionPrefix,
    }: ConstructorParams<StateGeneric>) {
        this._moduleName = name;
        this._initialState = initialState;
        this._reducerName = reducerName;
        this._actionPrefix = actionPrefix;
    }

    setPart(name: string, data: any) {
        return {
            type: `${this._actionPrefix}_${this._moduleName}_${name}`, // data after prefix in not important, just for better debugging
            payload: {
                moduleName: this._moduleName,
                initialState: this._initialState,
                partName: name,
                partData: data,
            },
        };
    }

    getPart<T>({ name, state }: { name: string; state: GlobalStateGeneric }) {
        const globalState = this.getModuleState(state);
        const moduleState: T = globalState[name];
        return moduleState;
    }

    setModuleState(name: string, state: GlobalStateGeneric) {
        return {
            type: `${this._actionPrefix}_${this._moduleName}`,
            payload: {
                moduleName: this._moduleName,
                moduleState: state,
            },
        };
    }

    getModuleState(globalState: GlobalStateGeneric): StateGeneric {
        return (
            globalState[this._reducerName][this._moduleName] ||
            this._initialState
        );
    }
}

interface HelperCreatorParams {
    actionPrefix: string;
    reducerName: string;
}

export const createModuleHelper = <GlobalStateGeneric>({
    actionPrefix,
    reducerName,
}: HelperCreatorParams) => ({
    createModule<StateGeneric>(name: string, initialState: StateGeneric) {
        return new Module({ name, initialState, reducerName, actionPrefix });
    },

    reducer: createReducer(actionPrefix),
});
