import type { HttpContext } from '@adonisjs/core/http'
import { userDatabase } from '#start/routes'

export default class CrudsController {
  async allUser({ response }: HttpContext) {
    return response.status(200).json(userDatabase)
  }
  async findUser({ params, response }: HttpContext) {
    const user = userDatabase.find((userID) => userID.id === Number(params.id))
    return user
      ? response.status(200).json(user)
      : response.status(404).json({ message: 'User not found' })
  }
  async updateUser({ params, request, response }: HttpContext) {
    const { name } = request.only(['name'])
    const userIndex = userDatabase.findIndex((userID) => userID.id === Number(params.id))
    if (userIndex === -1) return response.status(404).json({ message: 'User not found' })
    userDatabase[userIndex] = { ...userDatabase[userIndex], name }
    return response.status(200).json(userDatabase[userIndex])
  }
  async deleteUser({ params, response }: HttpContext) {
    const userIndex = userDatabase.findIndex((userID) => userID.id === Number(params.id))
    if (userIndex === -1) return response.status(404).json({ message: 'User not found' })
    userDatabase.splice(userIndex, 1)
    return response.status(200).json({ message: 'User deleted successfully' })
  }
  async createUser({ request, response }: HttpContext) {
    const { name } = request.only(['name'])
    let id = 1
    while (true) {
      if (!userDatabase.find((userID) => userID.id === id)) break
      id++
    }
    userDatabase.push({ id, name })
    return response.status(201).json({ id, name })
  }
}
