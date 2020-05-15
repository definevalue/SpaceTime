# SpaceTime 
SpaceTime is a fully functioning social media website created with JavaScript, Node.js, React, Express, and MongoDB.

* **Post Feature:** Users of the app can post images and text or like and comments on a post 
* **Follow Feature:** Users of the app can follow other users
* **Profile Feature:** Users can upload their profile image 

## Demo Image
![MainPage](https://github.com/andrewta999/SpaceTime/blob/master/demo/MainPage.png)

![MainPage2](https://github.com/andrewta999/SpaceTime/blob/master/demo/MainPage2.png)

## How to run the app locally
1. Run the backend:
- run command: npm install 
- create a new file .env in the root directory and define the following variables inside this file
    - MONGO_URI: an uri that connects to a mongo database
    - PORT: the port that the backend runs on (Ex. 3001)
    - JWT_SECRET: any string to authenticate user 
    - ORIGIN: hosts that the backend accepts requests from (Ex. http://localhost:3000)
- run command: npm run dev
- the backend is now on localhost:3001

2. Run the frontend:
- run command: npm install
- update the baseUrl variable inside config.js file if necessary
- run command: npm start
- the app automatically opens on the browser

## Deployment
If you want to visit the app, follow the link below. Use this test account to login to the app
- Email: admin1@gmail.com
- Password: 123456

1. Frontend (click here to visit the website): https://spacetime-frontend.herokuapp.com/
2. Backend (this link is to access the backend): https://spacetime-backend.herokuapp.com/
