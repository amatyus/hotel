const express = require('express')
const Rooms = require('../models/Rooms')
const auth = require('../middleware/auth.middleware')
// const path = require('path')
// const multer = require('multer')
const router = express.Router({mergeParams: true})
const User = require('../models/User')
const Booking = require('../models/Booking')
const mongoose = require('mongoose')
const {generateRoomData} = require('../utils/helper')

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
  const {limit, page, adults, children, rate, start, end, category} = req.query
  try {
    const rooms = await Rooms.aggregate([
      {
        $lookup: {
          from: Booking.collection.name,
          localField: 'roomId',
          foreignField: '_id',
          as: 'booking'
        }
      },
      {
        $match: {
          maxPeople: {
            $gte: Number(adults) + Number(children)
          },
          ...(category && {category: {$eq: mongoose.Types.ObjectId(category)}}),
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

router.get('/:roomId', async (req, res) => {
  const {roomId} = req.params
  try {
    const room = await Rooms.findById(roomId)
    res.send(room)
  } catch (error) {
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

/////////////

// const storege = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'img')
//   },
//   filename: (req, file, cb) => {
//     console.log(file)
//     cb(null, Date.now() + path.extname(file.originalname))
//   }
// })

// const upload = multer({storage: storege})

// router.get('/upload', (req, res) => {
//   res.send(' Upload')
// })

// router.post('/upload', upload.single('image'), (req, res) => {
//   res.send('Image Upload')
// })

module.exports = router
