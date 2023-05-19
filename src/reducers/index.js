const initialState = {
    products: [],
    productsLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'all',
    filtersLoadingStatus: 'idle',
    filteredProducts: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCTS_FETCHING':
            return {
                ...state,
                productsLoadingStatus: 'loading'
            }
        case 'PRODUCTS_FETCHED':
            return {
                ...state,
                products: action.payload,
                filteredProducts:   state.activeFilter === 'all' ? 
                    action.payload :
                    action.payload.filter(item => item.element === state.activeFilter),
                productsLoadingStatus: 'idle'
            }
        case 'PRODUCTS_FETCHING_ERROR':
            return {
                ...state,
                productsLoadingStatus: 'error'
            }
            case 'FILTERS_FETCHING':
                return {
                    ...state,
                    filtersLoadingStatus: 'loading'
                }
            case 'FILTERS_FETCHED':
                return {
                    ...state,
                    filters: action.payload,
                    filtersLoadingStatus: 'idle'
                }
            case 'FILTERS_FETCHING_ERROR':
                return {
                    ...state,
                    filtersLoadingStatus: 'error'
                }
            case 'ACTIVE_FILTER_CHANGED':
                return {
                    ...state,
                    activeFilter: action.payload,
                    filteredProducts: action.payload === 'all' ? 
                                    state.products :
                                    state.products.filter(item => item.element === action.payload)
                }
            case 'PRODUCT_CREATED': 
                const newCreatedProduct = [...state.products, action.payload];
                return {
                    ...state,
                    products: newCreatedProduct,
                    filteredProducts: state.activeFilter === 'all' ? newCreatedProduct :
                        newCreatedProduct.filter(item => item.element === state.activeFilter)
                }
            case 'PRODUCT_DELETED' : 
                const newProductList = state.products.filter(item => item.id !== action.payload)
                return {
                    ...state,
                    products: newProductList,
                    filteredProducts: state.activeFilter === 'all' ? newProductList :
                        newProductList.filter(item => item.element === state.activeFilter)
                }
        default: return state
    }
}

export default reducer;