import Axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'

const instance = Axios.create({
    baseURL: 'http://apidiary.huabingtao.com/',
    timeout: 5000
})

instance.interceptors.request.use(
    config => {
        if (config.method === 'GET') {
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
        let res = JSON.parse(JSON.stringify(error))
        if (res.message === 'Network Error') {
            Toast.fail("服务器异常请稍后再试", 2)
            return Promise.reject()
        }
        let data = error.response.data
        Toast.fail(data.message ? data.message : data, 2)
        return Promise.reject(error)
    }
)

export default instance