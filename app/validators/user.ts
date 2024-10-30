import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(1).maxLength(20),
  })
)

export const UpdateUserValidator = vine.compile(
  vine.object({
    id: vine.number(),
    name: vine.string().minLength(1).maxLength(20),
  })
)
