import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import { productsFetching, productsFetched, productsFetchingError, productDeleted } from '../../actions';
import ProductListItem from "../productListItem/ProductListItem";
import Spinner from '../spinner/Spinner';
import './productList.scss';
const ProductList = () => {
    const {filteredProducts, productsLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(productsFetching());
        request("http://localhost:3001/products")
            .then(data => dispatch(productsFetched(data)))
            .catch(() => dispatch(productsFetchingError()))

        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/products/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(productDeleted(id)))
            .catch(err => console.log(err));
        // eslint-disable-next-line  
    }, [request]);  

    if (productsLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (productsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>
    }

    const renderProductsList = (arr) => {
        if (arr.length === 0) {
            return (
                <CSSTransition
                    timeout={0}
                    classNames="product">
                    <h5 className="text-center mt-5">No products left</h5>
                </CSSTransition>    
            )
        }

        return arr.map(({id, ...props}) => {
            return (
                <CSSTransition 
                    key={id}
                    timeout={500}
                    classNames="product">
                    <ProductListItem  {...props} onDelete={() => onDelete(id)}/>
                </CSSTransition>
            )
        })
    }

   
    const elements = renderProductsList(filteredProducts);
    return (
        <TransitionGroup component="ul">
            {elements}
        </TransitionGroup>
    )
}

export default ProductList;