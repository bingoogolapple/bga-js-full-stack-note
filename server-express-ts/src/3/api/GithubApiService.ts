import * as request from "request"
import { User } from "../model/User"
import { Repo } from "../model/Repo"

const options: request.CoreOptions = {
    headers: {
        'User-Agent': "request"
    },
    json: true
}

export class GithubApiService {
    private static instance: GithubApiService
    private constructor() { }

    static getInstance() {
        if (!GithubApiService.instance) {
            GithubApiService.instance = new GithubApiService()
        }
        return GithubApiService.instance
    }

    getUserInfo(userName: string, cb: any) {
        request.get(`https://api.github.com/users/${userName}`, options, (error: any, response: any, body: any) => {
            // body 返回内容默认为字符串，options 中设置 json 为 true 后则 body 为对象
            // console.log(typeof body)
            // let user: User = new User(JSON.parse(body))
            let user: User = new User(body)
            cb(user)
        })
    }


    getRepos(userName: string, cb: any) {
        request.get(`https://api.github.com/users/${userName}/repos`, options, (error: any, response: any, body: any) => {
            // let repo: Repo[] = JSON.parse(body).map((repo: any) => new Repo(repo))
            let repo: Repo[] = body.map((repo: any) => new Repo(repo))
            cb(repo)
        })
    }
}