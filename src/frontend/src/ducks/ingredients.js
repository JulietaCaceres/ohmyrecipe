import { all, put, takeEvery, call } from 'redux-saga/effects';
import { shape, string } from 'prop-types';

import {getAllIngredients} from '../api';

export const types = {
    ingredient: shape({
        name: string,
    })
}

export const actionTypes = {
    fetch: {
        start: "ingredients/FETCH",
        success: "ingredients/FETCH_SUCCESS",
        error: "ingredients/FETCH_ERROR",
    },
    add: "ingredients/ADD",
}

export const actions = {
    fetchIngredients: () => ({ type: actionTypes.fetch.start }),
    fetchIngredientsSuccess: () => ({type: actionTypes.fetch.success}),
    fetchIngredientsError: () => ({type: actionTypes.fetch.error}),
    addIngredients: (ingredients) => ({ type: actionTypes.add, ingredients }),
}

export const selectors = {
    getIngredients: (state) => state.ingredients.all,
    getFilters: (state) => state.ingredients.filters,
}

export const initialState = {
    fetching: false,
    error: false,
    all: [],
    filters: [
        {name: "Celiaco"},
        {name: "Vegetariano"},
        {name: "Saludable"},
        {name: "Vegano"},
    ],
    all: [
        {name: "Papa"},
        {name: "Cebolla"},
        {name: "Zanahoria"},
        {name: "Espinaca"},
        {name: "Tomate"},
        {name: "Apio"},
        {name: "Batata"},
        {name: "Bondiola"},
        {name: "Huevo"},
        {name: "Carne picada"},
        {name: "Pechuga"},
        {name: "Nalga"},
        {name: "Matambre"},
        {name: "Champiñon"},
        {name: "Tapas de empanada"},
        {name: "Jamon"},
        {name: "Queso"},
        {name: "Prepizza"},
        {name: "Salsa de tomate"},
        {name: "Fideos"},
        {name: "Crema"},
        {name: "Queso roquefort"},
        {name: "Manteca"},
        {name: "Pan rallado"},
        {name: "Cerveza"},
        {name: "Miel"},
        {name: "Yerba"},
    ],
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.fetch.start: return { ...state, fetching: true };
        case actionTypes.fetch.success: return { ...state, fetching: false };
        case actionTypes.fetch.error: return { ...state, fetching: false, error: true };
        case actionTypes.add: return { ...state, all: state.all.concat(action.ingredients) };
        default: return state;
    }
}

function* fetchSagasWatcher() {
    yield takeEvery(actionTypes.fetch.start, fethSagasWorker);
}

function* fethSagasWorker() {
    let ingredients;
    try{
        ingredients = yield call(getAllIngredients);
        yield put(actions.fetchIngredientsSuccess());
        yield put(actions.addIngredients(ingredients));
    } catch (e) {
        yield put(actions.fetchIngredientsError());
    }
}

export const saga = function* () {
    yield all([
        fetchSagasWatcher()
    ]);
}
