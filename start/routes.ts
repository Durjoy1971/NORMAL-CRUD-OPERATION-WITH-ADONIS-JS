const CrudsController = () => import('#controllers/cruds_controller')
import router from '@adonisjs/core/services/router'

export const userDatabase = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'Doe John' },
]

router.get('/', () => 'Hello World')

router.get('/users', [CrudsController, 'allUser'])

router.get('/users/find/:id', [CrudsController, 'findUser'])

router.post('/users/update/:id', [CrudsController, 'updateUser'])

router.post('/users/delete/:id', [CrudsController, 'deleteUser'])

router.post('/users/create', [CrudsController, 'createUser'])
