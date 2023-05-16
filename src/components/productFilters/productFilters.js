
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const ProductFilters = () => {
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter products</p>
                <div className="btn-group">
                    <button className="btn btn-outline-dark active">All</button>
                    <button className="btn btn-danger">technique</button>
                    <button className="btn btn-primary">book</button>
                    <button className="btn btn-success">clothes</button>
                    <button className="btn btn-secondary">other</button>
                </div>
            </div>
        </div>
    )
}

export default ProductFilters;