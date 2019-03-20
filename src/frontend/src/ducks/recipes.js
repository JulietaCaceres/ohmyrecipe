import { all, call, put } from 'redux-saga/effects';
import { takeLatest } from 'redux-saga/effects';
import { shape, string, arrayOf, number } from 'prop-types';

import { searchRecipes } from '../api';

export const actionTypes = {
    fetch: {
        start: "recipes/FETCH",
        success: "recipes/FETCH_SUCCESS",
        error: "recipes/FETCH_ERROR",
    },
    set: "recipes/SET",
    add: "recipes/ADD",
}

export const actions = {
    fetchRecipes: (ingredientIds, filters) => ({ type: actionTypes.fetch.start, ingredientIds, filters }),
    fetchRecipesSuccess: () => ({ type: actionTypes.fetch.success }),
    fetchRecipesError: () => ({ type: actionTypes.fetch.error }),
    setRecipes: (recipes) => ({ type: actionTypes.set, recipes }),
}

export const types = {
    recipe: shape({
        name: string,
        dist: arrayOf(string),
        img_url: string,
        tags: arrayOf(string),
        difficulty: number,
        ingredients: arrayOf(string),
        instructions: string,
    }),
}

export const selectors = {
    getRecipes: (state) => state.recipes.all,
}

const initialState = {
    fetching: false,
    error: false,
    all: [],
}

export const reducer = function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.fetch.start: return { ...state, fetching: true };
        case actionTypes.fetch.success: return { ...state, fetching: false };
        case actionTypes.fetch.error: return { ...state, fetching: false, error: true };
        case actionTypes.set: return { ...state, all: [].concat(action.recipes) };
        case actionTypes.add: return { ...state, all: state.all.concat(action.recipes) };
        default: return state;
    }
}

function* searchRecipesWatcher() {
    yield takeLatest(actionTypes.fetch.start, searchRecipesWorker);
}

function* searchRecipesWorker({ ingredientIds, filters }) {
    let recipes;
    try {
        recipes = yield call(searchRecipes, ingredientIds, filters);
        yield put(actions.fetchRecipesSuccess());
        yield put(actions.setRecipes(recipes));
    } catch (e) {
        yield put(actions.fetchRecipesError());
    }
}

export const saga = function* () {
    yield all([
        searchRecipesWatcher()
    ]);
}