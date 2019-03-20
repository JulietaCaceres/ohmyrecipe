import React, { Component } from 'react';

import IngredientsForm from './IngredientsForm';
import RecipesSuggestions from './RecipesSuggestions';

class RecipesPage extends Component {

    render() {
        return (
            <div>
                <IngredientsForm />
                <RecipesSuggestions />
            </div>
        );
    }
}

export default RecipesPage;
