import * as React from 'react';
import * as css from './userButton.css';
import UserIcon from 'components/icons/user';
import * as classnames from 'classnames';

export default ({ className, ...props }: React.HTMLAttributes<HTMLButtonElement>) => (
    <button className={classnames(css.root, className)} {...props}>
        <UserIcon className={css.icon} />
        Lorem Ipsum
    </button>
);
