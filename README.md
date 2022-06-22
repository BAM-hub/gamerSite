# gamerSite
## Mern stack site for gamers to connect, chat and upload thier favourite games. 

This Project is built using the MERN stack to test my skills with the MERN stack and explore new technologies like: 
 * Socket-io For two way live communication.
 * GridFS for storing images in MongoDB.

## App Diagram
This an abstract Diagram of How I handeld Compnent interaction with the database, authentecation And Access Control. 
![gamersiteDiagram](https://user-images.githubusercontent.com/78625404/175077427-08a4a08e-9fa6-4ad7-8597-8f3fe67e47b0.png)

## To try This app You need to.
1. Clone this Project Repo.
2. run in your terminal ``` npm install ```
3. then run ``` cd client``` then ``` npm install ``` then ``` cd.. ```
4. Create in the config file a default.json file
5. Create a new MangoDB Database Get the DB connection string
6. But the string in default.json ```JSON 
7. {
  "mongoURI": "mongodb+srv://<username>:<password>@cluster0.u4bnx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  "jwtSecret": "BAMsecretoken"
}```
