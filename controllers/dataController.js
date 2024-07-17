const db = require('../dbconnection');

exports.getData = async (req, res, next) => {
  const query = "SELECT lokasi, ketinggian, operator, status, tipe, latitude, `longtitude` FROM tb_sig";
  try {
    const [results] = await db.query(query);
    res.json(results);
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
      error: err
    });
  }
};
