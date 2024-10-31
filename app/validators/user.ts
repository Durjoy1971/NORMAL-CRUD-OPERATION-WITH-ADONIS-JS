import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().trim().minLength(3).maxLength(20),
  })
)

export const UpdateUserValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().trim().minLength(3).maxLength(20),
  })
)

export const findUserValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)

export const deleteUserValidator = vine.compile(
  vine.object({
    id: vine.number(),
  })
)
