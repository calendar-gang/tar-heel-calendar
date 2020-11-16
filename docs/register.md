# register
This file describes the `/register` endpoint.

## Core Details
* Endpoint: `/register`.
* Request method: `POST`.
* Body parameters:
    * `username`: string of 1-100 characters. Must be unique.
    * `email`: string of 5-255 characters. Must be unique.
    * `firstname`: string of 1-100 characters.
    * `lastname`: string of up 1-100 characters.
    * `password`: string of up to 5-255 characters. Currently, there are not any kind of complexity check, excluding length restrictions.
    
## Notes
Make sure to check for constraints on the frontend so that no improper requests are sent. As seen below, the server can deal with bad requests, but the error messages are not very specific.
    
## Example operations
### Example (valid input)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/register', {
    username: 'user',
    email: 'user@tar-heel-calendar.herokuapp.com',
    firstname: 'Us',
    lastname: 'Er',
    password: 'password'
});
```

#### Response (status: 200)
```json
{
    "message": "Registration complete."
}
```

### Example (repeat username)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/register', {
    username: 'user',
    email: 'user2@email.com',
    firstname: 'Us',
    lastname: 'Er',
    password: 'password'
});
```

#### Response (status: 400)
```json
{
    "message": "Username already used."
}
```

### Example (repeat email)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/register', {
    username: 'user2',
    email: 'user@tar-heel-calendar.herokuapp.com',
    firstname: 'Us',
    lastname: 'Er',
    password: 'password'
});
```

#### Response (status: 400)
```json
{
    "message": "Email already used."
}
```

### Example (bad length)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/register', {
    username: '',
    email: 'user2@tar-heel-calendar.herokuapp.com',
    firstname: 'Us',
    lastname: 'Er',
    password: 'password'
});
```

#### Response (status: 400)
```json
{
    "message": "Invalid length of parameter."
}
```
