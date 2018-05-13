import { createSelector } from 'reselect';
import { Dispatch } from 'react-redux';
import { Modules } from 'modules';
import { RoomsApi } from 'api/roomsApi';
import { GlobalState } from 'reducers/rootReducer';
import * as moment from 'moment';

/**
 * Module
 */
export interface Room {
    name: string;
    location: string;
    equipment: string[];
    size: string;
    capacity: number;
    avail: string[];
    images: string[];
}

export interface RoomsModuleState {
    rooms: Room[];
    isLoading: boolean;
    isLoaded: boolean;
    error: string;
    date: moment.Moment;
    nameFilter: string;
    availableNowFilter: boolean;
}

const today = moment().startOf('day');

const initialState: RoomsModuleState = {
    rooms: [],
    isLoading: false,
    isLoaded: false,
    error: '',
    date: today,
    nameFilter: '',
    availableNowFilter: false,
};
const roomsModule = Modules.createModule('roomsModule', initialState);

/**
 * Actions
 */
export const RoomsActions = {
    loadRooms: (date: moment.Moment) => async (dispatch: Dispatch<any>) => {
        dispatch(roomsModule.setPart('isLoading', true));
        dispatch(roomsModule.setPart('isLoaded', false));
        dispatch(roomsModule.setPart('error', ''));
        try {
            const rooms = await RoomsApi.loadRooms(date.unix());
            dispatch(roomsModule.setPart('isLoading', false));
            dispatch(roomsModule.setPart('isLoaded', true));
            dispatch(roomsModule.setPart('rooms', rooms));
        } catch (error) {
            dispatch(roomsModule.setPart('error', 'Some error occured, try later'));
            dispatch(roomsModule.setPart('isLoading', false));
        }
    },
    changeDate: (date: moment.Moment) => roomsModule.setPart('date', date),
    changeNameFilter: (name: string) => roomsModule.setPart('nameFilter', name),
    changeAvailableNowFilter: (availableNowFilter: boolean) => roomsModule.setPart('availableNowFilter', availableNowFilter),
};

/**
 * Selectors
 */
const getRooms = (state: GlobalState) => {
    return roomsModule.getPart<Room[]>({ state, name: 'rooms' });
};

const getDate = (state: GlobalState) => {
    return roomsModule.getPart<moment.Moment>({ state, name: 'date' });
};

const getNameFilter = (state: GlobalState) => {
    return roomsModule.getPart<string>({ state, name: 'nameFilter' });
};

const getAvailableNowFilter = (state: GlobalState) => {
    return roomsModule.getPart<boolean>({ state, name: 'availableNowFilter' });
};

const getRoomsFiltered = createSelector(
    getRooms,
    getNameFilter,
    getAvailableNowFilter,
    getDate,
    (rooms, nameFilter, availableNowFilter, date) => rooms.filter(room => room.name.includes(nameFilter)).filter(room => {
        if (!availableNowFilter) {
            return true;
        }

        const now = moment();

        const isToday = date.format('DDMMYYYY') === now.format('DDMMYYYY');
        if (!isToday) {
            return false;
        }

        return room.avail.some(interval => {
            const [timeFrom, timeTo] = interval.split(' - ');

            const currentDate = now.format('YYYY-MM-DD');
            const dateFrom = `${currentDate} ${timeFrom}`;
            const dateTo = `${currentDate} ${timeTo}`;

            return now.isBetween(dateFrom, dateTo);
        });
    }),
)

const getIsLoading = (state: GlobalState) => {
    return roomsModule.getPart<boolean>({ state, name: 'isLoading' });
};

const getIsLoaded = (state: GlobalState) => {
    return roomsModule.getPart<boolean>({ state, name: 'isLoaded' });
};

const getError = (state: GlobalState) => {
    return roomsModule.getPart<string>({ state, name: 'error' });
};

export const RoomsSelectors = {
    getRooms,
    getRoomsFiltered,
    getIsLoading,
    getIsLoaded,
    getError,
    getModule(state: GlobalState) {
        return {
            ...roomsModule.getModuleState(state),
            rooms: getRoomsFiltered(state),
        };
    },
};

export interface RoomsModuleInterface {
    room: RoomsModuleState;
}
