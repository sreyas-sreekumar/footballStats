const express = require('express');
const router = express.Router();
const pool = require('../db.js');


router.get('/', async(req,res) =>
{
    try{

        const result = await pool.query('SELECT * FROM user_favs ORDER BY created_at DESC');
        return res.json(result.rows);

    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({error : 'Internal Server Error'});

    }
});

router.post('/' ,async (req,res) => 
{
    try{
        console.log('Incoming Request Body:', req.body); // <-- ADD THIS LOG
        if (!req.body) 
        {
        return res.status(400).json({ error: 'Request body is missing' });
        }
        const {user_id,entity_type,entity_id} = req.body;
        if (!user_id || !entity_type || !entity_id)
        {
            return res.status(400).json({error : 'user_id,entity_id,entity_type all required'});
        }

        const result = await pool.query('INSERT INTO user_favs (user_id,entity_type,entity_id) VALUES ($1,$2,$3)', [user_id,entity_type,entity_id]);

        return res.status(201).json(result.rows[0]);
    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});

    }
});

module.exports = router;
