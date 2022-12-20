const moment = require('moment')
const Booking = require('../models/Booking')

const msInOneDay = 86_000_000

const filterRooms = async (items, filters) => {
  if (!items && items.length === 0) return
  let filteredItems = items
  filters.arrivalDate = +filters.arrivalDate || Date.now()
  filters.departureDate = +filters.departureDate || Date.now() + msInOneDay

  const bookings = await Booking.find()
  const bookedRoomsIds = bookings
    .filter(
      (booking) =>
        moment(filters.arrivalDate).isBetween(
          booking.arrivalDate,
          booking.departureDate
        ) ||
        moment(filters.departureDate).isBetween(
          booking.arrivalDate,
          booking.departureDate
        ) ||
        moment(booking.arrivalDate).isBetween(
          filters.arrivalDate,
          filters.departureDate
        )
    )
    .map((booking) => booking.roomId.toString())

  filteredItems = filteredItems.filter(
    (room) => !bookedRoomsIds.includes(room._id.toString())
  )

  return filteredItems
}

module.exports = {
  filterRooms
}
