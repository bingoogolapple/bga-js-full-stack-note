import Admin from '../model/Admin'

class AdminService {
  getAdmin() {
    return Admin.findOne()
  }

  getAdminList(
    username: string | null,
    currentPage: number = 1,
    pageSize: number = 10
  ) {
    console.log('uername', username)
    return Admin.findAndCountAll({
      where: {
        username
      },
      limit: pageSize,
      offset: (currentPage - 1) * pageSize
    })
  }
}
export default new AdminService()
