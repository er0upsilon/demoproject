from __init__ import store_data_cleaned
from os import path
from flask import request, jsonify, Blueprint
from pandas.core.frame import DataFrame


# blueprint basically tells that this file is part of the app
books = Blueprint('books', __name__)
# it helps in modularizing our app so that all code is not in a single file ok

store_data = store_data_cleaned.drop(
    columns=["book_edition", "book_review_count", "book_format"])


@books.route('/gettopbooks', methods=["GET"])
def gettopbooks():
    try:
        count = None if request.args.get(
            'count') is None else int(request.args.get('count'))
        return calculateWeightedRating(store_data, count)
    except Exception as e:
        print(e)
        return jsonify(msg="Error occured. Check out error message", errmsg=str(e)), 500


@books.route('/getmostpopular', methods=["GET"])
def getmostpopular():
    try:
        count = None if request.args.get(
            'count') is None else int(request.args.get('count'))
        movie_sorted_ranking = store_data.sort_values(
            "book_rating_count", ascending=False).head(100 if count is None else count)

        print(movie_sorted_ranking)

        return movie_sorted_ranking.set_index("book_rating_count").to_json(orient='index'), 200
    except Exception as e:
        print(e)
        return jsonify(msg="Error occured. Check out error message", errmsg=str(e)), 500


@books.route('/gettopfiction', methods=["GET"])
def gettopfiction():
    try:
        count = None if request.args.get(
            'count') is None else int(request.args.get('count'))
        store_data_final = store_data[store_data['genre'].str.contains(
            'fiction|fantasy|magic', case=False, regex=True)]
        return calculateWeightedRating(store_data_final, count)
    except Exception as e:
        print(e)
        return jsonify(msg="Error occured. Check out error message", errmsg=str(e)), 500


@books.route('/gettopromance', methods=["GET"])
def gettopromance():
    try:
        count = None if request.args.get(
            'count') is None else int(request.args.get('count'))
        store_data_final = store_data[store_data['genre'].str.contains(
            'love|romance|adult', case=False, regex=True)]
        return calculateWeightedRating(store_data_final, count)
    except Exception as e:
        print(e)
        return jsonify(msg="Error occured. Check out error message", errmsg=str(e)), 500


@books.route('/gettophorror', methods=["GET"])
def gettophorror():
    try:
        count = None if request.args.get(
            'count') is None else int(request.args.get('count'))
        store_data_final = store_data[store_data['genre'].str.contains(
            'ghost|horror|paranormal|apocalyptic', case=False, regex=True)]
        return calculateWeightedRating(store_data_final, count)
    except Exception as e:
        print(e)
        return jsonify(msg="Error occured. Check out error message", errmsg=str(e)), 500


@books.route('/gettopmystery', methods=["GET"])
def gettopmystery():
    try:
        count = None if request.args.get(
            'count') is None else int(request.args.get('count'))
        store_data_final = store_data[store_data['genre'].str.contains(
            'mystery|puzzle|secret|enigma|riddle', case=False, regex=True)]
        return calculateWeightedRating(store_data_final, count)
    except Exception as e:
        print(e)
        return jsonify(msg="Error occured. Check out error message", errmsg=str(e)), 500


@books.route('/gettopthriller', methods=["GET"])
def gettopthriller():
    try:
        count = None if request.args.get(
            'count') is None else int(request.args.get('count'))
        store_data_final = store_data[store_data['genre'].str.contains(
            'thriller', case=False, regex=True)]
        return calculateWeightedRating(store_data_final, count)
    except Exception as e:
        print(e)
        return jsonify(msg="Error occured. Check out error message", errmsg=str(e)), 500


@books.route('/gettopscifi', methods=["GET"])
def gettopscifi():
    try:
        count = None if request.args.get(
            'count') is None else int(request.args.get('count'))
        store_data_final = store_data[store_data['genre'].str.contains(
            'science|Post Apocalyptic|Steampunk|Dystopia|time travel', case=False, regex=True)]
        return calculateWeightedRating(store_data_final, count)
    except Exception as e:
        print(e)
        return jsonify(msg="Error occured. Check out error message", errmsg=str(e)), 500


def calculateWeightedRating(store_data: DataFrame, count: int):
    R = store_data["rating"]
    v = store_data["book_rating_count"]

    # calculate average rating for the movies
    C = store_data["rating"].mean()

    # min no. of votes required for the movies
    m = store_data["book_rating_count"].quantile(0.70)
    print(m)

    # use the formula
    store_data["weighted_average"] = ((R*v) + (C*m))/(v+m)
    movie_sorted_ranking = store_data.sort_values("weighted_average",
                                                  ascending=False).head(100 if count is None else count)

    print(movie_sorted_ranking)

    return movie_sorted_ranking.set_index("weighted_average").to_json(orient='index'), 200
