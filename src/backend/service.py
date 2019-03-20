from flask import Flask, render_template, request, send_from_directory
from db_manager import *
import os, fnmatch
from flask_cors import CORS

app = Flask(__name__, template_folder="../frontend/build/")
CORS(app)

@app.route('/static/js/<path:path>')
def send_js(path):
    return send_from_directory('../frontend/build/static/js', path)

@app.route('/static/css/<path:path>')
def send_css(path):
    return send_from_directory('../frontend/build/static/css', path)

@app.route('/static/imgs/kawaii.png')
def send_img():
    return send_from_directory('../frontend/imgs', "kawaii.png")


@app.route('/')
def main():
    return render_template('index.html')

@app.route('/ingredients')
def AllIngredients():
    return json.dumps(getAllIngredients())

@app.route('/search')
def search():
    ingredients = request.args.getlist('ing')
    filters = request.args.getlist('fil')
    priority = request.args.get('pri',type=str)
    return json.dumps(findRecipes(ingredients, filterTags=filters, priority = priority))


if __name__ == '__main__':
	app.run(host='127.0.0.1', port=5000)
