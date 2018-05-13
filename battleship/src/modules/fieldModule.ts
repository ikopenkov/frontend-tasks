import { createSelector } from 'reselect';
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';
import { Modules } from 'modules';
import { GlobalState } from 'reducers/rootReducer';

/**
 * Module
 */
export interface CellParams {
    shipId?: number;
    hasShip?: boolean;
    isHit?: boolean;
    isMissed?: boolean;
}

export type Row = CellParams[];

export interface FieldModuleState {
    rows: Row[];
    ships: Ship[];
    score: number;
}

interface Ship {
    type: string;
    size: number;
    sizeLeft: number;
    id: number;
    positions: Position[];
}

const ROWS_COUNT = 10;
const COLS_COUNT = 10;

const TEST_FIELD_DATA: FieldData = {
    shipTypes: {
        carrier: { size: 5, count: 1 },
        battleship: { size: 4, count: 1 },
        cruiser: { size: 3, count: 1 },
        submarine: { size: 3, count: 1 },
        destroyer: { size: 2, count: 1 },
    },
    layout: [
        {
            ship: 'carrier',
            positions: [[2, 9], [3, 9], [4, 9], [5, 9], [6, 9]],
        },
        { ship: 'battleship', positions: [[5, 2], [5, 3], [5, 4], [5, 5]] },
        { ship: 'cruiser', positions: [[8, 1], [8, 2], [8, 3]] },
        { ship: 'submarine', positions: [[3, 0], [3, 1], [3, 2]] },
        { ship: 'destroyer', positions: [[0, 0], [1, 0]] },
    ],
};

const createEmptyRow = () =>
    new Array<CellParams>(ROWS_COUNT).fill({}).map<CellParams>(() => ({}));
const createEmptyCell = () =>
    new Array(COLS_COUNT).fill(undefined).map(() => createEmptyRow());

const getInitialState = ({
    layout,
    shipTypes,
}: FieldData = TEST_FIELD_DATA) => {
    const ships = layout.map<Ship>(({ ship, positions }, index) => {
        const { count, size } = shipTypes[ship];
        return {
            size,
            sizeLeft: size,
            type: ship,
            id: index,
            positions,
        };
    });

    const rows = createEmptyCell();

    layout.forEach(({ ship, positions }, index) => {
        const { size, count } = shipTypes[ship];

        // TODO: add error when ships is over field borders

        // TODO: add error when ship type count is not equals provided ships data

        positions.forEach(([x, y]) => {
            const cell = rows[x][y];
            cell.shipId = index;
            cell.hasShip = true;
        });
    });

    return {
        rows,
        ships,
        score: 0,
    };
};

const initialState: FieldModuleState = getInitialState();
const fieldModule = Modules.createModule('fieldModule', initialState);

/**
 * Actions
 */

const restartGame = () => fieldModule.setModuleState(getInitialState());

interface FieldData {
    shipTypes: {
        [key: string]: ShipData;
    };
    layout: ShipPositionsData[];
}

interface ShipPositionsData {
    ship: string;
    positions: Position[];
}

export type Position = [number, number];

interface ShipData {
    size: number;
    count: number;
}

const checkAdjacentCells = (ship: Ship, rows: Row[]) => {
    ship.positions.forEach(([x, y]) => {
        const xOffsets = [-1, -1, -1, 0, 0, 1, 1, 1];
        const yOffsets = [-1, 0, 1, -1, 1, -1, 0, 1];
        xOffsets.forEach((xOffset, index) => {
            const yOffset = yOffsets[index];

            if (isValidPosition([x + xOffset, y + yOffset])) {
                const cell = rows[x + xOffset][y + yOffset];
                cell.isMissed = !cell.hasShip;
            }
        });
    });
};

const isValidPosition = ([x, y]: Position) =>
    x >= 0 && y >= 0 && x < COLS_COUNT && y < ROWS_COUNT;

const checkField: ActionCreator<ThunkAction<Action, GlobalState, void>> = ([
    x,
    y,
]: Position) => (dispatch, getState) => {
    const module = getModule(getState());
    const { rows, ships } = module;
    let { score } = module;
    const cell = rows[x][y];

    const isChecked = cell.isHit || cell.isMissed;
    if (!isChecked) {
        if (cell.hasShip) {
            cell.isHit = true;
            const ship = ships[cell.shipId];
            ship.sizeLeft--;
            score++;

            if (ship.sizeLeft === 0) {
                checkAdjacentCells(ship, rows);
            }
        } else {
            cell.isMissed = true;
        }

        return dispatch(
            fieldModule.setModuleState({
                rows,
                ships,
                score,
            }),
        );
    }
};

export const FieldActions = {
    checkField,
    restartGame,
};

/**
 * Selectors
 */

const getModule = (state: GlobalState) => {
    return fieldModule.getModuleState(state);
};

const getRows = (state: GlobalState) => {
    return fieldModule.getPart<Row[]>({ state, name: 'rows' });
};

const getIsAllSunk = (state: GlobalState) => {
    const { score, ships } = getModule(state);

    const allShipsSize = ships.reduce((result, { size }) => {
        return result + size;
    }, 0);

    return score === allShipsSize;
};

export const FieldSelectors = {
    getAll: (state: GlobalState): AllFieldModuleData => ({
        ...getModule(state),
        isAllSunk: getIsAllSunk(state),
    }),
};

export interface AllFieldModuleData extends FieldModuleState {
    isAllSunk: boolean;
}

export interface FieldModuleInterface {
    fieldModule: FieldModuleState;
}
