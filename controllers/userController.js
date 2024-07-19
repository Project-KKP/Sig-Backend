const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const users = [
    { id: 1, username: 'admin', password: bcrypt.hashSync('adminpass', 8), role: 'admin' },
    { id: 2, username: 'user', password: bcrypt.hashSync('userpass', 8), role: 'user' }
];

exports.login = (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) return res.status(401).json({ msg: 'Invalid password' });

    const accessToken = jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });

    res.json({ accessToken });
};
