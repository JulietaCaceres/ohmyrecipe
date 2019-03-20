import axios from 'axios';

const conn = axios.create({
	baseURL: 'http://127.0.0.1:5000',
});

export function getAllIngredients() {
	return conn.get('/ingredients').then(({ data }) => {return data });
}

export function searchRecipes(ingredients, filters = []) {

	var path = '/search?'

	const params = new URLSearchParams()
	ingredients.forEach((ingredient)=>{params.append('ing',ingredient)})
	filters.forEach((filter)=>{params.append('fil',filter)})


	return conn.get(path + params.toString()).then(({ data }) => {return data });
}
