import * as React from 'react';
import * as css from './victoryPopup.css';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
    Dispatch,
} from 'react-redux';
import {
    FieldActions,
    FieldSelectors,
    CellParams,
    Row,
    Position,
    AllFieldModuleData,
} from 'modules/fieldModule';
import { GlobalState } from 'reducers/rootReducer';

interface OwnProps {}

interface StateProps {
    _fieldModule: AllFieldModuleData;
}

interface DispatchProps {
    _restartGame: () => void;
}

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    GlobalState
> = state => ({
    _fieldModule: FieldSelectors.getAll(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<
    DispatchProps,
    OwnProps
> = dispatch => ({
    _restartGame: () => dispatch(FieldActions.restartGame()),
});

interface Props extends OwnProps, DispatchProps, StateProps {}

class VictoryPopupComponent extends React.Component<Props, {}> {
    render() {
        const {
            _fieldModule: { isAllSunk },
            _restartGame,
        } = this.props;

        return (
            isAllSunk && (
                <div className={css.root}>
                    <div className={css.inner}>
                        <div className={css.text}>Victory!</div>
                        <button onClick={_restartGame} className={css.button}>
                            Start new game
                        </button>
                    </div>
                </div>
            )
        );
    }
}

export const VictoryPopup = connect(mapStateToProps, mapDispatchToProps)(
    VictoryPopupComponent,
);
