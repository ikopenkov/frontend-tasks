import * as React from 'react';
import ProductListHeader from './productListHeader/productListHeader';
import * as css from './productList.css';
import { Link } from 'react-router-dom';
import { connect, Dispatch } from 'react-redux';
import { State } from 'reducers/rootReducer';
import { selectListOfProducts, Product } from 'reducers/productsReducer';
import { searchingTextChange } from 'actions/actionCreators';

const mapStateToProps = (state: State) => ({
    products: selectListOfProducts(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    changeSearch: (value: string) => {
        return dispatch(searchingTextChange(value))
    },
});

interface Props {
    products: Product[],
    changeSearch: typeof searchingTextChange,
}

class ProductList extends React.Component<Props, {}> {
    render() {
        const { props: { products, changeSearch } } = this;
        return (
            <React.Fragment>
                <ProductListHeader onSearchChange={changeSearch} />
                <h2 className={css.title}>Products</h2>
                <main>
                    <ul className={css.list}>
                        {products.map(({ image, subTitle, title, id }) => (
                            <li key={id} className={css.item}>
                                <Link
                                    className={css.itemLink}
                                    to={`/products/${id}`}
                                >
                                    <img
                                        alt={`${title} ${subTitle}`}
                                        src={image}
                                        className={css.image}
                                    />
                                    <h4 className={css.itemTitle}>{title}</h4>
                                    <div className={css.itemSubtitle}>
                                        {subTitle}
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </main>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)