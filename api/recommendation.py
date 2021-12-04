from __init__ import store_data_cleaned as store_data
import pandas as pd
from flask import json, jsonify, Blueprint, request
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
from __init__ import store_data_cleaned as df

# blueprint basically tells that this file is part of the app
recommendation = Blueprint('recommendation', __name__)
# it helps in modularizing our app so that all code is not in a single file


# df = pd.read_csv('./api/DatasetCleaned.csv', error_bad_lines=False)
df['id'] = range(0, 1152)  # yo 9635 vnya xai number of available data
df.head(3)


def get_important_features(data):
    important_features = []
    for i in range(0, data.shape[0]):
        important_features.append(
            str(data['author'][i]) + str(data['genre'][i])+''+str(data['title'][i]))
    return important_features


@recommendation.route('/getrecommendation', methods=["POST"])
def getrecommendation():
    try:
        count = request.get_json().get('count')
        title = request.get_json().get('title')

        print(title)
        isbn_list = []
        recommend_list = pd.DataFrame()
        recommend_list.empty

        df['important_features'] = get_important_features(df)
        cm = CountVectorizer().fit_transform(df['important_features'])

        # Get the cosine similarity matrix from the count matrix
        cs = cosine_similarity(cm)
        # print the cosine similarity matrix
        # print(cs)

        # get the title of the book
        # title = 'The Maze Runner'
        # find the matrices
        isbn = df[df.title == title]['id'].values[0]

        scores = list(enumerate(cs[isbn]))
        sorted_scores = sorted(scores, key=lambda x: x[1], reverse=True)
        sorted_scores = sorted_scores[1:6]
        j = 0
        print('the most similar to', title, 'are:\n')
        for item in sorted_scores:
            title = df[df.id == item[0]]['title'].values[0]
            print(j+1, title)
            isbn_list.append(item[0])
            j = j+1
            if j >= count:
                break

        for i in range(0, len(isbn_list)):
            recommend_list = recommend_list.append(
                df[df["id"] == isbn_list[i]])

        print(recommend_list[['isbn', 'title',
              'author']])

        return recommend_list.to_json(orient='index'), 200

    except Exception as e:
        print(e)
        return jsonify(msg="Some error occured during getting the cart. Try again.",
                       errmsg=str(e)), 500


@recommendation.route('/search', methods=["GET"])
def search():
    try:
        result = pd.DataFrame()
        result.empty
        query = request.args.get('title')
        print(query)
        result = store_data[store_data["title"].str.contains(
            query, case=False)].head(10)
        print(result)
        if(not result.empty):
            return result.to_json(orient='index'), 200
        return jsonify(None), 500
    except Exception as e:
        print(str(e))
        return jsonify(msg="Error occured", errmsg=str(e)), 400
