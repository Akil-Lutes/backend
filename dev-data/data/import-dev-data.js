const fs = require('fs');
const mongoose = require('monsgoose');
const dotenv = require('dotenv');
const Character = require('./../models/characterModel');

dotenv.config({ path: `${__dirname}/../..config.env` });

const DB = process.env.DATABASE_LOCAL.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB
    ).then(con => {
        console.log('DB connection successful!');
    });


// Read JSON file
const characters = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import Data into Database
const importData = async () => {
    try {
        await Character.create(characters);
        console.log
            ('Data successfully loaded.');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

// Delete All Data from Databse
const deleteData = async () => {
    try {
        await Character.deleteMany();
        console.log('Data successfully deleted.');
    } catch (err) {
        console.log(err);
    }
    process.exit();
}

if (process.arg[2] === '--import') {
    importData();
} else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv)