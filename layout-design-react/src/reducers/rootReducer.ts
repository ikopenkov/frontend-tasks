import products, { ProductsState } from './productsReducer';
import { combineReducers } from "redux";

export default combineReducers({
    products,
});

export interface State {
    products: ProductsState,
}