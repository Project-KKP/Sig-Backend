const db = require('../dbconnection');

exports.createBlank = async (req, res) => {
    const { lokasi, operator, latitude, longitude } = req.body;
    if (!lokasi || !operator || !latitude || !longitude) {
        return res.status(400).json({
            msg: "Please fill all the fields"
        });
    }

    try {
        // Check if a record with the same combination of lokasi, ketinggian, operator, latitude, and longitude already exists
        const [existingRecords] = await db.promise().query(
            "SELECT * FROM tb_blank WHERE lokasi = ? AND operator = ? AND latitude = ? AND longitude = ?",
            [lokasi, operator, latitude, longitude]
        );

        if (existingRecords.length > 0) {
            return res.status(400).json({
                msg: "A record with the provided combination of fields already exists"
            });
        }

        // Insert the new record
        const query = "INSERT INTO tb_blank (lokasi, operator, latitude, longitude) VALUES (?, ?, ?, ?)";
        await db.promise().query(query, [lokasi, operator, latitude, longitude]);

        return res.status(201).json({ msg: "Location created successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};
