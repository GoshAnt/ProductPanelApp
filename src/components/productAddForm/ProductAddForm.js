
import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { productCreated } from '../../actions';

const ProductAddForm = () => {

    const [productName, setProductName] = useState('');
    const [productDesc, setProductDesc] = useState('');
    const [productElement, setProductElement] = useState('');
    const {filters, filtersLoadingStatus} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newProduct = {
            id: uuidv4(),
            name:productName,
            description: productDesc,
            element: productElement

        }
        request("http://localhost:3001/products", "POST", JSON.stringify(newProduct))
            .then(data => console.log(data, 'sucsess'))
            .then(dispatch(productCreated(newProduct)))
            .catch(err => console.log(err));
        setProductName('');
        setProductDesc('');
        setProductElement('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Loading...</option>
        } else if (status === "error") {
            return <option>Loading error</option>
        }

       
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
}
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmitHandler}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">The name of the product</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value = { productName}
                    onChange={e => setProductName(e.target.value)}
                    placeholder="Name the product"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Describe the product"
                    style={{"height": '130px'}}
                    value ={productDesc}
                    onChange={e => setProductDesc(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Choose the product type</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={productElement}
                    onChange={(e) => setProductElement(e.target.value)}>
                    <option value="">type</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default ProductAddForm;