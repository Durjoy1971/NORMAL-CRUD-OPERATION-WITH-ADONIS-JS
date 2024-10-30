import router from '@adonisjs/core/services/router'

let userDatabase = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Doe John' },
]

router.get('Hi', () => 'Hello World')

router.get('/users', ({ response }) => response.status(200).json(userDatabase))

router.get('/users/:id', ({ params, response }) => {
  const user = userDatabase.find((userID) => userID.id === Number(params.id))
  return user
    ? response.status(200).json(user)
    : response.status(404).json({ message: 'User not found' })
})

router.post('/users/update/:id', ({ params, request, response }) => {
  const { name } = request.only(['name'])
  const userIndex = userDatabase.findIndex((userID) => userID.id === Number(params.id))
  if (userIndex === -1) return response.status(404).json({ message: 'User not found' })
  userDatabase[userIndex] = { ...userDatabase[userIndex], name }
  return response.status(200).json(userDatabase[userIndex])
})

router.post('/users/delete/:id', ({ params, response }) => {
  const userIndex = userDatabase.findIndex((userID) => userID.id === Number(params.id))
  if (userIndex === -1) return response.status(404).json({ message: 'User not found' })
  userDatabase.splice(userIndex, 1)
  return response.status(200).json({ message: 'User deleted successfully' })
})

router.post('/users/create', ({ request, response }) => {
  const { name } = request.only(['name'])
  let id = 1
  while (true) {
    if (!userDatabase.find((userID) => userID.id === id)) break
    id++
  }
  userDatabase.push({ id, name })
  return response.status(201).json(userDatabase)
})
