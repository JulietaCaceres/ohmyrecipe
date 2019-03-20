import { combineReducers } from "redux";
import { all } from "@redux-saga/core/effects";

import {reducer as ingredients, saga as ingredientsSaga} from './ingredients';
import {reducer as recipes, saga as recipesSaga} from './recipes';


export const rootReducer = combineReducers({
    ingredients,
    recipes, 
});

export const rootSaga = function* () {
    yield all([
        ingredientsSaga(),
        recipesSaga(),
    ]);
}
