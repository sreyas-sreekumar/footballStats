const express = require('express');
const router = express.Router();
const pool = require('../db.js');


router.get('/search' ,async (req,res) =>
{
    try{
        const {name} = req.query;

        if(!name)
        {
            return res.status(400).json({error: 'Query param "name" is required'});
        }
        //uses wilcard to search for name
        const result = await pool.query('SELECT * FROM players WHERE name ILIKE $1',[`%${name}%`]);

        if (result.rows.length==0)
        {
            return res.status(404).json({error : `Could not find player '%${name}'`});
        }

        return res.json(result.rows);


    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({error: 'Internal Server Error'});
    }

});

//for the actual GET /api/players/:id

router.get('/:id',async (req,res) => {
    try{
        const {id} = req.params;
        //Queries PostgreSQL safely whilst parameterising it
        const result = await pool.query('SELECT * FROM players WHERE id = $1',[id]);

        if (result.rows.length == 0)
        {
            return res.status(404).json({ error : 'Player is not found'});
        }

        //Now to return the player object found

        return res.json(result.rows[0]);

    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({error : 'Internal Server ERROR'});
    }
});


//Exports playerRouter for app.js
module.exports = router;
