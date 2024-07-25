const express = require('express')
const DataRoutes = require('./routes/DataRoutes');
const errorHandler = require('./middleware/errorhandler');
const app = express()
const port = 5000
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', DataRoutes);

app.use(cors()); // Using cors
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});