import httpService from './http.service'

const categoryEndpoint = 'category/'

const caregoryService = {
  get: async () => {
    const {data} = await httpService.get(categoryEndpoint)
    return data
  }
}
export default caregoryService
