const express = require('express')
const auth = require('../middleware/auth.middleware')
const Booking = require('../models/Booking')
const Rooms = require('../models/Rooms')
const router = express.Router({mergeParams: true})

const oneDay = 1000 * 60 * 60 * 24

const getDaysBetween = (start, end) => {
  const diffInTime = end.getTime() - start.getTime()

  return Math.ceil(diffInTime / oneDay)
}

router
  .route('/')
  .get(auth, async (req, res) => {
    try {
      const {orderBy, equalTo} = req.query
      const bookings = await Booking.find({[orderBy]: equalTo}).populate(
        'roomId'
      )
      res.send(bookings)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })

  .post(auth, async (req, res) => {
    try {
      const {roomId, arrivalDate, departureDate} = req.body
      const countDays = getDaysBetween(
        new Date(Number(arrivalDate)),
        new Date(Number(departureDate))
      )
      const [room] = await Rooms.find({_id: roomId})
      const totalPrice = Number(room.price) * countDays

      const newBooking = await Booking.create({
        ...req.body,
        totalPrice,
        userId: req.user._id
      })

      res.status(201).send(newBooking)
    } catch (e) {
      res.status(500).json({
        message: 'На сервере произошла ошибка. Попробуйте позже'
      })
    }
  })

router.route('/dates').get(auth, async (req, res) => {
  try {
    const {arrivalDate, roomId} = req.query
    const startDate = new Date(Number(arrivalDate))
    const params = roomId
      ? {
          $and: [
            {roomId: roomId},
            {
              arrivalDate: {
                $gte: startDate
              }
            }
          ]
        }
      : {
          arrivalDate: {
            $gte: startDate
          }
        }
    const list = await Booking.find(params).select({
      arrivalDate: 1,
      departureDate: 2,
      _id: 0
    })
    res.send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

router.delete('/:roomId', auth, async (req, res) => {
  try {
    const {roomId} = req.params
    const removedRoom = await Booking.findById(roomId)

    if (removedRoom.userId.toString() === req.user._id) {
      await removedRoom.remove()
      return res.send(null)
    } else {
      res.status(401).json({message: 'Unauthorized'})
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

module.exports = router
