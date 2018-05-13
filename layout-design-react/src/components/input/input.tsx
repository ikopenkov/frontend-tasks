import * as React from 'react';
import * as css from './input.css';
import * as classnames from 'classnames';

interface Props extends React.HTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    placeholder?: string;
    wrapperClassName?: string;
}

export default ({ icon, wrapperClassName, className, ...props }: Props = {}) => {
    const inputProps = {
        ...props,
        className: classnames(css.input, className),
    }
    return (
        <div className={classnames(css.root, wrapperClassName)}>
            <input {...inputProps} />
            {icon}
        </div>
    );
};
