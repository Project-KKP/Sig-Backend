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



