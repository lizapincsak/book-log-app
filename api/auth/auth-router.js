const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../users/users-model")
const { JWT_SECRET } = require("../secrets/index")
const jwt = require("jsonwebtoken")
const { checkUsernameExists, 
  validateRoleName, 
  checkIfString } = require("./auth-middleware")


router.post("/register", validateRoleName, checkIfString, (req, res, next) => {
  const {username, role, password} = req.body;
  const hash = bcrypt.hashSync(password, 8);

  User.add({username, role, password: hash})
    .then((user) => {
      res.status(201).json(user)
    })
    .catch(next)
}) 

router.post("/login", checkUsernameExists, (req, res, next) => {
    const {password, username} = req.body

    if(req.body){
      User.findBy({username: username.toLowerCase()})
        .then(([user]) => {
          if(user && bcrypt.compareSync(password, user.password)){
            const token = buildToken(user)
            res.status(200).json({message: `${username} is back!`, token, role: user.role})
          } else {
            res.status(401).json({message: "Invalid credentials"})
          }
        })
        .catch((error) => {
          res.status(500).json({message: error.message})
        })
    } else {
      res.status(400).json({message: "please provide username and password and the password should be alphanumeric"})
    }
}) 

router.delete("/logout", (req, res, next) => {
    if(req.session){
      req.session.destroy((err) => {
        if(err){
          res.status(400).send("You can never leave")
        } else {
          res.status(200).send("you made it out!")
        }
      })
    } else {
      res.end()
    }
}) 

function buildToken(user) {
    const payload = {
      subject: user.user_id,
      username: user.username,
      role: user.role,
    };
    const options = {
      expiresIn: "1d",
    };
    return jwt.sign(payload, JWT_SECRET, options);
  }

module.exports = router;