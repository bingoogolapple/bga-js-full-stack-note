import express, { Request, Response } from "express"
import url from "url"
const app = express()

app.get("/hello", (req: Request, res: Response) => {
    console.log(`req.url ${req.url}`)
    console.log(`req.baseUrl ${req.baseUrl}`)
    console.log(`req.query object ${req.query}`)
    console.log(`req.query jsonstring ${JSON.stringify(req.query)}`)
    console.log(`req.params object ${req.params}`)
    console.log(`req.params jsonstring ${JSON.stringify(req.params)}`)
    console.log(`req.hostname ${req.hostname}`)
    console.log(`req.ip ${req.ip}`)
    console.log(`req.body ${JSON.stringify(req.body)}`)
    console.log(`req.headers ${req.headers}`)
    console.log(`req.rawHeaders ${req.rawHeaders}`)
    let username: any = url.parse(req.url, true).query.username
    res.send(`Hello ${username}`)
})
app.get("/world", (req: Request, res: Response) => {
    res.send('World')
})

const PORT = 8000
app.listen(PORT, () => {
    console.log(`listening on ${PORT} port, http://localhost:${PORT}`)
})
