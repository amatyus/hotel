import httpService from './http.service'

const bookingEndPoint = 'booking/'

const bookingService = {
  create: async (payload) => {
    const {data} = await httpService.post(bookingEndPoint, payload)
    return data
  },
  disabledDates: async (params) => {
    const {data} = await httpService.get(`${bookingEndPoint}dates`, {params})
    return data
  },
  get: async (userId) => {
    const {data} = await httpService.get(bookingEndPoint, {
      params: {
        orderBy: 'userId',
        equalTo: `${userId}`
      }
    })
    return data
  },
  fetchAll: async () => {
    const {data} = await httpService.get(bookingEndPoint)
    return data
  },
  remove: async (bookingId) => {
    const {data} = await httpService.delete(bookingEndPoint + bookingId)
    return data
  }
}
export default bookingService
