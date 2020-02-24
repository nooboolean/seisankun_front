import axios from 'axios'

const SeisankunApi = {
  install (Vue) {
    const seisankunApi = axios.create({
      baseURL: process.env.SEISANKUN_API_BASE_URL,
      timeout: 10000
    })
    seisankunApi.interceptors.request.use((config) => {
      config.headers.common = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
      return config
    })
    Vue.prototype.$seisankunApi = seisankunApi
  }
}

export default SeisankunApi
