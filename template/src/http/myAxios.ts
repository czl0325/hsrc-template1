import axios, { AxiosInstance } from 'axios'
import { Toast } from "vant"
import { sign } from "@/http/sign"
import dayjs from "dayjs"
import qs from 'qs'
import { regionCd } from '@/config'

export class MyAxios {
  instance: AxiosInstance

  constructor(url: string) {
    this.instance = axios.create({
      baseURL: url || '',
      timeout: 10000
    })
    this.init()
  }

  getInterceptors() {
    return this.instance
  }

  // 初始化拦截器
  init() {
    // 请求接口拦截器
    this.instance.interceptors.request.use(
      config => {
        if (!/^\/upload.*$/.test(config.url as string)) {
          const _appKey = '000001'
          const params = config.method === 'post' ? config.data : config.params
          if (!params.userId && sessionStorage.getItem('userId')) {
            params.userId = sessionStorage.getItem('userId') ?? ''
          }
          if (!params.regionCd) {
            params.regionCd = regionCd
          }
          const p = {
            _appKey,
            responseFormat: 'json',
            ...params,
            _timestamp: dayjs(new Date()).format('YYYYMMDDHHmmss')
          }
          if (config.method === 'post') {
            config.data = qs.stringify({ ...p, _sign: sign(p) })
          } else {
            config.params = { ...p, _sign: sign(p) }
          }
        }
        return config
      },
      err => {
        console.error(err)
      }
    )

    // 响应拦截器
    this.instance.interceptors.response.use(
      response => {
        if (response.status === 200) {
          Toast.clear()
          return Promise.resolve(response.data)
        } else {
          // Toast.fail(`错误：${response.status}`);
          return Promise.reject(response)
        }
      },
      err => {
        const { response } = err
        if (response) {
          Toast.fail(`错误：${response.status}`)
          return Promise.reject(err)
        } else {
          Toast.fail('网络连接异常,请稍后再试!')
        }
      })
  }
}
