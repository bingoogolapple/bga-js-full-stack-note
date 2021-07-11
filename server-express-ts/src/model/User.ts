export interface UserInfo {
    id: string
    username: string
    email: string
}
export interface User extends UserInfo {
    password: string
}