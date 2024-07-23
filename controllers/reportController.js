const { uploadImage } = require('../middleware/firebasehelper.js');
const { db } = require('../dbconnection.js');

const saveReport = async (req, res) => {
  const { nama, email, telepon, lokasi, operator, keterangan } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  try {
    const imageUrl = await uploadImage(file);

    const [result] = await db.execute(
      'INSERT INTO reports (nama, email, telepon, lokasi, operator, keterangan, imageUrl) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nama, email, telepon, lokasi, operator, keterangan, imageUrl]
    );

    res.status(201).json({ id: result.insertId, message: 'Report saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save report' });
  }
};

module.exports = { saveReport };
