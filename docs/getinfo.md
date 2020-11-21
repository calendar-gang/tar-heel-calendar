# getinfo
This file describes the `/getinfo` endpoint.

## Core details
* Endpoint: `/getinfo`.
* Request method: `GET`.
* Body parameters:
    * `token`: string of 60 characters.
* Response parameters:
    * `message`
    * `username`
    * `email`
    * `firstname`
    * `lastname`

## Example operations
### Example (valid input)
```js
let res = await axios.get('https://tar-heel-calendar.herokuapp.com/getinfo', {
    token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740'
});
```

#### Response (status: 200)
```json
{
    "message": "Information found.",
    "username": "user",
    "email": "user@tar-heel-calendar.herokuapp.com",
    "firstname": "Us",
    "lastname": "er"
}
```

### Example (invalid token)
```js
let res = await axios.get('https://tar-heel-calendar.herokuapp.com/getinfo', {
    token: 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
});
```

#### Response (status: 400)
```json
{
    "message": "Token not found."
}
```

### Example (bad length)
```js
let res = await axios.get('https://tar-heel-calendar.herokuapp.com/getinfo', {
    token: 'ZZZ'
});
```

#### Response (status: 400)
```json
{
    "message": "Invalid length of parameter."
}
```