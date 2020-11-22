# viewevents
This file describes the `/viewevents` endpoint.

## Core details
* Endpoint: `/viewevents`.
* Request method: `POST`.
* Body parameters:
    * `token`: string of 60 characters.
    * `earliest`: (_optional_) a filter for the earliest possible timestamp. The output will only include events past this timestamp. Defaults to `1970-01-01 00:00:01`.
    * `latest`: (_optional_) a filter for the earliest possible timestamp. The output will only include events past this timestamp. Defaults to `2038-01-09 03:14:07`.
* Response parameters:
    * `message`
    * `results`: an array of the events.

## Notes
* Recurring events may be a little bit janky. For now, don't trust them to show up.

## Example operations
### Example (valid input)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        earliest: '2020-10-10 12:30:00',
        latest: '2020-12-11 12:30:00'
    }
});
```

#### Response (status: 200)
```json
{
    "message": "Got events.",
    "results": [
        {
            "id": 1,
            "username": "user",
            "title": "Event title",
            "location": "Event location",
            "description": "This is an event.",
            "start": "2020-11-10T17:30:00.000Z",
            "end": "2020-11-11T17:30:00.000Z",
            "recurring": "weekly",
            "recurringuntil": "2020-12-11T17:30:00.000Z",
            "category": "school"
        },
        {
            "id": 2,
            "username": "user",
            "title": "Event title fdfd",
            "location": "Event location",
            "description": "This is an event.",
            "start": "2020-11-10T17:30:00.000Z",
            "end": "2020-11-11T17:30:00.000Z",
            "recurring": "weekly",
            "recurringuntil": "2020-12-11T17:30:00.000Z",
            "category": "school"
        }
    ]
}
```

### Example (valid but no results)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        earliest: '2019-10-10 12:30:00',
        latest: '2019-12-11 12:30:00'
    }
});
```

#### Response (status: 200)
```json
{
    "message": "Got events.",
    "results": []
}
```

### Example (valid without optional parameters)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740'
    }
});
```

#### Response (status: 200)
```json
{
    "message": "Got events.",
    "results": [
        {
            "id": 1,
            "username": "user",
            "title": "Event title",
            "location": "Event location",
            "description": "This is an event.",
            "start": "2020-11-10T17:30:00.000Z",
            "end": "2020-11-11T17:30:00.000Z",
            "recurring": "weekly",
            "recurringuntil": "2020-12-11T17:30:00.000Z",
            "category": "school"
        },
        {
            "id": 2,
            "username": "user",
            "title": "Event title fdfd",
            "location": "Event location",
            "description": "This is an event.",
            "start": "2020-11-10T17:30:00.000Z",
            "end": "2020-11-11T17:30:00.000Z",
            "recurring": "weekly",
            "recurringuntil": "2020-12-11T17:30:00.000Z",
            "category": "school"
        }
    ]
}
```

### Example (invalid token)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
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

### Example (invalid timestamp)
```js
let res = await axios({
    method: 'post',
    url: 'https://tar-heel-calendar.herokuapp.com/viewevents',
    data: {
        token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
        earliest: 'ZZZ-10-ZZ 12:30:00',
        latest: '2019-12-11 12:30:00'
    }
});
```

#### Response (status: 400)
```json
{
    "message": "Invalid time stamp."
}
```
