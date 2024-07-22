const db = require('../dbconnection');

exports.updateBlank = async (req, res) => {
    const { lokasi, operator,  latitude, longitude, id } = req.body;

    if (!lokasi || !operator || !latitude || !longitude || !id) {
        return res.status(400).json({
            msg: "Please fill all the fields"
        });
    }

    try {
        // Check if the record exists
        const [existingRecord] = await db.promise().query("SELECT * FROM tb_blank WHERE id = ?", [id]);

        if (existingRecord.length === 0) {
            return res.status(404).json({
                msg: "Record not found"
            });
        }

        // Update the record
        const query = `
            UPDATE tb_blank 
            SET lokasi = ?,  operator = ?, latitude = ?, longitude = ? 
            WHERE id = ?
        `;
        await db.promise().query(query, [lokasi, operator, latitude, longitude, id]);

        return res.status(200).json({ msg: "Location updated successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};
