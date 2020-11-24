# viewtasks
This file describes the `/viewtasks` endpoint.

## Core details
* Endpoint: `/viewtasks`.
* Request method: `POST`.
* Body parameters:
    * `token`: string of 60 characters.
* Response parameters:
    * `message`
    * `results`: an array of the events.

## Example operations
### Example (valid input)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/viewtasks',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740'
    }
});
```

#### Response (status: 200)
```json
{
    "message": "Got tasks.",
    "results": [
        {
            "id": 3,
            "username": "user",
            "description": "Task description.",
            "iscompleted": 0,
            "isshown": 1
        },
        {
            "id": 4,
            "username": "user",
            "description": "Task description.",
            "iscompleted": 1,
            "isshown": 1
        }
    ]
}
```

### Example (invalid token)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/viewtasks',
    data: {
        token: 'ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ'
    }
});
```

#### Response (status: 400)
```json
{
    "message": "Token not found."
}
```
