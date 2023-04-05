const express = require('express');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const sequelize = require('./config/connection');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3001;

//helmet middleware to set HTTP headers for improved security 
app.use(helmet());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//placing the helmet middleware before the routes to make sure it is executed for all requests
app.use('/', routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
