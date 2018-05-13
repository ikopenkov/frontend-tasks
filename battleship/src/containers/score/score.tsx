import * as React from 'react';
import * as styles from './score.css';
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
import * as classnames from 'classnames/bind';

const css = classnames.bind(styles);

interface OwnProps {
    className?: string;
}

interface StateProps {
    _fieldModule: AllFieldModuleData;
}

interface DispatchProps {}

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
> = dispatch => ({});

interface Props extends OwnProps, DispatchProps, StateProps {}

class ScoreComponent extends React.Component<Props, {}> {
    render() {
        const {
            _fieldModule: { score },
            className,
        } = this.props;

        const scores = [score, 0];

        return (
            <div className={css('root', className)}>
                {scores.map((score, index) => (
                    <div className={css('playerCol')} key={index}>
                        <div className={css('score')}>
                            {score.toString().padStart(2, '0')}
                        </div>
                        <div className={css('playerName')}>
                            player {index + 1}
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export const Score = connect(mapStateToProps, mapDispatchToProps)(
    ScoreComponent,
);
