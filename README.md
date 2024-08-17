# Sport Meets
Sport Meets is a mobile application built with React Native and Expo, completed within 10 days as the final project of the Northcoders bootcamp. 
The app allows users to register, login, browse events by category or location, join events, and interact through messages related to specific sports events.

## Features
User Authentication (Register and Login)
Event Browsing and Joining
Real-time Messaging for Events
View and Update User Profiles
Dynamic Event Creation and Management

## Installation
1. Clone the repo
2. Install expo: npm install -g expo-cli
3. Install all the dependencies: npm i
4. Run the project: expo start
5. To run the app on the android emulator:npm run android, or via the web: npm run web
6. Login with the following details:
   username: Alex, password: teacher, OR  username: Mo, password: iPhone. Alternatively you can create an account.

##  API Integration
The app communicates with a backend server via RESTful APIs built with Python (Flask/Django) hosted at https://be-sportmeets-py.onrender.com/api/sportmeets.
It handles all data manipulations for events, users, messages, and more.

## Real-Time Communication with Socket.IO
This application uses Socket.IO to provide real-time communication between web clients and servers. 
This feature is critical for enabling live chat functionalities within the app, see the repo here: https://github.com/AGreaves99/BE-socket-io.



