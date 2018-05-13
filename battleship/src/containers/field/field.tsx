import * as React from 'react';
import * as styles from './field.css';
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
import { Cell } from './cell/cell';
import autobind from 'autobind-decorator';
import * as classnames from 'classnames/bind';

const css = classnames.bind(styles);

interface OwnProps {
    className?: string;
}

interface StateProps {
    _fieldModule: AllFieldModuleData;
}

interface DispatchProps {
    checkField: (position: Position) => void;
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
    checkField: position => dispatch(FieldActions.checkField(position)),
});

interface Props extends OwnProps, DispatchProps, StateProps {}

class FieldComponent extends React.Component<Props, {}> {
    @autobind
    _handleCellCheck(position: Position) {
        this.props.checkField(position);
    }

    @autobind
    _renderRow(cells: CellParams[], index: number) {
        return (
            <div key={index} className={css('row')}>
                {cells.map((cell, cellIndex) => (
                    <Cell
                        {...cell}
                        position={[index, cellIndex]}
                        onCheck={this._handleCellCheck}
                        key={cellIndex}
                    />
                ))}
            </div>
        );
    }

    render() {
        const {
            _fieldModule: { rows, ships, score, isAllSunk },
            className,
        } = this.props;

        return (
            <div className={css('root', className)}>
                <div className={css('inner')}>{rows.map(this._renderRow)}</div>
            </div>
        );
    }
}

export const Field = connect(mapStateToProps, mapDispatchToProps)(
    FieldComponent,
);
