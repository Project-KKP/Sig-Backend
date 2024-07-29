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


exports.getBlank = async (req, res, next) => {
    const query = "SELECT lokasi, operator, latitude, `longitude` FROM tb_blank";
    try {
      const [results] = await db.promise().query(query);
      res.json(results);
    } catch (err) {
      console.error(err); // Log the error to the console for debugging
      res.status(500).json({
        message: 'Internal Server Error',
        error: err.message // Send the error message to the client
      });
    }
  };
  

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

