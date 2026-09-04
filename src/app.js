const express = require('express');
//initialises the express server
const myServer = express()
//grabs all the code form players.js and stores in playerRouter ,saving lines of code ,better organisation
const playerRouter = require('./routes/players.js');
const teamRouter = require('./routes/teams.js');
const favouritesRouter = require('./routes/favourites.js');

myServer.use(express.json());
//tells server everytime user goes to api/player URL path-> hand off to playerRouter to handle it.
myServer.use('/api/players',playerRouter);
myServer.use('/api/teams',teamRouter);
myServer.use('/api/favourites',favouritesRouter);

const PORT = process.env.PORT || 8000; //check if PORT has already been assinged or go to 5000
myServer.listen(PORT,() =>
{
    console.log(`Server is running on PORT ${PORT}`);
}); //sit and listen for traffic at that PORT number