# API documentation
This file provides a list of endpoints for the backend.

## Notes
* Make sure to check for constraints on the frontend so that no improper requests are sent. The server can deal with bad requests and should not crash no matter what is thrown at it. However, errors considered to be internal (such as the invalid length of parameter) produces error messages that are not very specific.

## General
* [/register](register.md): registers a new account.
* [/login](login.md): logs in with an account, generating a token.
* [/logout](logout.md): logs out of an account, deleting a given token.
* [/getinfo](getinfo.md): returns username, email, first name, and last name.

## Events
* [/makeevent](makeevent.md): makes an event given a token and other information.
* [/viewevents](viewevents.md): view events given a token.
* [/deleteevent](deleteevent.md): deletes an event given a token and an ID.
* [/editevent](editevent.md): edits an event given a token and an ID, and other information.

## Tasks
* [/maketask](maketask.md): makes a task given a token and other information.
* [/viewtasks](viewtasks.md): view tasks given a token.
* [/deletetask](deletetask.md): deletes an event given a token and an ID.
* [/edittask](edittask.md): edits a task given a token and an ID, and other information.
