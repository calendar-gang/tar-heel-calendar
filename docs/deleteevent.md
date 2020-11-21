# deleteevent
This file describes the `/deleteevent` endpoint.

## Core details
* Endpoint: `/deleteevent`.
* Request method: `DELETE`.
* Body parameters:
    * `token`: string of 60 characters.
    * `id`: the id of the event to be deleted.
* Response parameters:
    * `message`

## Example operations
### Example (valid input)
```js
let res = await axios.delete('https://tar-heel-calendar.herokuapp.com/deleteevent', {
    token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
    id: 5
});
```

#### Response (status: 200)
```json
{
    "message": "Deleted event."
}
```

### Example (invalid token)
```js
let res = await axios.delete('https://tar-heel-calendar.herokuapp.com/deleteevent', {
    token: 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
    id: 5
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
let res = await axios.delete('https://tar-heel-calendar.herokuapp.com/deleteevent', {
    token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
    id: 200
});
```

#### Response (status: 400)
```json
{
    "message": "No event found."
}
```
