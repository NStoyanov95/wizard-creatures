const express = require('express');

const expressConfigurator = require('./config/expressConfig');
const handlebarsConfigurator = require('./config/handlebarsConfig');
const dbConfigurator = require('./config/dbConfig');

const routes = require('./routes');

const app = express();
const PORT = 3000;

expressConfigurator(app);
handlebarsConfigurator(app);


dbConfigurator()
    .then(()=>console.log('DB connected!'))
    .catch(err => console.log(err));
    

app.use(routes);


app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}`));

