"""
Unit Tests for the functionality of the Backend Model
"""
from app import app

def test_post_leaderboard():
    """
    Test the functionality of the POST request for
    erroneous data such as negative scores or invalid names
    """

    # Initial test data to POST
    data1 = {
      "name": "",
      "score": 1000000000
    }
    data2 = {
      "name": "Player2",
      "score": -4562
    }
    data3 = {
      "name": "",
      "score": -34
    }

    #Test POST request
    resp = app.test_client().post('/', json = data1)
    assert resp.status_code == 412
    assert resp.get_json() == {"error": "Invalid data"}

    resp = app.test_client().post('/', json = data2)
    assert resp.status_code == 412
    assert resp.get_json() == {"error": "Invalid data"}

    resp = app.test_client().post('/', json = data3)
    assert resp.status_code == 412
    assert resp.get_json() == {"error": "Invalid data"}

def test_post_delete_leaderboard():
    """
    Test the functionality of the POST and DELETE request
    """

    #Test POST request
    data = {
      "name": "UnitTest",
      "score": 0
    }
    resp = app.test_client().post('/', json = data)
    return_data = resp.get_json()
    assert resp.status_code == 201
    assert return_data["name"] == data["name"]
    assert return_data["score"] == data["score"]

    #Test DELETE request, DELETE a newly-created data to preserve the old content of the database
    resp = app.test_client().delete('/', json = return_data)
    assert resp.status_code == 200

def test_all_requests_leaderboard_a():
    """
    Test the basic functionality of the POST, GET and DELETE request
    """

    # Initial test data to POST
    data1 = {
      "name": "Player1",
      "score": 1000000000
    }
    data2 = {
      "name": "Player2",
      "score": 34325200
    }
    data3 = {
      "name": "Player3",
      "score": 7582423000000
    }

    #Test POST request
    resp = app.test_client().post('/', json = data1)
    assert resp.status_code == 201
    return_data1 = resp.get_json()

    resp = app.test_client().post('/', json = data2)
    assert resp.status_code == 201
    return_data2 = resp.get_json()

    resp = app.test_client().post('/', json = data3)
    assert resp.status_code == 201
    return_data3 = resp.get_json()


    #Test DELETE request
    resp = app.test_client().delete('/', json = return_data1)
    assert resp.status_code == 200
    resp = app.test_client().delete('/', json = return_data2)
    assert resp.status_code == 200
    resp = app.test_client().delete('/', json = return_data3)
    assert resp.status_code == 200

def test_get_score():
    """
    Test the functionality of the GET request for the
     highest score of the given player's name
    """

    # Initial test data to POST
    data1 = {
      "name": "Player1",
      "score": 1000000000
    }
    data2 = {
      "name": "Player1",
      "score": 34325200
    }
    data3 = {
      "name": "Player1",
      "score": 7582423000000
    }

    #Test POST requests
    resp = app.test_client().post('/', json = data1)
    assert resp.status_code == 201
    return_data1 = resp.get_json()

    resp = app.test_client().post('/', json = data2)
    assert resp.status_code == 201
    return_data2 = resp.get_json()

    resp = app.test_client().post('/', json = data3)
    assert resp.status_code == 201
    return_data3 = resp.get_json()

    # Test GET request 
    resp = app.test_client().get('/', query_string = {"name": "Player1"})
    assert resp.status_code == 200
    assert resp.get_json() == {"score": 7582423000000}

    # Test PUT request
    resp = app.test_client().put('/', json = {"name": "Player1", "score": 9582423000000})
    assert resp.status_code == 201
    resp = app.test_client().get('/', query_string = {"name": "Player1"})
    assert resp.status_code == 200
    assert resp.get_json() == {"score": 9582423000000}
    
    #Test GET request for the highest score of the unknown player, expected -1 as the return scored"
    resp = app.test_client().get('/', query_string = {"name": "DoesNotExist"})
    assert resp.status_code == 200
    assert resp.get_json() == {"score": -1}



    #Test DELETE request
    resp = app.test_client().delete('/', json = return_data1)
    assert resp.status_code == 200
    resp = app.test_client().delete('/', json = return_data2)
    assert resp.status_code == 200
    resp = app.test_client().delete('/', json = return_data3)
    assert resp.status_code == 200
