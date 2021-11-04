# War Card Game

War Card Game is a simple card game developed by Nam Nguyen in October, 2021. In this game, two simulated players will play out the game, and the life time wins for each player stored in the MongoDB Cluster. 
![image](https://github.com/tnam02112001/capitalproject/blob/main/images/gameui.jpg?raw=true)

# Development Environment Set Up

## Frontend Environment

### 1 - Installing Node.js and npm

For the Frontend Environment, I use Node.js and npm, a package manager for Node.js packages.If you have it already on your computer, skip this section. Otherwise, please download and install [Nodejs](https://nodejs.org/en/download/) according to your operating system.

### 2 - Installing other depedencies

My project requires other Node.js depedencies that can be installed using npm. These packages can be automacially collected and installed by calling `npm install`. You can also install each package seperately by following these intrusctions:

| Package Name | Install |
| --- | --- |
|axios| `npm install axios`|
|parcel| `npm install parcel`|

### 3 - Starting the Frontend Environment

Once the installation finishes, you can start the Frontend Environment by calling `npm run dev`

## Backend Environment

### 1 - Accessing to the Backend directory

All the backend source code is located inside the `rest-api` directory. Make sure you change the current directory to `rest-api` before setting up the Backend Environment.

### 2 - Installing Flask for the RestAPI

For the Backend Environment, I implement a RESTful API in Python using a library called [Flask](https://flask.palletsprojects.com/en/1.1.x/). Please set up a Python virtual environment and install [Flask](https://flask.palletsprojects.com/en/1.1.x/installation/) according to your operarating system

### 3 - Installing other depedencies

Our project requires other Python packages that can be automacially collected and installed by calling `pip install -r requirements.txt`. You can also install each package seperately by following these intrusctions:

| Package Name | Install |
| --- | --- |
|flask-cors| `pip install flask-cors`|
|pymongo| `pip install pymongo`|
|dnspython|`pip install dnspython`|
|coverage (For testing)|`pip install coverage`|
|pytest (For testing)|`pip install pytest`|

### 4 - Starting the Backend Environment
Once the installation finishes, you can start the Backend Environment by calling `flask run`

# Upcoming Features
If I have more time working on this project, I will polish the Game UI by adding more animations and images. I will also enhance the Backend functionality by allowing the users to change names of the players, and much more!
 
