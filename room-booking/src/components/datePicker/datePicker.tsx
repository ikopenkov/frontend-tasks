import * as React from 'react';
import * as css from './datePicker.css';
import * as classnames from 'classnames';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronLeft } from 'components/icons/chevronLeft';
import { ChevronRight } from 'components/icons/chevronRight';

interface Props extends ReactDatePickerProps {
    datePickerClassName?: string;
}

export const DatePicker = ({
    className,
    datePickerClassName,
    ...props
}: Props) => {
    const { onChange, selected } = props;
    return (
        <div className={classnames(css.root, className)}>
            <button
                className={css.button}
                onClick={event => {
                    onChange(selected.clone().subtract(1, 'days'), event);
                }}
            >
                <ChevronLeft />
            </button>
            <ReactDatePicker
                className={classnames(css.datePicker, datePickerClassName)}
                dateFormat={'DD.MM.YYYY'}
                {...props}
            />
            <button
                className={css.button}
                onClick={event => {
                    onChange(selected.clone().add(1, 'days'), event);
                }}
            >
                <ChevronRight />
            </button>
        </div>
    );
};
