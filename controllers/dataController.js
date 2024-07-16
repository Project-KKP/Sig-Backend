const db = require('../dbconnection');

exports.getData = async (req, res, next) => {
  const query = "SELECT lat, `long`, jalan, kelurahan, kecamatan, kotkab, prov, kdpos FROM tb_sig";
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
