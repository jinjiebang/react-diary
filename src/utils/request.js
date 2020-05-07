import Axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'

const instance = Axios.create({
    baseURL: 'http://118.190.211.6:3001/',
    timeout: 5000
})

instance.interceptors.request.use(
    config => {
        if (config.method === 'get') {
            config.paramsSerializer = params => {
                return qs.stringify(params, { arrayFormat: 'brackets' })
            }
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    response => {
        return response
    },
    error => {
        if (error.message === 'Network Error') {
            Toast.fail("服务器异常请稍后再试", 2)
            return Promise.reject()
        }
        if (error.response) {
            let data = error.response.data
            Toast.fail(data.message ? data.message : data, 2)
        } else {
            Toast.fail(error.message, 2)
        }
        return Promise.reject(error)
    }
)

export default instance