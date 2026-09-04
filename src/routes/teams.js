const express = require('express');
const router = express.Router();
const pool = require('../db.js');


//for the actual GET /api/teams/:id

router.get('/:id',async (req,res) => 
{
    try{
        //destructures id out of the URL into its own id variable
        const {id} = req.params;
        const result = await pool.query('SELECT * FROM teams WHERE id = $1', [id]);

        if (result.rows.length == 0)
        {
            return res.status(404).json({error : 'Team is not found'});

        }

        return res.json(result.rows[0]);

    }
    catch(err)
    {
        console.error(err);
        return res.status(500).json({error: 'Internal Server ERROR'});
    }
});

module.exports = router;