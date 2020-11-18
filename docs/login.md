# login
This file describes the `/login` endpoint.

## Core Details
* Endpoint: `/login`.
* Request method: `POST`.
* Body parameters:
    * `username`: string of 1-100 characters. Must be an existing username.
    * `password`: string of up to 5-255 characters. Must match the password stored in the database.

## Notes
* Make sure to check for constraints on the frontend so that no improper requests are sent. As seen below, the server can deal with bad requests, but the error messages are not very specific.
* The token returned inside the body should be stored through cookies. This token is random; you should not expect the same generated token twice.

## Example operations
### Example (valid input)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/login', {
    username: 'user',
    password: 'password'
});
```

#### Response (status: 200)
```json
{
    "message": "Logged in.",
    "token": "bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740"
}
```

### Example (no username)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/login', {
    username: 'useruseruser',
    password: 'password'
});
```

#### Response (status: 400)
```json
{
    "message": "Username missing."
}
```

### Example (incorrect password)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/login', {
    username: 'user',
    password: 'password2'
});
```

#### Response (status: 400)
```json
{
    "message": "Password incorrect."
}
```

### Example (bad length)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/login', {
    username: 'user',
    password: ''
});
```

#### Response (status: 400)
```json
{
    "message": "Invalid length of parameter."
}
```