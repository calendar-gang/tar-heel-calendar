# login
This file describes the `/login` endpoint.

## Core Details
* Endpoint: `/login`.
* Request method: `POST`.
* Body parameters:
    * `username`: string of 1-100 characters. Must be an existing username.
    * `password`: string of up to 5-255 characters. Must match the password stored in the database.

## Notes
* Make sure to check for constraints on the frontend so that no improper requests are sent. As seen below, the server can deal with bad requests, but the error messages are not very specific.
* The token returned in the body should be stored through cookies.