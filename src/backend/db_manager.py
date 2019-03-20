from flask import Flask
import pandas
import json

def getAllIngredients ():
	#Reads the ingredients file and returns a json object

	json_ingredients = './DB/ingredients.json'

	with open(json_ingredients, encoding='utf-8') as json_file:
		ingredients = json.load(json_file)
	return ingredients


def readRecipesFile ():

    json_recipes = './DB/recipes.json'

    with open(json_recipes, encoding='utf-8') as json_file:

        recipes = json.load(json_file)

    return recipes


def findRecipes (ingredients, filterTags = [], priority = None):

    recipes = readRecipesFile()

    availableRecipes = filterRecipesByIngredients(ingredients, recipes)

    if filterTags:
        availableRecipes = filterRecipesByTag(availableRecipes, filterTags)

    if priority is not None:
        availableRecipes = filterRecipesByPriority(availableRecipes, priority)

    if availableRecipes is None:
        return availableRecipes

    availableRecipes.sort(key = lambda x: len(x[1]))

    recipesName = [{'name': availableRecipes[i][0], 'dist': availableRecipes[i][1], 'img_src': availableRecipes[i][2], 'tags': availableRecipes[i][3], 'difficulty': availableRecipes[i][4],'instructions': availableRecipes[i][5]} for i in range(len(availableRecipes))]

    return recipesName


def filterRecipesByIngredients (ingredients, recipes):

    ingredients = set(ingredients)

    availableRecipes = []

    for recipe in recipes:

        recipeIngredients = set(recipe['ingredients'])

        diff = recipeIngredients - ingredients

        if isInRecipe(ingredients, recipeIngredients):

            availableRecipes.append((recipe['name'], list(diff), recipe['img_src'], recipe['tags'], recipe['difficulty'], recipe['instructions']))

    return availableRecipes


def isInRecipe(ingredients, recipeIngredients):

    for ing in ingredients:

        if ing in recipeIngredients:

            return True

    return False

def filterRecipesByTag (recipes, filterTags):

    filteredRecipes = []

    for i in range(len(recipes)):

        if checkAllTags(recipes[i][3], filterTags):

            filteredRecipes.append(recipes[i])

    return filteredRecipes

def checkAllTags (recipeTags, filterTags):

    for elem in filterTags:

        if elem not in recipeTags:

            return False

    return True


def filterRecipesByPriority (recipes, priority):


    if priority == "Easy":

        valid_recipes = filterRecipesByDifficulty(recipes, 1)

    elif priority == "Medium":

        valid_recipes = filterRecipesByDifficulty(recipes, 2)

    else:

        valid_recipes = filterRecipesByDifficulty(recipes, 3)

    return valid_recipes


def filterRecipesByDifficulty (recipes, difficulty):

    filteredRecipes = []

    for i in range(len(recipes)):

        if recipes[i][4] == difficulty:

            filteredRecipes.append(recipes[i])

    return filteredRecipes
