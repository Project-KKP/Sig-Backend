const db = require('../dbconnection');

exports.createLocation = async (req, res) => {
    const { lokasi, ketinggian, operator, status, tipe, latitude, longitude } = req.body;
    if (!lokasi || !ketinggian || !operator || !status || !tipe || !latitude || !longitude) {
        return res.status(400).json({
            msg: "Please fill all the fields"
        });
    }

    try {
        // Check if a record with the same combination of lokasi, ketinggian, operator, latitude, and longitude already exists
        const [existingRecords] = await db.promise().query(
            "SELECT * FROM tb_menara WHERE lokasi = ? AND ketinggian = ? AND operator = ? AND latitude = ? AND longitude = ?",
            [lokasi, ketinggian, operator, latitude, longitude]
        );

        if (existingRecords.length > 0) {
            return res.status(400).json({
                msg: "A record with the provided combination of fields already exists"
            });
        }

        // Insert the new record
        const query = "INSERT INTO tb_menara (lokasi, ketinggian, operator, status, tipe, latitude, longitude) VALUES (?, ?, ?, ?, ?, ?, ?)";
        await db.promise().query(query, [lokasi, ketinggian, operator, status, tipe, latitude, longitude]);

        return res.status(201).json({ msg: "Location created successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};
