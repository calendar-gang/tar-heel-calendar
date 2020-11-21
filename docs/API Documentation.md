# API documentation
This file provides a list of endpoints for the backend.

## Notes
* Make sure to check for constraints on the frontend so that no improper requests are sent. The server can deal with bad requests and should not crash, no matter what is thrown at it, but the error messages are not very specific.

## General
* [/register](register.md): registers a new account.
* [/login](login.md): logs in with an account, generating a token.
* [/logout](logout.md): logs out of an account, deleting a given token.
* [/getinfo](getinfo.md): returns username, email, first name, and last name.

## Events
* [/makeevent](makeevent.md): makes an event given a token and other information.
* [/viewevents](viewevents.md): view events given a token.

