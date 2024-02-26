
import {useHttp} from '../../hooks/http.hook';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { filtersFetched } from '../../actions';
import { filtersFetched } from '../heroesFilters/heroesFiltersSlice';
import { heroAdded } from '../heroesList/heroesSlice';

const localization = {
    'ru': {
        'all': 'все',
        'fire': 'Огонь',
        'water': 'Вода',
        'wind': 'Ветер',
        'earth': 'Земля',
    },
    'fi': {
        'fire': 'Palo',
        'water': 'Vesi',
        'wind': 'Tuuli',
        'earth': 'Maa',
    }
}

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElement, setHeroElement] = useState('');

    const dispatch = useDispatch();
    const filters = useSelector(state => state.heroesFilters.filters);
    const {addHero, getFilters} = useHttp();
    

    useEffect(() => {
        getFilters("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            // .catch(() => dispatch(filtersLoadingStatus()))
        // eslint-disable-next-line
    }, []);

    const onAdd = (e) => {
        e.preventDefault()
        // console.log(e.target.element.value)
        const hero = {
            name: heroName,
            description: heroDescr,
            element: heroElement
        }

        addHero("http://localhost:3001/heroes", "POST", JSON.stringify(hero))
            .then((hero) => dispatch(heroAdded(hero)))
            // .catch(() => dispatch(heroesDeletingError()))
        
        setHeroName('');
        setHeroDescr('');
        setHeroElement('');
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onAdd} >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">New hero name</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Description</label>
                <textarea
                    required
                    name="text"
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                    name="element">
                        <option >Я владею элементом...</option>
                        {filters.map(el => <option key={el} value={el}>{localization['ru'][el]}</option>)}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;