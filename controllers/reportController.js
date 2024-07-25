const db = require('../dbconnection')

exports.getReport = (req, res) => {
    const sql = 'SELECT * FROM tb_report';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err,
                url: req.url
            });
        }
        res.status(200).json({
            status: true,
            message: 'Success get report',
            data: results,
            url: req.url
        });
    });
};

exports.createReport = async (req, res) => {
    const { nama, email, telepon, lokasi, operator, keterangan, latitude, longitude } = req.body;
    
    // Check if all required fields are present
    if (!nama || !email || !telepon || !lokasi || !operator || !keterangan || !latitude || !longitude) {
        return res.status(400).json({
            msg: "Please fill all the fields"
        });
    }

    try {
        const query = "INSERT INTO tb_report (nama, email, telepon, lokasi, operator, keterangan, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        await db.promise().query(query, [nama, email, telepon, lokasi, operator, keterangan, latitude, longitude]);
        return res.status(201).json({ msg: "Report created successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
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
    const { nama, email, telepon, pesan} = req.body;
    
    // Check if all required fields are present
    if (!nama || !email || !telepon || !pesan ) {
        return res.status(400).json({
            msg: "Please fill all the fields"
        });
    }

    try {
        const query = "INSERT INTO tb_kritik (nama, email, telepon, pesan) VALUES (?, ?, ?, ?)";
        await db.promise().query(query, [nama, email, telepon, pesan]);
        return res.status(201).json({ msg: "Kritik dan Saran berhasil dibuat" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};

exports.getKritik = (req, res) => {
    const sql = 'SELECT * FROM tb_kritik';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error',
                error: err,
                url: req.url
            });
        }
        res.status(200).json({
            status: true,
            message: 'Success get kritik',
            data: results,
            url: req.url
        });
    });
};