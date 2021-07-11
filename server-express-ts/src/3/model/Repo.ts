export class Repo {
    name: string
    size: number
    language: string
    description: string

    constructor(repo: any) {
        this.name = repo.name
        this.size = repo.size
        this.language = repo.language
        this.description = repo.description
    }
}