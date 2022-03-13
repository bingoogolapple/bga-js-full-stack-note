import 'dotenv/config'
import http from 'http'
import querystring from 'querystring'

const { NODE_ENV, SERVER_PORT } = process.env

console.log('环境', NODE_ENV)

const server = http.createServer((req, res) => {
  const method = req.method
  const url = req.url!
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])

  const resData: any = {
    method,
    url,
    path,
    query
  }

  console.log('收到请求', req.headers['content-type'])

  // 设置返回格式为 JSON
  res.setHeader('content-type', 'application/json')

  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  } else if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log(postData)
      resData.postData = postData
      res.end(JSON.stringify(resData))
    })
  }
  console.log('resData', JSON.stringify(resData))
})
server.listen(SERVER_PORT, () => {
  console.log(
    `listening on ${SERVER_PORT} port, http://localhost:${SERVER_PORT}`
  )
})

// http://localhost:8000/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
