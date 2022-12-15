const express = require('express')
const auth = require('../middleware/auth.middleware')
const Booking = require('../models/Booking')
const router = express.Router({mergeParams: true})

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const {orderBy, equalTo} = req.query
      const list = await Booking.find({[orderBy]: equalTo})
      res.send(list)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })

  .post(auth, async (req, res) => {
    try {
      const newBooking = await Booking.create({
        ...req.body,
        userId: req.user._id
      })
      res.status(201).send(newBooking)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })

// router.delete('/:roomId', auth, async (req, res) => {
//   try {
//     const {roomId} = req.params
//     const removedRoom = await Booking.findById(roomId)

//     if (removedRoom.userId.toString() === req.user._id) {
//       await removedRoom.remove()
//       return res.send(null)
//     } else {
//       res.status(401).json({message: 'Unauthorized'})
//     }
//   } catch (e) {
//     res.status(500).json({
//       message: 'На сервере произошла ошибка. Попробуйте позже'
//     })
//   }
// })

module.exports = router
