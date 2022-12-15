const {Schema, model} = require('mongoose')

const schema = new Schema(
  {
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    roomId: {type: Schema.Types.ObjectId, ref: 'Rooms', required: true},
    startData: {type: Date, default: Date.now},
    endData: {type: Date, default: Date.now}
  },
  {
    timestamps: true
  }
)

module.exports = model('Booking', schema)
