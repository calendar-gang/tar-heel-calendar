# edittask
This file describes the `/edittask` endpoint.

## Core details
* Endpoint: `/edittask`.
* Request method: `POST`.
* Body parameters:
    * `token`: string of 60 characters.
    * `id`: the id of the event to be edited.
    * `description` (_optional_): string of up to 65,535 characters.
    * `iscomplete` (_optional_): boolean.
    * `isshown` (_optional_): boolean.

## Example operations
### Example (valid input)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/edittask',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        id: 3,
        description: 'New description'
    }
});
```

#### Response (status: 200)
```json
{
    "message": "Task edited."
}
```

### Example (invalid token)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/edittask',
    data: {
        token: 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ',
        id: 3,
        description: 'New description'
    }
});
```

#### Response (status: 400)
```json
{
    "message": "Token not found."
}
```

