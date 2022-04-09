import supertest from 'supertest'
import { Server } from 'http'
import run from '../src/app'

describe('http', () => {
  let server: Server
  beforeAll(done => {
    server = run(done)
  })
  afterAll(done => {
    server.close(done)
  })
  it('get /admin 1', async () => {
    const resp = await supertest(server).get('/admin').expect(200)
    console.log('响应数据为', resp.body)
    expect(resp.body).toStrictEqual([1, 2, 3, 4])
  })
  it('get /admin 2', () => {
    return supertest(server)
      .get('/admin')
      .expect(200)
      .then(resp => {
        console.log('响应数据为', resp.body)
        expect(resp.body).toStrictEqual([1, 2, 3, 4])
        // throw new Error('111')
      })
  })
})
