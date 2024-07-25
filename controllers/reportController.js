const db = require('../dbconnection');
require('dotenv').config();

exports.getReport = (req, res) => {
  const sql = 'SELECT * FROM tb_report';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: err,
        url: req.url,
      });
    }
    res.status(200).json({
      status: true,
      message: 'Success get report',
      data: results,
      url: req.url,
    });
  });
};

exports.createReport = async (req, res) => {
  const { nama, email, telepon, lokasi, latitude, longitude, operator, keterangan, imgurl, captcha } = req.body;

  if (!nama || !email || !telepon || !lokasi || !latitude || !longitude || !operator || !keterangan || !imgurl || !captcha) {
    return res.status(400).json({
      msg: 'Please fill all the fields and complete the CAPTCHA',
    });
  }

  const secretKey = process.env.SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

  try {
    const captchaResponse = await fetch(verificationURL, { method: 'POST' });
    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res.status(400).json({
        msg: 'CAPTCHA validation failed',
      });
    }

    // CAPTCHA valid, insert data to database
    const query = 'INSERT INTO tb_report (nama, email, telepon, lokasi, latitude, longitude, operator, keterangan, imgurl) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await db.promise().query(query, [nama, email, telepon, lokasi, latitude, longitude, operator, keterangan, imgurl]);
    return res.status(201).json({ msg: 'Report created successfully' });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.getReportLength = (req, res) => {
  db.execute('SELECT COUNT(*) as count FROM tb_report', (error, results, fields) => {
    if (error) {
      console.error('Error fetching report count:', error);
      return res.status(500).json({ message: 'Error fetching report count' });
    }

    // Log the results to see the structure
    console.log('Database query results:', results);

    if (results && results.length > 0) {
      const count = results[0].count;
      console.log('Count:', count);
      return res.status(200).json({ count });
    } else {
      return res.status(404).json({ message: 'No data found' });
    }
  });
};

exports.createKritik = async (req, res) => {
  const { nama, email, telepon, pesan, captcha } = req.body;

  // Check if all required fields are present
  if (!nama || !email || !telepon || !pesan || !captcha) {
    return res.status(400).json({
      msg: 'Please fill all the fields and complete the CAPTCHA',
    });
  }

  const secretKey = process.env.SECRET_KEY;
  const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captcha}`;

  try {
    const captchaResponse = await fetch(verificationURL, { method: 'POST' });
    const captchaData = await captchaResponse.json();

    if (!captchaData.success) {
      return res.status(400).json({
        msg: 'CAPTCHA validation failed',
      });
    }

    const query = 'INSERT INTO tb_kritik (nama, email, telepon, pesan) VALUES (?, ?, ?, ?)';
    await db.promise().query(query, [nama, email, telepon, pesan]);
    return res.status(201).json({ msg: 'Kritik dan Saran berhasil dibuat' });
  } catch (err) {
    return res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

exports.getKritik = (req, res) => {
  const sql = 'SELECT * FROM tb_kritik';
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: 'Internal Server Error',
        error: err,
        url: req.url,
      });
    }
    res.status(200).json({
      status: true,
      message: 'Success get kritik',
      data: results,
      url: req.url,
    });
  });
};
