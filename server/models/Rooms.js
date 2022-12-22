const {Schema, model} = require('mongoose')

const schema = new Schema(
  {
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    image: [{type: String, required: true}],
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    // bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}],
    rating: Number,
    maxPeople: Number
  },
  {
    timestamps: true
  }
)

module.exports = model('Rooms', schema)
