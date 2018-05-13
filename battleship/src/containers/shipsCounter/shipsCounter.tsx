import * as React from 'react';
import * as styles from './shipsCounter.css';
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

class ShipsCounterComponent extends React.Component<Props, {}> {
    render() {
        const {
            _fieldModule: { ships },
            className,
        } = this.props;

        return (
            <div className={css('root', className)}>
                {ships.map(({ type, size, sizeLeft }, index) => {
                    const misses = new Array(sizeLeft).fill(undefined);
                    const hits = new Array(size - sizeLeft).fill(undefined);

                    return (
                        <div className={css('counter')} key={index}>
                            <div className={css('shipImage', type)} />
                            <div className={css('countMarks')}>
                                {misses.map((_, index) => (
                                    <div
                                        className={css(
                                            'countMark',
                                            'miss',
                                        )}
                                        key={index}
                                    />
                                ))}
                                {hits.map((_, index) => (
                                    <div
                                        className={css(
                                            'countMark',
                                            'hit',
                                        )}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export const ShipsCounter = connect(mapStateToProps, mapDispatchToProps)(
    ShipsCounterComponent,
);
