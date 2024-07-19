const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const sequelize = require('./util/database');

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'view')));

const empruntRoutes = require('./route/empruntRoute');

const corsOptions = {
    origin: 'http://172.16.20.25:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
// Middleware Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/emprunts', empruntRoutes);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html');
});

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Emprunt Service running on port ${PORT}`);
    });
});
