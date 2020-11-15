# API documentation
This file provides a list of endpoints for the backend.

## register
* Endpoint: `/register`
* Body parameters:
    * `username`: string of 1-100 characters. Must be unique.
    * `email`: string of 5-255 characters. Must be unique.
    * `firstname`: string of 1-100 characters.
    * `lastname`: string of up 1-100 characters.
    * `password`: string of up to 5-255 characters. Currently, there are not any kind of complexity check, excluding length restrictions.

### Example operation
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/register', {
    username: 'user',
    email: 'user@tar-heel-calendar.herokuapp.com',
    firstname: 'Us',
    lastname: 'Er',
    password: 'password'
});
```

### Notes
Make sure to check for constraints on the frontend so that no improper requests are sent. The server can deal with bad requests but the error messages are not very specific.