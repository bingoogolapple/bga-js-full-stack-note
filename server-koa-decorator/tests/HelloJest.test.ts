import { accessLogger } from '../src/utils/logger'

// 最外层的 describe 是可选的
describe('HelloJest', () => {
  it('sum', () => {
    const a = 1
    const b = 2
    expect(a + b).toEqual(3)
  })
  it('logger', () => {
    accessLogger.info('测试 info 日志')
  })
})
