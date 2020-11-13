# Tar Heel Calendar
This is our final project for COMP 426: Modern Web Programming. It is under development.

## Starting
1. Run `npm run start`. This will first build and then start the server.
2. Now the app has started! Note _you_ must manually connect to [your local host](http://localhost:8080/), Node.js will not open this up automatically for you.

If you're only working on one end of the project, this may be a bit slow. There are a few other commands you can use if you feel this is the case:
1. `npm run start-client` will run only the frontend. Note that, obviously, the frontend may not work very well without the backend.
2. `npm run start-server` will run the backend without attempting to build the frontend. If your frontend is already built, this is fine, but any changes to the frontend must be built manually.
3. `npm run build` will build the frontend.
4. `npm run test` will run frontend unit tests.

## Technologies used
* [Node.JS](https://github.com/nodejs/node)
* [React.JS](https://github.com/facebook/react) (and [Create React App](https://github.com/facebook/create-react-app))
* [Bulma](https://github.com/jgthms/bulma)
* [axios](https://github.com/axios/axios)
* [express](https://github.com/expressjs/express)
* [Heroku](https://www.heroku.com/)

Other technologies used are listed in [`package.json`](package.json).

## Authors
* Victoria Hoffman
* Alfred Mathew
* Eric Schneider
* Ezri White

## Live website
The live website is currently located at [tar-heel-calendar.herokuapp.com](https://tar-heel-calendar.herokuapp.com/). Note it is not stable nor secure, so use with caution. The live website will restart with each upstream Git commit.
