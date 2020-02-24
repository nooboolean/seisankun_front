import axios from 'axios'

const SeisankunApi = {
  install (Vue) {
    const notRequiresAuthApi = axios.create({
      baseURL: process.env.SEISANKUN_API_BASE_URL,
      timeout: 10000
    })
    notRequiresAuthApi.interceptors.request.use((config) => {
      config.headers.common = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      return config
    })
    Vue.prototype.$notRequiresAuthApi = notRequiresAuthApi
  }
}

export default SeisankunApi
