const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    helmet = require('helmet');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(helmet());

//Rules 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }

    next();
});

//Routes

//Not found route 404
app.use((req, res) => {
    const error = new Error("Not found");

    res.status(404).json({
        message: error.message,
    });
});

module.exports = app;