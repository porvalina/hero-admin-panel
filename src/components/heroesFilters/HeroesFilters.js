import { useDispatch, useSelector } from 'react-redux';
import { filterSelected } from './heroesFiltersSlice';

const HeroesFilters = () => {

    const activeFilter = useSelector(state => state.heroesFilters.activeFilter);
    const dispatch = useDispatch();

    const setFilter = (filter) => {
        dispatch(filterSelected(filter));
        console.log(filter)
    }

    const isActive = (filter) => {
        return activeFilter === filter ? ' active' : ''
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button 
                        className={"btn btn-outline-dark" + isActive('all')}
                        onClick={() => setFilter('all')}>
                        Все
                    </button>
                    <button 
                        className={"btn btn-danger" + isActive('fire')}
                        onClick={() => setFilter('fire')}>Огонь
                    </button>
                    <button 
                        className={"btn btn-primary" + isActive('water')}
                        onClick={() => setFilter('water')}>
                            Вода
                    </button>
                    <button 
                        className={"btn btn-success" + isActive('wind')}
                        onClick={() => setFilter('wind')}>
                            Ветер
                    </button>
                    <button 
                        className={"btn btn-secondary" + isActive('earth')}
                        onClick={() => setFilter('earth')}>
                        Земля
                    </button>
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;