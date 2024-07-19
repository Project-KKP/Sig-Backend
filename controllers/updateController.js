const db = require('../dbconnection');

exports.updateLocation = async (req, res) => {
    const { lokasi, ketinggian, operator, status, tipe, latitude, longitude, id } = req.body;

    if (!lokasi || !ketinggian || !operator || !status || !tipe || !latitude || !longitude || !id) {
        return res.status(400).json({
            msg: "Please fill all the fields"
        });
    }

    try {
        // Check if the record exists
        const [existingRecord] = await db.promise().query("SELECT * FROM tb_menara WHERE id = ?", [id]);

        if (existingRecord.length === 0) {
            return res.status(404).json({
                msg: "Record not found"
            });
        }

        // Update the record
        const query = `
            UPDATE tb_menara 
            SET lokasi = ?, ketinggian = ?, operator = ?, status = ?, tipe = ?, latitude = ?, longitude = ? 
            WHERE id = ?
        `;
        await db.promise().query(query, [lokasi, ketinggian, operator, status, tipe, latitude, longitude, id]);

        return res.status(200).json({ msg: "Location updated successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};
