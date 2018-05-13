import * as React from 'react';
import { CellParams } from 'modules/fieldModule';
import * as css from './cell.css';
import * as classnames from 'classnames';
import { Position } from 'modules/fieldModule';

interface Props extends React.HTMLProps<HTMLDivElement>, CellParams {
    position: Position;
    onCheck: (postition: Position) => void;
}

export const Cell = ({
    isHit,
    isMissed,
    hasShip,
    shipId,
    className,
    position,
    onCheck,
    ...props
}: Props) => (
    <div
        className={classnames(css.root, className, {
            [css.hit]: isHit,
            [css.missed]: isMissed,
        })}
        onClick={() => onCheck(position)}
        {...props}
    />
);
