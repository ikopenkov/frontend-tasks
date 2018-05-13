import * as React from 'react';
import * as css from './productListHeader.css';
import Input from 'components/input/input';
import SearchIcon from 'components/icons/search';
import UserButton from 'components/userButton/userButton';
import autobind from 'autobind-decorator';

interface Props {
    onSearchChange: (text: string) => void,
}

export default class ProductListHeader extends React.PureComponent<Props, {}> {
    @autobind
    onInputChange(event: React.SyntheticEvent<HTMLInputElement>) {
        const { props: { onSearchChange } } = this;
        onSearchChange(event.currentTarget.value);
    }

    render() {
        return (
            <header className={css.root}>
                <Input
                    placeholder="Type to Search..."
                    icon={<SearchIcon className={css.icon} />}
                    wrapperClassName={css.input}
                    onChange={this.onInputChange}
                />
                <UserButton className={css.userButton} />
            </header>
        );
    }
}
