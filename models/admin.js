const db = require('../dbconnection');

const Admin = {
  findByUsername: async (username) => {
    const query = 'SELECT * FROM tb_admin WHERE username = ?';
    const [results] = await db.query(query, [username]);
    return results[0];
  },

  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  }
};

module.exports = Admin;
