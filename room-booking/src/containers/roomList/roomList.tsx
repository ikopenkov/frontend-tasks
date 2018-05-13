import * as React from 'react';
import * as css from './roomList.css';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
    Dispatch,
} from 'react-redux';
import {
    RoomsActions,
    RoomsSelectors,
    RoomsModuleState,
} from 'modules/roomsModule';
import { GlobalState } from 'reducers/rootReducer';
import { RoomPreview } from './roomPreview/roomPreview';
import { DatePicker } from 'components/datePicker/datePicker';
import * as moment from 'moment';
import autobind from 'autobind-decorator';

interface OwnProps {}

interface StateProps {
    roomsModule: RoomsModuleState;
}

interface DispatchProps {
    loadRooms: (date?: moment.Moment) => Promise<void>;
    changeDate: (date?: moment.Moment) => void;
    changeNameFilter: (name?: string) => void;
    changeAvailableNowFilter: (value?: boolean) => void;
}

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    GlobalState
> = state => ({
    roomsModule: RoomsSelectors.getModule(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
    DispatchProps,
    OwnProps
> = dispatch => ({
    loadRooms: date => dispatch(RoomsActions.loadRooms(date)),
    changeDate: date => dispatch(RoomsActions.changeDate(date)),
    changeNameFilter: name => dispatch(RoomsActions.changeNameFilter(name)),
    changeAvailableNowFilter: value =>
        dispatch(RoomsActions.changeAvailableNowFilter(value)),
});

interface Props extends OwnProps, DispatchProps, StateProps {}

class RoomList extends React.Component<Props, {}> {
    componentDidMount() {
        this.props.loadRooms(this.props.roomsModule.date);
    }

    @autobind
    _handleDateChange(date: moment.Moment) {
        this.props.changeAvailableNowFilter(false);
        this.props.changeDate(date);
        this.props.loadRooms(date);
    }

    @autobind
    _handleNameFilterChange({
        target: { value },
    }: React.ChangeEvent<HTMLInputElement>) {
        this.props.changeNameFilter(value);
    }

    @autobind
    _handleAvailableNowFilterChange({
        target: { checked },
    }: React.ChangeEvent<HTMLInputElement>) {
        this.props.changeAvailableNowFilter(checked);
    }

    render() {
        const {
            roomsModule: { rooms, date, availableNowFilter, nameFilter },
        } = this.props;
        return (
            <div>
                <div className={css.toolbar}>
                    <div className={css.date}>
                        <DatePicker
                            selected={date}
                            onChange={this._handleDateChange}
                        />
                    </div>
                    <div className={css.filters}>
                        <label className={css.filterLabel}>
                            Filter:
                            <input
                                placeholder="Room Name"
                                className={css.filterInput}
                                value={nameFilter}
                                onChange={this._handleNameFilterChange}
                            />
                        </label>
                        <label className={css.filterLabel}>
                            <input
                                className={css.filterCheckbox}
                                checked={availableNowFilter}
                                type="checkbox"
                                onChange={this._handleAvailableNowFilterChange}
                            />
                            available now
                        </label>
                    </div>
                </div>
                <div className={css.list}>
                    {rooms.map((room, index) => (
                        <RoomPreview key={index} room={room} />
                    ))}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomList);
