const express = require('express')
const Rooms = require('../models/Rooms')
const auth = require('../middleware/auth.middleware')
const {generateRoomData} = require('../utils/helper')
const router = express.Router({mergeParams: true})
const User = require('../models/User')
const Booking = require('../models/Booking')

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
  const {limit, page, adult, children, rate, start, end} = req.query

  try {
    const rooms = await Rooms.aggregate([
      {
        $lookup: {
          from: Booking.collection.name,
          localField: '_id',
          foreignField: 'roomId',
          as: 'booking'
        }
      },
      {
        $match: {
          maxPeople: {
            $gte: Number(adult) + Number(children)
          },
          booking: {
            $not: {
              $elemMatch: {
                $or: [
                  {
                    $and: [
                      {
                        arrivalDate: {
                          $gte: new Date(Number(start))
                        }
                      },
                      {
                        arrivalDate: {
                          $lte: new Date(Number(end))
                        }
                      }
                    ]
                  },
                  {
                    $and: [
                      {
                        departureDate: {
                          $gte: new Date(Number(start))
                        }
                      },
                      {
                        departureDate: {
                          $lte: new Date(Number(end))
                        }
                      }
                    ]
                  }
                ]
              }
            }
          }
        }
      },
      {$sort: {rating: rate === 'asc' ? 1 : -1}},
      {
        $facet: {
          metadata: [{$count: 'total'}],
          rooms: [{$skip: (page - 1) * limit}, {$limit: limit * 1}]
        }
      },
      {
        $project: {
          rooms: 1,
          count: {$arrayElemAt: ['$metadata.total', 0]}
        }
      }
    ])

    res.send(rooms)
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
  const {roomId} = req.params
  try {
    const user = await User.findById(req.user._id)
    if (user.isAdmin) {
      await Rooms.findByIdAndRemove(roomId)
      return res.status(200).send(null)
    }
  } catch (e) {
    res.status(500).json({
      message: 'На сервере произошла ошибка. Попробуйте позже'
    })
  }
})

module.exports = router
