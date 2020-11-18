# logout
This file describes the `/logout` endpoint.

## Core Details
* Endpoint: `/logout`.
* Request method: `POST`.
* Body parameters:
    * `token`: string of 60 characters.

## Example operations
### Example (valid input)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/logout', {
    token: 'b15efc04cb19d956fc982451343981ecf956dc31eab7486a4d7939a77476'
});
```

#### Response (status: 200)
```json
{
    "message": "Deleted token."
}
```

### Example (no token)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/logout', {
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
let res = await axios.post('tar-heel-calendar.herokuapp.com/logout', {
    token: 'b15efc04cb19d956fc982451343'
});
```

#### Response (status: 400)
```json
{
    "message": "Invalid length of parameter."
}
```