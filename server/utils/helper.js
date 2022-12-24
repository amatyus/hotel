function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function generateRoomData() {
  return {
    rating: getRandomInt(3, 5)
    // image: ['cootege.jpg']
  }
}

module.exports = {
  generateRoomData
}
