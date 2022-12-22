const {Schema, model, SchemaTypes} = require('mongoose')

const schema = new Schema({
  adults: Number,
  children: Number,
  arrivalDate: Date,
  departureDate: Date,
  roomId: {type: SchemaTypes.ObjectId, ref: 'Rooms'},
  userId: {type: SchemaTypes.ObjectId, ref: 'User'},
  totalPrice: Number
})

module.exports = model('Booking', schema)
