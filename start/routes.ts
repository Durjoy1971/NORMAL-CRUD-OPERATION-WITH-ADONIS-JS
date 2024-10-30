const CrudsController = () => import('#controllers/cruds_controller')
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
