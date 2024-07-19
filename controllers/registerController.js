const bcrypt = require('bcrypt');
const saltRounds = 10;
const db = require('../dbconnection');

exports.registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            msg: "Please fill all the fields"
        });
    }

    try {
        const [existingUser] = await db.promise().query("SELECT * FROM tb_user WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({
                msg: "Username already exists"
            });
        }

        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        await db.promise().query("INSERT INTO tb_user (username, password, role) VALUES (?, ?, ?)", [username, hashedPassword, 'user']);

        return res.status(201).json({ msg: "User registered successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};
