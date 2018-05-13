import * as React from 'react';
import * as classnames from 'classnames';
import * as css from './equipmentList.css';
interface Props extends React.AllHTMLAttributes<HTMLDivElement> {
    equipment: string[];
}
export const EquipmentList = ({equipment, className, ...props}: Props) => (
    <div className={classnames(css.root, className)} {...props}>
        {equipment.map((item, index) => (
            <div className={css.item} key={index}>{item}</div>
        ))}
    </div>
);