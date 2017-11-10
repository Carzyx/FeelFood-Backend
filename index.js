'use strict'

const app = require('./routes/app'),
mongoose = require('mongoose'),
api = require('./routes/app'),
config = require('./config/config');


mongoose.Promise = global.Promise;

// Connection to DB
mongoose.connect(config.uri)
.then(() => console.log(`Established connection with database on ${config.uri}`))
.catch(err => console.log(`Error connecting with the database: ${err}`));

//Starting Node
app.listen(config.port, () => {
    console.log(`Node server running on http://localhost:${config.port}`)  
  });