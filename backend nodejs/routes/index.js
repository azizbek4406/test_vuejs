const { Router } = require('express')
const router = Router()

router.use('/users', require('./test'))

module.exports = router