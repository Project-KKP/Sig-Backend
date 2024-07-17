const bcrypt = require('bcrypt');
const saltRounds = 10;
const gensalt = bcrypt.genSaltSync(saltRounds); 
const jwt = require('jsonwebtoken'); 
const db = require('../dbconnection');


exports.loginUser = async (req,res) =>{
    const {username,password} = req.body;

    const cekUsername = "SELECT * FROM tb_admin WHERE username=?";
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

exports.profile = async (req, res) => {
    return res.status(200).json({
      user:req.user
    });
  }


exports.editUser = async (req,res) =>{
  try {
    const {username} = req.body;
  if(!username){
      return res.status(400).json({
        msg:"Please fill all the fields"
      });
  }
  const query = "UPDATE tb_admin SET username=? WHERE email=?";
  db.query(query,[username],(err,result) =>{
      if(err) throw err;
      return res.status(201).json({msg:"User updated successfully"});
  })
  } catch (error) {
    console.log(error.massages);
  }
}