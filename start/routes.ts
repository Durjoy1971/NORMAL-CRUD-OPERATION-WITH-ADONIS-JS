const CrudsController = () => import('#controllers/cruds_controller')
import User from '#models/user'
import router from '@adonisjs/core/services/router'

export const userDatabase = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Doe John' },
]

router.get('/', () => 'Hello World')

router.get('/users/v1/', [CrudsController, 'allUser'])
router.get('/users/v1/find/:id', [CrudsController, 'findUser'])
router.post('/users/v1/update/:id', [CrudsController, 'updateUser'])
router.post('/users/v1/delete/:id', [CrudsController, 'deleteUser'])
router.post('/users/v1/create', [CrudsController, 'createUser'])
router.get('/cs', ({ request }) => request.csrfToken)

router.get('/test', async ({ response }) => {
  const user = await User.createMany([
    {
      id: 20,
      name: 'secret1',
    },
    {
      id: 21,
      name: 'secret2',
    },
  ])

  return response.status(200).json(user)
})
