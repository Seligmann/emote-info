import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routes/dggers.js';

const app = express();
dotenv.config();

// Server stuff
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

// Express middleware
app.use('/dggers', router);
app.use('/dggers/user', router);

const hostname = process.env.HOST;
const port = process.env.PORT;

app.listen(port, hostname, () => {
    console.log(`Server running on port ${hostname}:${port}`)
});

// Default response for any other request
app.use(function(req, res) {
    res.status(404);
});