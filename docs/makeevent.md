# makeevent
This file describes the `/makeevent` endpoint.

## Core details
* Endpoint: `/makeevent`.
* Request method: `POST`.
* Body parameters:
    * `token`: string of 60 characters.
    * `title`: string of 1-255 characters.
    * `location` (_optional_): string of up to 500 characters.
    * `description` (_optional_): string of up to 65,535 characters.
    * `start`: a timestamp/string of the format `YYYY-MM-DD HH:MM:SS`. This should be between `1970-01-01 00:00:01` and `2038-01-09 03:14:07`.
    * `end`: a timestamp/string of the format `YYYY-MM-DD HH:MM:SS`. Should be after the `start` timestamp.
    * `recurring`: (_optional_): an enum/string, either `not`, `weekly`, `monthly`, or `yearly`. Defaults to `not`.
    * `recurringuntil`: (_optional_): a timestamp/string of the format `YYYY-MM-DD HH:MM:SS`.
    * `category`:  (_optional_): an enum/string, either `default`, or `school`. Defaults to `default`.
* Response parameters:
    * `message`
    * `id`: the id of the event. Unique.

## Future changes
* The `category` body parameter will feature more possible values soon. Possibly, even custom ones.
* The calendar only supports event up to 2038, which could be a problem.

## Example operations
### Example (valid input with all parameters)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/makeevent', {
    token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
    title: 'Event title',
    location: 'Event location',
    description: 'This is an event.',
    start: '2020-11-10 12:30:00',
    end: '2020-11-11 12:30:00',
    recurring: 'weekly',
    recurringuntil: '2020-12-11 12:30:00',
    category: 'school'
});
```

#### Response (status: 200)
```json
{
    "message": "Event made.",
    "id": 10
}
```

### Example (valid input without optional parameters)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/makeevent', {
    token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
    title: 'Event title',
    start: '2020-11-10 12:30:00',
    end: '2020-11-11 12:30:00'
});
```

#### Response (status: 200)
```json
{
    "message": "Event made.",
    "id": 11
}
```

### Example (invalid timestamp)
```js
let res = await axios.post('tar-heel-calendar.herokuapp.com/makeevent', {
    token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
    title: 'Event title',
    location: 'Event location',
    description: 'This is an event.',
    start: '2020-11-10 12:30:AA',
    end: '2020-11-11 12:30:00',
    recurring: 'weekly',
    recurringuntil: '2020-12-11 12:30:00',
    category: 'school'
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
let res = await axios.post('tar-heel-calendar.herokuapp.com/makeevent', {
    token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
    title: 'Event title',
    location: 'Event location',
    description: 'This is an event.',
    start: '2020-11-10 12:30:00',
    end: '2020-11-11 12:30:00',
    recurring: 'weekly',
    recurringuntil: '2020-12-11 12:30:00',
    category: '----'
});
```

#### Response (status: 400)
```json
{
    "message": "Invalid enum."
}
```
