const { findBy } = require("../users/users-model")

const checkUsernameExists = async (req, res, next) => {
    try{
        const [user] = await findBy({username: req.body.username})
        if(!user){
            next({status: 401,
            message: "Invalid credentials"})
        } else {
            req.user = user
            next()
        }
    }
    catch(err){
        next(err)
    }
}

const checkIfString = (req, res, next)=> {
    if(typeof req.body.username === "string"){
        next()
    } else {
        res.status(422).json({message: "username must be a string"})
    }
}

const checkRegistration = (req, res, next) => {
    if(!req.body.username || !req.body.password || !req.body.role){
        res.status(422).json({message: "username, role, and password required"})
    } else {
        next()
    }
}

const validateRoleName = (req, res, next) => {
    if(req.body.role === "reader" || req.body.role.trim() === "reader"){
        next()
    } else if (req.body.role === "admin" || req.body.role.trim() === "admin"){
        next()
    } else if (req.body.role.trim().length > 32){
        next({status: 422, 
        message: "Role name cannot be longer than 32 characters"})
    } else {
        next({status: 422, message: "Must be a reader or admin"})
    }
}

module.exports = {
    checkUsernameExists, checkRegistration, checkIfString, validateRoleName
}