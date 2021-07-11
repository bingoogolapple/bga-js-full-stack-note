import { Request, Response } from 'express'
import * as Lodash from "lodash"
import url from "url"
import { controller, get, use } from '../decorator'
import { Repo } from '../model/Repo'
import { User } from '../model/User'
import { GithubApiService } from '../api/GithubApiService'
import { checkLogin } from './TestController'
@controller('/github')
class GitHubController {
    @use(checkLogin)
    @get('/')
    home(req: Request, res: Response) {
        let username: any = url.parse(req.url, true).query.username
        GithubApiService.getInstance().getUserInfo(username, (user: User) => {
            GithubApiService.getInstance().getRepos(user.login, (repos: Repo[]) => {
                // 默认从小到大排列，乘以 -1 后变为从大到小
                let sortRepos = Lodash.sortBy(repos, [(repo: Repo) => repo.size * -1])
                user.repos = sortRepos
                res.send(user)
            })
        })
    }
}
