import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const {heroes, heroesLoadingStatus} = useSelector(state => state.heroes);
    const {activeFilter} = useSelector(state => state.heroesFilters);
    const dispatch = useDispatch();
    const {getHeroes} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(getHeroes));
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (heroes) => {
        if (heroes.length == 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return heroes.filter(hero => hero.element == activeFilter || activeFilter == 'all')
            .map((props) => <HeroesListItem key={props.id} {...props}/>)
    }

    const heroesListItems = renderHeroesList(heroes);
    return (
        <ul>
            {heroesListItems}
        </ul>
    )
}

export default HeroesList;