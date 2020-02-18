import axios from 'axios'

const Http = {
  install (Vue) {
    console.log(process.env.SEISANKUN_API_BASE_URL)
    const requiresAuthApi = axios.create({
      baseURL: process.env.SEISANKUN_API_BASE_URL,
      timeout: 10000
    })
    requiresAuthApi.interceptors.request.use((config) => {
      config.headers.common = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        // 'Token': 'Token'
      }
      return config
    })
    requiresAuthApi.interceptors.response.use((response) => {
      // eslint-disable-next-line no-undef
      response.data = normalize(res.data, article)
      // eslint-disable-next-line no-undef
      return res
    })

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
    // notRequiresAuthApi.interceptors.response.use((response) => {
    //   // eslint-disable-next-line no-undef
    //   response.data = normalize(res.data, article)
    //   // eslint-disable-next-line no-undef
    //   return res
    // })
    Vue.prototype.$requiresAuthApi = requiresAuthApi
    Vue.prototype.$notRequiresAuthApi = notRequiresAuthApi
  }
}

export default Http
