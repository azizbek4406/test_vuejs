const { Router } = require('express')
const pool = require('../config/db')
const router = Router()

router.get('/', async (req, res) => {
    try {
    const jobs = await pool.query("SELECT * FROM test")

    res.status(200).json(jobs.rows)
    } catch (e) {
        res.status(500).json(e)
    }
})



module.exports = router