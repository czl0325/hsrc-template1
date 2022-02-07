import { Toast } from "vant"
import { MyAxios } from "@/http/myAxios"
import { AxiosInstance } from "axios"
import { api_url, file_url } from "@/config"

interface BaseResponseData<T> {
  code: string | number;
  message: string;
  info: T;
  success: boolean
}

export interface FileResponseData {
  code: string;
  costTime: number;
  fileId: string;
  message: string;
  startTime: number;
  state: string;
  uploadedSize: number;
  url: string;
}

export interface PageModel<T> {
  totalRows: number;
  rows: T[]
}

export interface FileModel {
  content?: string;
  file?: File;
  message?: string;
  status?: string;

  url?: string;
  isImage?: boolean;
  pictureId?: string;
}

export class HttpService {
  myAxios: AxiosInstance

  constructor(url: string) {
    this.myAxios = new MyAxios(url).getInterceptors()
  }

  get<T>(url: string, params: Record<string, unknown> = {}) {
    return new Promise<T>((resolve, reject) => {
      this.myAxios.get(url, {
        params: params
      }).then((res: BaseResponseData<T> | T | any) => {
        if (Object.prototype.hasOwnProperty.call(res, 'success')) {
          if (res.success && res.code && res.code === 200) {
            resolve(res.info as T)
          } else {
            Toast.fail(res.message)
            reject(res)
          }
        } else {
          if (Object.prototype.hasOwnProperty.call(res, 'successful')) {
            if (res.successful) {
              resolve(res.successResponse as T)
            } else {
              Toast.fail('没有数据')
              reject(new Error('没有数据'))
            }
          } else {
            if (res) {
              resolve(res as T)
            } else {
              Toast.fail('没有数据')
              reject(new Error('没有数据'))
            }
          }
        }
      }).catch((err: { message: any }) => {
        Toast.fail(err.message)
        reject(err.message || "请求失败")
      })
    })
  }

  async getList<T>(url: string, params: any, refresh = true, state = { refreshing: true, loading: false, finished: true }) {
    if (refresh) {
      state.refreshing = true
    } else {
      state.loading = true
    }
    return new Promise<T[]>((resolve, reject) => {
      try {
        this.get<PageModel<T>>(url, params).then((result: PageModel<T>) => {
          if (result) {
            if (result.totalRows === 0) {
              result.rows = []
            }
            if (result.rows) {
              const list = result.rows
              if (list.length > 0) {
                if (refresh) {
                  state.refreshing = false
                } else {
                  state.loading = false
                }
                state.finished = ((params.pageNo * params.pageSize) >= result.totalRows)
              } else {
                state.refreshing = false
                state.loading = false
                state.finished = true
              }
              resolve(list)
            } else {
              state.refreshing = false
              state.loading = false
              state.finished = true
              return reject(new Error('数据缺失'))
            }
          } else {
            Toast.fail('请求失败')
            state.refreshing = false
            state.loading = false
            state.finished = true
            return reject(new Error('请求失败'))
          }
        }).catch(e => {
          state.refreshing = false
          state.loading = false
          state.finished = true
          reject(e)
        })
      } catch (e) {
        state.refreshing = false
        state.loading = false
        state.finished = true
        reject(e)
      }
    })
  }

  post<T>(url: string, params: Record<string, unknown>) {
    return new Promise<T>((resolve, reject) => {
      this.myAxios.post(url, params).then((res: BaseResponseData<T> | T | any) => {
        if (Object.prototype.hasOwnProperty.call(res, 'success')) {
          if (res.success && res.code && res.code === 200) {
            resolve(res.info as T)
          } else {
            Toast.fail(res.message)
            reject(res.message)
          }
        } else {
          if (typeof res === 'string') {
            Toast.fail(res)
            reject(res)
          } else if (typeof res === 'object' && !res.errorToken) {
            resolve(res as T)
          } else {
            Toast.fail('请求失败')
            reject(res)
          }
        }
      }).catch((err: { message: any; }) => {
        reject(err.message)
      })
    })
  }

  upload(url: string, file: File, params: Record<string, unknown> = {}) {
    const formData = new FormData()
    const configs = {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
    formData.append('file', file)
    Object.keys(params).forEach((key) => {
      // @ts-ignore
      formData.append(key, params[key])
    })
    return new Promise((resolve, reject) => {
      this.myAxios.post(url, formData, configs).then((res: FileResponseData | any) => {
        if (res.success) {
          resolve(res.info)
        } else {
          Toast.fail('上传文件失败')
          reject(new Error('上传文件失败'))
        }
      }).catch((err: { message: any; }) => {
        Toast.fail(err.message)
        reject(err.message)
      })
    })
  }
}

export const http1 = new HttpService(api_url)
export const http2 = new HttpService(file_url)
