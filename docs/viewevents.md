# viewevents
This file describes the `/viewevents` endpoint.

## Core details
* Endpoint: `/viewevents`.
* Request method: `GET`.
* Body parameters:
    * `token`: string of 60 characters.
    * `earliest`: (_optional_) a filter for the earliest possible timestamp. The output will only include events past this timestamp. Defaults to `1970-01-01 00:00:01`.
    * `latest`: (_optional_) a filter for the earliest possible timestamp. The output will only include events past this timestamp. Defaults to `2038-01-09 03:14:07`.

## Example operations
### Example (valid input)
```js
let res = await axios.get('tar-heel-calendar.herokuapp.com/getinfo', {
    token: 'bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740',
    earliest: '2020-10-10 12:30:00',
    latest: '2020-12-11 12:30:00'
});
```