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


