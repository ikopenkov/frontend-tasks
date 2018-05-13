import * as React from 'react';
import 'slick-carousel/slick/slick.css';
import Slick, { Settings } from 'react-slick';
import * as styles from './slider.css';
import * as classnames from 'classnames';
import { ChevronLeft } from 'components/icons/chevronLeft';
import { ChevronRight } from 'components/icons/chevronRight';

type Css = { [key: string]: string };
const css: Css = styles;

interface Props extends React.AllHTMLAttributes<HTMLDivElement>, Settings {
    theme?: 'roomPreview'
}

export const Slider = ({ theme = 'default', className = '', ...slickProps }: Props) => {
    const props: Props = {
        nextArrow: <div><ChevronRight /></div>,
        prevArrow: <div><ChevronLeft /></div>,
        dots: true,
        ...slickProps,
        className: classnames(css.root, css[`${theme}Theme`], className),
    };
    return (<Slick {...props} />);
}