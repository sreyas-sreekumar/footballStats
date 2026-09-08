const express = require('express');
const router = express.Router();
const bcrypt = require('bcyrpt.js');
const jwt = require('jsonwebtoken');
const pool = require('../db.js');

//sets up secret key used to sign and verify JSON web tokens (jwt) for authentication
const secret = process.env.JWT_SECRET;
if(!secret)
{
    throw new Error("FATAL ERROR : JWT_SECRET environment key is missing");
}
const JWT_SECRET = secret;

//sets up POST for /api/auth/register operation

router.post('/register' , async (req,res) =>
{
    try{
        const {username,password} = req.body;

        if(!username || !password)
        {
            return res.status(400).json({error : "Username and password are both required"});
        }

        //see if user already exists before registering
        const check = await pool.query('SELECT * FROM users WHERE username = $1',[username]);
        if(check.rows.length > 0)
        {
            return res.status(400).json({error: `User with username ${username} already exists`});

        }


        //hash password with bcrypt of 10 saltrounds
        const saltRound = 10;
        const hash = bcrypt.hash(password,saltRound);

        //now to insert new users into database

        const userNew = await pool.query('INSERT INTO users (username,passwordHash)VALUES ($1, $2) RETURNING id,username,role,created_at', [username,hash]);

        return res.status(201).json(userNew.rows[0]);
    }
    catch(err)
    {
        console.err(error);
        return res.status(500).json({error : "Internal Server Error"});
    }
        
});

//now for the login POST /API/AUTH/login

router.post('/login' ,async (req,res) =>
{
    try{
        const {username,password} = req.body;

        if(!username ||!password)
        {
            return res.status(400).json({error : "Enter complete credentials"});
        }

        //check user on postgresql

        const check = await pool.query("SELECT * FROM users WHERE username = $1",[username]);
        if(check.rows.length == 0)
        {
            return res.status(401).json("Invalid credentials or user does not exist");
        }
        //store the user
        const user = check.rows[0];

        const checkPassword = await bcrypt.compare(password,user.password_hash);
        if(!checkPassword)
        {
            return res.status(400).json({error: "Password is incorrect"});

        }

        //generates the jwt -> sign consturcts and signs token
        //payload objects are the data embedded inside token == id,username and role - no sensitive data
        //JWT_SECRET secret stromg which ensures users cant tamper with above payload to change roles etc
        //token = ouput =. 3 part string joined by dots -> header.payload.signature
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            JWT_SECRET,
            {
                expiresIn:'24h'
            }
        );

        //sends the finl HTTTP response after a succesfull authentication
        return res.json(
            {
                message:'login succussfull',
                token,
                user:
                {
                    id:user.id,
                    username : user.username,
                    role: user.role
                }
            }
        );





    }
    catch(err){
        console.error(err)
        return res.status(500).json({error:"Internal Server Error"});

    }
});

module.exports = router;