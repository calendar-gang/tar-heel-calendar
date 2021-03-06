# register
This file describes the `/register` endpoint.

## Core details
* Endpoint: `/register`.
* Request method: `POST`.
* Body parameters:
    * `username`: string of 1-100 characters. Must be unique.
    * `email`: string of 5-255 characters. Must be unique.
    * `firstname`: string of 1-100 characters.
    * `lastname`: string of up 1-100 characters.
    * `password`: string of up to 5-255 characters. Currently, there are not any kind of complexity check, excluding length restrictions.
* Response parameters:
    * `message`
    
## Notes
* Although the password is encrypted in the database, security is not being strongly focused on at this stage. Please warn the user that this application is in the development phase and as such, any password should be specific to this site.
    
## Example operations
### Example (valid input)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/register',
    data: {
        username: 'user',
        email: 'user@tar-heel-calendar.herokuapp.com',
        firstname: 'Us',
        lastname: 'Er',
        password: 'password'
    }
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
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/register',
    data: {
        username: 'user',
        email: 'user2@tar-heel-calendar.herokuapp.com',
        firstname: 'Us',
        lastname: 'Er',
        password: 'password'
    }
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
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/register',
    data: {
        username: 'user2',
        email: 'user@tar-heel-calendar.herokuapp.com',
        firstname: 'Us',
        lastname: 'Er',
        password: 'password'
    }
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
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/register',
    data: {
        username: '',
        email: 'user2@tar-heel-calendar.herokuapp.com',
        firstname: 'Us',
        lastname: 'Er',
        password: 'password'
    }
});
```

#### Response (status: 400)
```json
{
    "message": "Invalid length of parameter."
}
```
