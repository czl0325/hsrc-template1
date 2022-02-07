// @ts-ignore
import { MessageDigest } from './sha1'

const _appSecret = 'SEPU!PWO@LVE&045#67$'

export const sign = (params: Record<string, unknown>) => {
  let source = Object.keys(params).sort().reduce((origin: string, item: string) => {
    return origin + (item + params[item])
  }, _appSecret)
  source += _appSecret
  return MessageDigest.digest(source)
}
