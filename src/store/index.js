import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers';
import heroes from '../components/heroesList/heroesSlice';
import heroesFilters from '../components/heroesFilters/heroesFiltersSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }
    return next(action)
};

const store = configureStore({
    reducer: {heroes, heroesFilters, reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;