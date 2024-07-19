const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const sequelize = require('./util/database');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'view')));

const livreRoutes = require('./route/livreRoute');

/*app.use(cors({
    origin: 'http://172.16.20.25:3003', // Origine de votre application frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));*/

const corsOptions = {
    origin: ['http://172.16.20.25:3000', 'http://172.16.20.25:3003'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Middleware Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/books', livreRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Livre Service running on port ${PORT}`);
    });
});