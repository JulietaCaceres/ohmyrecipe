import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, arrayOf } from 'prop-types';
import { Formik, Field, Form } from 'formik';
import Select from 'react-select';

import { actions, types, selectors } from '../ducks/ingredients';
import { actions as recipesActions } from '../ducks/recipes';

class IngredientsForm extends Component {
    static propTypes = {
        fetchIngredients: func,
        ingredients: arrayOf(types.ingredient),
        onSubmit: func,
    };

    componentDidMount() {
        this.props.fetchIngredients()
    }

    handleSubmit = (values, formikBag) => {
        this.props.onSubmit(
            { 
                ...values, 
                filters: values.filters.map(({value}) => value),
                ingredients: values.ingredients.map(({ value }) => value) 
            },
            formikBag,
        )
    }

    render() {
        return (
            <Formik
                initialValues={{ ingredients: [], filters: [] }}
                onSubmit={this.handleSubmit}
            >{
                    ({ setFieldValue, values }) => (
                        <Form>
                        <label forHtml="ingredients" style={{"font-size":"24px"}} > Ingredients: </label>
                        <div style={{margin: "16px 0"}}>
                            <Field 
                                name="ingredients"
                                component={Select}
                                value={values.ingredients}
                                onChange={(value) => {
                                    setFieldValue("ingredients", value)
                                }}
                                options={this.props.ingredients}
                                searchable
                                isMulti
                            />
                        </div>
                        <label forHtml="filters" style={{"font-size":"24px"}} > Filters: </label>
                            <div style={{margin: "16px 0"}}>
                            <Field 
                                style="margin: 16px 0"
                                name="filters"
                                component={Select}
                                value={values.filters}
                                onChange={(value) => {
                                    setFieldValue("filters", value)
                                }}
                                options={this.props.filters}
                                searchable
                                isMulti
                            />
                        </div>
                        <div style={{display: "flex", width: "100%", "justify-content":"flex-end"}}>
                            <input type="submit" value="Gimme Food!" />
                        </div>
                        </Form>
                    )
                }
            </Formik>
        );
    }
}

function mapStateToProps(state) {
    return {
        ingredients: selectors.getIngredients(state).map(({ name }) => ({ value: name, label: name })),
        filters: selectors.getFilters(state).map(({name}) => ({value: name, label: name})),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        fetchIngredients: () => dispatch(actions.fetchIngredients()),
        onSubmit: ({ingredients, filters}) => dispatch(recipesActions.fetchRecipes(ingredients, filters)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsForm);