# editevent
This file describes the `/editevent` endpoint.

## Core details
* Endpoint: `/editevent`.
* Request method: `POST`.
* Body parameters:
    * `token`: string of 60 characters.
    * `id`: the id of the event to be edited.
    * `title`: (_optional_): string of 1-255 characters.
    * `location` (_optional_): string of up to 500 characters.
    * `description` (_optional_): string of up to 65,535 characters.
    * `start`: (_optional_): a timestamp/string of the format `YYYY-MM-DD HH:MM:SS`. This should be between `1970-01-01 00:00:01` and `2038-01-09 03:14:07`.
    * `end`: (_optional_): a timestamp/string of the format `YYYY-MM-DD HH:MM:SS`. Should be after the `start` timestamp.
    * `recurring`: (_optional_): an enum/string, either `not`, `weekly`, `monthly`, or `yearly`.
    * `recurringuntil`: (_optional_): a timestamp/string of the format `YYYY-MM-DD HH:MM:SS`.
    * `category`:  (_optional_): an enum/string, either `default`, or `school`.
* Response parameters:
    * `message`

## Example operations
### Example (valid input)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/editevent',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        id: 2,
        title: 'New event title'
    }
});
```

#### Response (status: 200)
```json
{
    "message": "Event edited."
}
```

### Example (invalid timestamp)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/editevent',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        id: 2,
        title: 'New event title',
        start: '2020-11-10 12:30:AA'
    }
});
```

#### Response (status: 400)
```json
{
    "message": "Invalid time stamp."
}
```

### Example (invalid enum)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/editevent',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        id: 2,
        title: 'New event title',
        recurring: 'something'
    }
});
```

#### Response (status: 400)
```json
{
    "message": "Invalid enum."
}
```
