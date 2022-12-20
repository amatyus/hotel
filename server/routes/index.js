const express = require('express')
const router = express.Router({mergeParams: true})

router.use('/auth', require('./auth.routes'))
router.use('/category', require('./category.routes'))
router.use('/rooms', require('./room.routes'))
router.use('/user', require('./user.routes'))
router.use('/booking', require('./booking.routes'))

module.exports = router
