# User Management API

This API provides endpoints to manage a simple user database. The following endpoints are available:

## Endpoints

### GET /

- **Description**: Returns a greeting message.
- **Response**: `Hello World`

### GET /users

- **Description**: Retrieves the list of all users.
- **Response**: JSON array of users.

### GET /users/:id

- **Description**: Retrieves a user by their ID.
- **Parameters**:
  - `id` (path parameter): The ID of the user.
- **Response**:
  - `200`: JSON object of the user.
  - `404`: User not found.

### POST /users/update/:id

- **Description**: Updates the name of a user by their ID.
- **Parameters**:
  - `id` (path parameter): The ID of the user.
  - `name` (body parameter): The new name of the user.
- **Response**:
  - `200`: JSON object of the updated user.
  - `404`: User not found.

### POST /users/delete/:id

- **Description**: Deletes a user by their ID.
- **Parameters**:
  - `id` (path parameter): The ID of the user.
- **Response**:
  - `200`: User deleted successfully.
  - `404`: User not found.

### POST /users/create

- **Description**: Creates a new user.
- **Parameters**:
  - `name` (body parameter): The name of the new user.
- **Response**:
  - `201`: JSON array of all users including the newly created user.

## Example User Database

```json
[
  { "id": 1, "name": "John Doe" },
  { "id": 2, "name": "Jane Doe" },
  { "id": 3, "name": "Doe John" }
]
```

# Routing With Controller

## routes.ts

```typescript
import Route from '@ioc:Adonis/Core/Route'
import UsersController from 'App/Controllers/Http/UsersController'

Route.get('/', async () => {
  return 'Hello World'
})


router.get('/', () => 'Hello World')
router.get('/users/v1/', [CrudsController, 'allUser'])
router.get('/users/v1/find/:id', [CrudsController, 'findUser'])
router.post('/users/v1/update/:id', [CrudsController, 'updateUser'])
router.post('/users/v1/delete/:id', [CrudsController, 'deleteUser'])
router.post('/users/v1/create', [CrudsController, 'createUser'])
```

## cruds_controller.ts

```typescript
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
```
