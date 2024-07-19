const bcrypt = require('bcrypt');
const saltRounds = 10;
const gensalt = bcrypt.genSaltSync(saltRounds); 
const jwt = require('jsonwebtoken'); 
const db = require('../dbconnection');


exports.loginUser = async (req,res) =>{
    const {username,password,role} = req.body;

    const cekUsername = "SELECT * FROM tb_user WHERE username=?";
    db.query(cekUsername,[username],(err,result) =>{
      if(err) throw err;
      if(result.length === 0){
        return res.status(400).json({
          msg:"Username not found"});
      }
      const cekPassword = bcrypt.compareSync(password,result[0].password);
      if(!cekPassword){
        return res.status(400).json({
          msg:"Password not match"});
      }
      const token = jwt.sign({
        id: result[0].id, 
        username: result[0].username},'secret', { expiresIn: '1d' });

      return res.status(200).json({
        msg:"Login success",
        token
        
      });
    })
}


exports.editUser = async (req, res) => {
  try {
    const { id, username, password } = req.body;

    if (!id || !username || !password) {
      return res.status(400).json({
        msg: "Please fill all the fields"
      });
    }
    const hashedPassword = await bcrypt.hash(password, 8);

    const query = `UPDATE tb_user SET username = ?, password = ? WHERE id = ?`;
    db.query(query, [username, hashedPassword, id], (err, result) => {
      if (err) throw err;
      return res.status(200).json({ msg: "User updated successfully" });
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};