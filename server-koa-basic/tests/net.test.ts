import supertest from 'supertest'
import { Server } from 'http'
import run from '../src/app'

describe('http', () => {
  let server: Server
  beforeAll(done => {
    server = run(done)
  })
  afterAll(done => {
    // server.close(err => {
    //   done(err)
    // })
    server.close(done)
  })
  it('get /admin 1', async () => {
    const resp = await supertest(server).get('/').expect(200)
    console.log('响应数据为', resp.body)
    expect(resp.body).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8])
  })
  it('get /admin 2', () => {
    return supertest(server)
      .get('/')
      .expect(200)
      .then(resp => {
        console.log('响应数据为', resp.body)
        expect(resp.body).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8])
        // throw new Error('111')
      })
  })
})
