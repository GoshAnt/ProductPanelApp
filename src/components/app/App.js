import ProductList from '../productList/ProductList';
import ProductAddForm from '../productAddForm/ProductAddForm'
import ProductFilters from '../productFilters/productFilters';
import './app.scss';
const App = () => {
    
    return (
        <main className="app">
            <div className="content">
                <ProductList/>
                <div className="content__interactive">
                    <ProductAddForm/>
                    <ProductFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;