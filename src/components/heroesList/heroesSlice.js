import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const {getHeroes} = useHttp();
        console.log('fetch heroes')
        return await getHeroes("http://localhost:3001/heroes")
    }
);

const heroesSlice = createSlice({
    name:'heroes',
    initialState,
    reducers: {
        heroAdded: (state, action) => {
            state.heroes.push(action.payload);
        },
        heroDeleted: (state, action) => {
            state.heroes = [...state.heroes.filter(hero => hero.id != action.payload)];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, (state) => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action)  => {
                state.heroesLoadingStatus = 'idle';
                state.heroes = action.payload;
            })
            .addCase(fetchHeroes.rejected,state => {
                state.heroesLoadingStatus = 'error';
            })
            .addDefaultCase(()=>{})
    }
});

const {actions, reducer} = heroesSlice;
export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroAdded,
    heroDeleted
} = actions;