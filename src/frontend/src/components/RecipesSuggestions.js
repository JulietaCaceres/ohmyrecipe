import React from 'react';
import { connect } from 'react-redux';

import { selectors, types } from '../ducks/recipes';

import './RecipeSuggestion.scss';

function RecipeImage({ recipe: { name, img_src } }) {
    return (
        <div className="img">
            <img src={img_src} alt={name} />
        </div>
    );
}

RecipeImage.propTypes = {
    recipe: types.recipe,
}

function DificultyMeter({ recipe: { difficulty } }) {
    const diff = difficulty <= 1 ? 'low' : difficulty === 2 ? 'medium' : 'high';

    return <div className={`ometer ${diff}`}>
        <span />
        <span />
        <span />
    </div>;
}

function RecipeTags({ recipe: { tags } }) {
    return (
        <div className="tags">{tags.map(tag => <span>{tag}</span>)}</div>
    );
}

function RecipeSuggestion({ recipe }) {
    return (
        <div className="recipe-suggestion">
            <RecipeImage recipe={recipe} />
            <div>
                <div className="recipe-header">
                    <h1>{recipe.name}</h1>
                    <span />
                    <div>
                        <DificultyMeter recipe={recipe} />
                        <RecipeTags recipe={recipe} />
                    </div>
                </div>
                <div>
                    {recipe.instructions}
                </div>
            </div>
        </div>
    );
}

function RecipesSuggestions({ recipes }) {
    return (
        <ul class="recipe-suggestion">
            {recipes.map(recipe =>
                <li key={recipe.name}>
                    <RecipeSuggestion recipe={recipe} />
                </li>
            )}
        </ul>
    );
}

function mapStateToProps(state) {
    return ({
        recipes: selectors.getRecipes(state),
    });
}

export default connect(mapStateToProps)(RecipesSuggestions);