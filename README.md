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
