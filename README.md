# gamerSite
## Mern stack site for gamers to connect, chat and upload thier favourite games. 

This Project is built using the MERN stack to test my skills with the MERN stack and explore new technologies like: 
 * Socket-io For two way live communication.
 * GridFS for storing images in MongoDB.
## Live on https://gamersite.up.railway.app/

## App Diagram
This an abstract Diagram of How I handeld Compnent interaction with the Backend, authentecation And Access Control. 
![gamersiteDiagram](https://user-images.githubusercontent.com/78625404/175077427-08a4a08e-9fa6-4ad7-8597-8f3fe67e47b0.png)

## To try This app You need to.
1. Clone this Project Repo.
2. run in your terminal ``` npm install ```
3. then run ``` cd client``` then ``` npm install ``` then ``` cd.. ```
4. Create in the root directory a .env file
5. Create a new MangoDB Database Get the DB connection string
6. Put the string in .env and add a secret as follows:
``` .env
mongoURI=mogodb_uri
jwtSecret=secter_key
```
7. run ```npm run dev```

## App Preview
### In this demonstration two instances of the app are open to cover most of it's features. 
![gamerSite](https://user-images.githubusercontent.com/78625404/175083654-e497659c-0dfb-478d-aeef-e5ea4325e543.png)

## Tech Stack
* Frontend
  * React
  * react-router-dom
  * Redux
  * axios
  * form-data
  * moment
  * react-moment
  * redux-thunk
  * uuid
  * socket.io-client
* Backend
  * bcryptjs
  * crypto
  * dotenv
  * express-validator
  * express
  * gridfs-stream
  * jsonwebtoken
  * method-override
  * moment
  * multer
  * multer-gridfs-storage
  * socket.io

## What I'm Currentlly working on.
* Backend Refactoring.
* auto scrool in chat
* chat alerts style
