# maketask
This file describes the `/maketask` endpoint.

## Core details
* Endpoint: `/maketask`.
* Request method: `POST`.
* Body parameters:
    * `token`: string of 60 characters.
    * `description` (_optional_): string of up to 65,535 characters.
    * `iscomplete` (_optional_): boolean. Defaults to false.
    * `isshown` (_optional_): boolean. Defaults to true.
* Response parameters:
    * `message`
    * `id`: the id of the event. Unique.

## Example operations
### Example (valid input with all parameters)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/maketask',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        description: 'Task description.',
        iscomplete: true,
        isshown: false
    }
});
```

#### Response (status: 200)
```json
{
    "message": "Task made.",
    "id": 3
}
```

### Example (valid input without optional parameters)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/maketask',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        description: 'Task description.'
    }
});
```

#### Response (status: 200)
```json
{
    "message": "Task made.",
    "id": 4
}
```

### Example (invalid boolean)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/maketask',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        description: 'Task description.',
        iscomplete: 'trzz',
    }
});
```

#### Response (status: 400)
```json
{
    "message": "Invalid boolean."
}
```
