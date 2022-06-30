import express from 'express';
import bodyParser from 'body-parser';
// import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/dggers.js';

const app = express();
dotenv.config();

// Server stuff

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

// Express middleware
app.use('/dggers', postRoutes);

var  HTTP_PORT = 8000;
app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

// const PORT = process.env.PORT || 5000;


// Connect to database
// mongoose.connect(process.env.CONNECTION_URL).then(
//     () => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)),
//     err => console.log(`${err} did not connect`)
// );

// Default response for any other request
app.use(function(req, res){
    res.status(404);
});