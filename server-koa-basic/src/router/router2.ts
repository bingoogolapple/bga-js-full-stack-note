import KoaRouter from 'koa-router'

const router = new KoaRouter({
  prefix: '/router2'
})

router.get('/aa/:p1/:p2', async (ctx, next) => {
  ctx.body = {
    method: ctx.method, // GET
    protocol: ctx.protocol, // http
    origin: ctx.origin, // "http://localhost:8000"
    url: ctx.url, // /router2/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
    originalUrl: ctx.originalUrl, // /router2/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
    path: ctx.path, // "/aa/bb/cc"
    query: ctx.query, // {"aakey": "aavalue", "bbkey": "bbvalue"}
    querystring: ctx.querystring, // "aakey=aavalue&bbkey=bbvalue"
    params: ctx.params, // {"p1": "bb", "p2": "cc"}
    hostname: ctx.hostname, // localhost
    host: ctx.host, // localhost
    ip: ctx.ip, // "::1"
    headers: ctx.headers
  }
})

export default router
