import supertest from 'supertest'
import { Server } from 'http'
import { BaseApp } from '../src/decorator'

describe('http', () => {
  let server: Server
  beforeAll(done => {
    server = new BaseApp().start(done)
  })
  afterAll(done => {
    server.close(done)
  })
  it('get /jest 1', async () => {
    const resp = await supertest(server).get('/admin').expect(200)
    console.log('响应数据为', resp.body)
    expect(resp.body).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })
  it('get /jest 2', () => {
    return supertest(server)
      .get('/jest')
      .expect(200)
      .then(resp => {
        console.log('响应数据为', resp.body)
        expect(resp.body).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8])
        // throw new Error('111')
      })
  })
})
