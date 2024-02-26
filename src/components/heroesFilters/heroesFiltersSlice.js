import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
}

const heroesFiltersSlice = createSlice({
    name:'heroesFilters',
    initialState,
    reducers: {
        filtersFetched: (state, action) => {
            state.filtersLoadingStatus = 'idle';
            state.filters = action.payload;
        },
        filtersFetchingError: state => {
            state.filtersLoadingStatus = 'error';
        },
        filterSelected: (state, action) => {
            state.activeFilter = action.payload;
        }
    }
});

const {actions, reducer} = heroesFiltersSlice;
export default reducer;
export const {
    filtersFetched,
    filtersFetchingError,
    filterSelected
} = actions;