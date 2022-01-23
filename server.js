// Server Related Code
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env' })

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});