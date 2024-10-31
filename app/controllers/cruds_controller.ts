import type { HttpContext } from '@adonisjs/core/http'
import {
  createUserValidator,
  deleteUserValidator,
  findUserValidator,
  UpdateUserValidator,
} from '#validators/user'

import User from '#models/user'

export default class CrudsController {
  async allUser({ response }: HttpContext) {
    const userData = await User.all()
    return response.status(200).json(userData)
  }

  async findUser({ params, response }: HttpContext) {
    const payload = await findUserValidator.validate(params)
    const user = await User.find(Number(payload.id))
    return user
      ? response.status(200).json(user)
      : response.status(404).json({ message: 'User not found' })
  }

  async updateUser({ params, request, response }: HttpContext) {
    const payload = await UpdateUserValidator.validate({
      id: params.id,
      ...request.only(['name']),
    })
    const user = await User.findOrFail(Number(payload.id))
    user.name = payload.name
    await user.save()
    return response.status(200).json(user)
  }

  async deleteUser({ params, response }: HttpContext) {
    const payload = await deleteUserValidator.validate({ id: params.id })
    const user = await User.findOrFail(Number(payload.id))
    await user.delete()
    return response.status(200).json({ message: 'User deleted successfully' })
  }

  async createUser({ request, response }: HttpContext) {
    let id: number = Math.floor(Math.random() * 1000000)
    while ((await User.findBy('id', id)) !== null) {
      console.log(id)
      id = Math.floor(Math.random() * 1000000)
    }
    const payload = await createUserValidator.validate({ ...request.only(['name']), id })
    const user = new User()
    user
      .fill({
        id: payload.id,
        name: payload.name,
      })
      .save()
    return response.status(201).json({ id, name: payload.name })
  }
}
