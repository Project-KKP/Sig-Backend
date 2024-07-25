const express = require('express');
const DataRoutes = require('./routes/DataRoutes');
const errorHandler = require('./middleware/errorhandler');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importing cors

const app = express();
const port = 5000;

// CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
};

app.use(cors(corsOptions)); // Using cors with options
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', DataRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
