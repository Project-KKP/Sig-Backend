const db = require('../dbconnection');

exports.getBlank = async (req, res, next) => {
  const query = "SELECT lokasi, operator, latitude, `longitude` FROM tb_blank";
  try {
    const [results] = await db.promise().query(query);
    res.json(results);
  } catch (err) {
    console.error(err); // Log the error to the console for debugging
    res.status(500).json({
      message: 'Internal Server Error',
      error: err.message // Send the error message to the client
    });
  }
};
