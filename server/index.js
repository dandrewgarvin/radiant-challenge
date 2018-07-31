require('dotenv').config();

// ========== IMPORTS ========== //
const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    chalk = require('chalk'),
    axios = require('axios'),
    routes = require('./routes');

const app = express();

// ========== MIDDLEWARE ========== //
app.use(cors());
app.use(bodyParser.json());

app.set('axios', axios);
app.set('flickrUrl', process.env.FLICKR_URL)

// ========== ROUTES DECORATOR ========== //
routes(app);

// ========== RESPONSE CRAFTER ========== //
app.use((req, res) => {
    let { status, ...response } = req.data;
    console.log(`Received and Handled request for ${chalk.magenta(req.url)}. Method took ${chalk.green(response.time)} ms.`)
    res.status(status || 400).json(response);
})

// ========== SERVER LISTENER ========== //
const port = process.env.SERVER_PORT || 3005;

app.listen(port, () => {
    const path = __dirname.split('/').slice(4).join('/')
    console.log(`Port: ${chalk.cyan(port)} | Path: ${chalk.yellow(path)} | Environment: ${chalk.green(process.env.NODE_ENV || 'local')} | Status: ${chalk.magenta('Running')}`)
})