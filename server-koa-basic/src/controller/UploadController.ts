import { Context } from 'koa'
import { File } from 'formidable'
import { createReadStream, createWriteStream } from 'fs'
import path from 'path'

class UploadController {
  async upload(ctx: Context) {
    const avatar = ctx.request.files?.avatar as File
    console.log('upload', avatar?.toJSON())
    // size: 5665,
    // path: '/var/folders/kt/zsr04x5s3r582r3x2wkzxt6w0000gp/T/upload_6151b5b5269d7e7f5daecb8e132efecf',
    // name: 'ttlogo.png',
    // type: 'image/png',
    if (!avatar || !avatar.name || !avatar.type) {
      ctx.body = '请上传头像'
      return
    }

    const typeSet = new Set([
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'image/png'
    ])
    if (!typeSet.has(avatar.type)) {
      ctx.body = '非法文件上传'
      return
    }

    const reader = createReadStream(avatar.path)
    const ext = path.extname(avatar.name)
    // 需要提前创建到文件的上一级目录，否则不会写入文件
    const filePath = `upload/avatar/${new Date().getTime()}${ext}`
    const writer = createWriteStream(filePath)
    reader.pipe(writer)
    ctx.body = {
      path: filePath
    }
  }
}

export default new UploadController()
