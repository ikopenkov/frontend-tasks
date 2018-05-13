import * as React from 'react';
import { Field } from 'containers/field/field';
import { Score } from 'containers/score/score';
import { ShipsCounter } from 'containers/shipsCounter/shipsCounter';
import { VictoryPopup } from 'containers/victoryPopup/victoryPopup';
import * as css from './mainPage.css';
import {
    connect,
    MapDispatchToPropsFunction,
    MapStateToProps,
    Dispatch,
} from 'react-redux';
import { GlobalState } from 'reducers/rootReducer';

interface OwnProps {}

interface StateProps {}

interface DispatchProps {}

const mapStateToProps: MapStateToProps<
    StateProps,
    OwnProps,
    GlobalState
> = state => ({});

const mapDispatchToProps: MapDispatchToPropsFunction<
    DispatchProps,
    OwnProps
> = dispatch => ({});

interface Props extends OwnProps, DispatchProps, StateProps {}

class MainPageComponent extends React.Component<Props, {}> {
    componentDidMount() {}

    render() {
        const {} = this.props;
        return (
            <div className={css.root}>
                <div className={css.inner}>
                    <div className={css.scoreAndShipsCounter}>
                        <Score className={css.score} />
                        <ShipsCounter className={css.shipsCounter} />
                    </div>
                    <Field className={css.field} />
                    <VictoryPopup />
                </div>
            </div>
        );
    }
}

export const MainPage = connect(mapStateToProps, mapDispatchToProps)(
    MainPageComponent,
);
