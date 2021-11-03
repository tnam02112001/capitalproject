"""
A basic MongoDB model that provides database access functionality
to the leaderboard stored in MongoDB server
"""
import pymongo
from bson import ObjectId
import ssl

class Model(dict):
    """
    A simple model that wraps mongodb document
    """
    __getattr__ = dict.get
    __delattr__ = dict.__delitem__
    __setattr__ = dict.__setitem__

    def save(self):
        """
        A function handling POST request that saves
        a player to the score database
        """
        self.collection.insert_one(self)
        self._id = str(self._id)

    def update(self):
        """
        A function handling PUT request that saves
        a new score of a player
        """
        filter = {'name': self.name}
        newvalues = {"$set": {'score': self.score}}
        self.collection.update_many(filter, newvalues)
    
    
    def remove(self):
        """
        A function handling DELETE request that delete
        a player to the leaderboard database
        """
        resp = self.collection.delete_one({"_id": ObjectId(self._id)})
        self.clear()
        return resp


class Users(Model):
    """
    Class Users provide functions to access the leaderboard
    """
    db_client = pymongo.MongoClient("mongodb+srv://tnam-nguyen:Soc_nhi_74" \
    "@warcardgame.fcmbk.mongodb.net/WarCardGame?retryWrites=true&w=majority",  ssl=True,ssl_cert_reqs=ssl.CERT_NONE)
    collection = db_client["WarCardGame"]["score"]

    def get_scores(self, num_limit):
        """
        A function that returns a leaderboard in the database

        Args:
            num_limit (int): The maximum number of entries returned. 0 for no limit
        Returns:
            (list): A list of [num_limit] JSON entries sorted by descending score
        """
        leaders = list(self.collection.find().sort("score", pymongo.DESCENDING).limit(num_limit))
        for leader in leaders:
            leader["_id"] = str(leader["_id"])
        return leaders

    def get_score(self, name):
        """A function that returns the highest score of
        the player with the given name in the database

        Args:
            name (string): the name of the player

        Returns:
            score (int): the highest score of the given player, -1 if not found
        """
        top_entry = list(self.collection.find({"name": name})
            .sort("score", pymongo.DESCENDING).limit(1))
        if len(top_entry) == 0:
            return -1
        return top_entry[0]["score"]

