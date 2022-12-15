const express = require('express')
const Rooms = require('../models/Rooms')
const auth = require('../middleware/auth.middleware')
const {generateRoomData} = require('../utils/helper')
const router = express.Router({mergeParams: true})
const User = require('../models/User')

router.patch('/:roomId', auth, async (req, res) => {
  try {
    const {roomId} = req.params
    const user = await User.findById(req.user._id)
    if (user.isAdmin) {
      const updatedRoom = await Rooms.findByIdAndUpdate(roomId, req.body, {
        new: true
      })
      res.send(updatedRoom)
    } else {
      res.status(401).json({message: 'User is not admin'})
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

router.get('/', async (req, res) => {
  try {
    const list = await Rooms.find()
    res.send(list)
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)

    if (user.isAdmin) {
      const newRoom = await Rooms.create({
        ...generateRoomData(),
        ...req.body
      })
      console.log(newRoom)
      return res.status(200).send(newRoom)
    } else {
      res.status(401).json({message: 'User is not admin'})
    }
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
