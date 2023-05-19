export const productsFetching = () => {
    return {
        type: 'PRODUCTS_FETCHING'
    }
}

export const productsFetched = (products) => {
    return {
        type: 'PRODUCTS_FETCHED',
        payload: products
    }
}

export const productsFetchingError = () => {
    return {
        type: 'PRODUCTS_FETCHING_ERROR'
    }
}
export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}
export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}
export const filtersFetchingError = () => {
    return {
        type:'FILTERS_FETCHING_ERROR    '
    }
}
export const productCreated = (product) => {
    return {
        type: 'PRODUCT_CREATED',
        payload: product
    }
}
export const activeFilterChanged = (filter) => {
    return {
        type: 'ACTIVE_FILTER_CHANGED',
        payload: filter
    }
}
export const productDeleted = (id) => {
    return {
        type: 'PRODUCT_DELETED',
        payload: id
    }
}