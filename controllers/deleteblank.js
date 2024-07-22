const db = require('../dbconnection');

exports.deleteBlank = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({
            msg: "Please provide the id"
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

        // Delete the record
        await db.promise().query("DELETE FROM tb_blank WHERE id = ?", [id]);

        return res.status(200).json({ msg: "Location deleted successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};

