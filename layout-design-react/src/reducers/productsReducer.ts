import { combineReducers } from 'redux';
import { createSelector } from 'reselect';
import { searchingTextChange } from 'actions/actionCreators';
import { handleActions, Action } from 'redux-actions';
import { State } from 'reducers/rootReducer';
import { allImages } from 'assets/images';
import { getRandomNumber, getRandomSentence } from 'utils/randomHelper';

const PRODUCTS = allImages.map((image, index) => ({
    id: index,
    title:
        index < 5 ? 'lorem ipsum' : getRandomSentence(getRandomNumber(1, 3)),
    subTitle:
        index < 5
            ? 'by random author'
            : getRandomSentence(getRandomNumber(2, 4)),
    image,
}));

export type Product = typeof PRODUCTS[0];

const filterProductsByText = (products: Product[], text: string = '') => {
    const formattedText = text.trim().toLowerCase();
    return products.filter(
        ({ title, subTitle }) =>
            title.toLowerCase().includes(formattedText) ||
            subTitle.toLowerCase().includes(formattedText),
    );
};

export const list = handleActions<Product[], string>(
    {
        [searchingTextChange.toString()]: (state, { payload }) =>
            payload ? filterProductsByText(PRODUCTS, payload) : PRODUCTS,
    },
    PRODUCTS,
);

export default combineReducers<ProductsState>({
    list,
});

export const selectListOfProducts = (state: State) => state.products.list;

export interface ProductsState {
    list: Product[];
}
