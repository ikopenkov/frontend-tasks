import * as React from 'react';
import * as css from './navigation.css';
import ProductIcon from 'components/icons/product';
import WhitelistIcon from 'components/icons/whitelist';
import CrossingArrowsIcon from 'components/icons/crossingArrows';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
    {
        text: 'Products',
        url: '/',
        Icon: ProductIcon,
    },
    {
        text: 'Whiteslists',
        url: '#',
        Icon: WhitelistIcon,
    },
    {
        text: 'Api Application',
        url: '#',
        Icon: CrossingArrowsIcon,
    },
];

export default class Navigation extends React.PureComponent {
    render() {
        return (
            <nav className={css.root}>
                <h1 className={css.navHead}>
                    <Link className={css.headLink} to="/">Westeros</Link>
                </h1>
                <ul className={css.list}>
                    {NAV_LINKS.map(({ text, url, Icon }, index) => (
                        <li className={css.item} key={index}>
                            <Link className={css.link} to={url}>
                                {React.createElement(Icon, {
                                    className: css.icon,
                                })}
                                {text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        );
    }
}
