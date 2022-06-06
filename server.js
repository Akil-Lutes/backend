// Server Related Code
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');




const DB = process.env.DATABASE_LOCAL.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

// Deprecation options
// Hosted Database
// mongoose.connect(DB, {
    // these options are not available in mongoose versions 6 & up
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false
// }).then(con => {
//     console.log(con.connections);
//     console.log('DB connection successful!');
// });

// Database Local Connection
mongoose
    .connect(process.env.DATABASE_LOCAL).then(con => {
        console.log(con.connections);
        console.log('DB connection successful!');
    });

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});


// I have to install ndb locally (dev-dependency), debug "npm install --save-dev ndb"