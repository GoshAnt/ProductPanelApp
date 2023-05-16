import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { productsFetching, productsFetched, productsFetchingError } from '../../actions';
import ProductListItem from "../productListItem/ProductListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const ProductList = () => {
    const {products, productsLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(productsFetching());
        request("http://localhost:3001/products")
            .then(data => dispatch(productsFetched(data)))
            .catch(() => dispatch(productsFetchingError()))

        // eslint-disable-next-line
    }, []);

    if (productsLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (productsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderProductsList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">No products left</h5>
        }

        return arr.map(({id, ...props}) => {
            return <ProductListItem key={id} {...props}/>
        })
    }

    const elements = renderProductsList(products);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default ProductList;