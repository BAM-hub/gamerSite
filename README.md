# gamerSite
## Mern stack site for gamers to connect, chat and upload thier favourite games. 

This Project is built using the MERN stack to test my skills with the MERN stack and explore new technologies like: 
 * Socket-io For two way live communication.
 * GridFS for storing images in MongoDB.

## App Diagram
This an abstract Diagram of How I handeld Compnent interaction with the Backend, authentecation And Access Control. 
![gamersiteDiagram](https://user-images.githubusercontent.com/78625404/175077427-08a4a08e-9fa6-4ad7-8597-8f3fe67e47b0.png)

## To try This app You need to.
1. Clone this Project Repo.
2. run in your terminal ``` npm install ```
3. then run ``` cd client``` then ``` npm install ``` then ``` cd.. ```
4. Create in the config folder a default.json file
5. Create a new MangoDB Database Get the DB connection string
6. Put the string in default.json and add a secret as fllows:
``` JSON
{
  "mongoURI": "mongodb+srv://<username>:<password>@cluster0.u4bnx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  "jwtSecret": "SelectedSecret"
}
```
7. run ```npm run dev```

## App Preview
![gamerSite](https://user-images.githubusercontent.com/78625404/175083654-e497659c-0dfb-478d-aeef-e5ea4325e543.png)

## What I'm Currentlly working on.
* Backend Refactoring.
* Bug discover and fixes.
* Refactoring The Frontend.

## After I finsh Working 
### Deploy to Heroku.
