# deletetask
This file describes the `/deletetask` endpoint.

## Core details
* Endpoint: `/deletetask`.
* Request method: `DELETE`.
* Body parameters:
    * `token`: string of 60 characters.
    * `id`: the id of the task to be deleted.
* Response parameters:
    * `message`

## Example operations
### Example (valid input)
```js
let res = await axios({
    method: 'delete',
    url: 'https://tar-heel-calendar.herokuapp.com/deletetask',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        id: 1
    }
});
```

#### Response (status: 200)
```json
{
    "message": "Deleted task."
}
```

### Example (invalid token)
```js
let res = await axios({
    method: 'delete',
    url: 'https://tar-heel-calendar.herokuapp.com/deletetask',
    data: {
        token: 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
        id: 1
    }
});
```

#### Response (status: 400)
```json
{
    "message": "Token not found."
}
```

### Example (invalid id)
```js
let res = await axios({
    method: 'delete',
    url: 'https://tar-heel-calendar.herokuapp.com/deletetask',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        id: 200
    }
});
```

#### Response (status: 400)
```json
{
    "message": "No task found."
}
```
