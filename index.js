const express = require('express')
const DataRoutes = require('./routes/DataRoutes');
const errorHandler = require('./middleware/errorhandler');
const app = express()
const port = 8080

app.use('/api', DataRoutes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});