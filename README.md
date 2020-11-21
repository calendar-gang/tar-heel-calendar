# Tar Heel Calendar
This is our final project for COMP 426: Modern Web Programming. It is under development.

## Installation
In order to run this project locally, you must have the following software installed:
1. NodeJS and NPM. These will handle our JavaScript dependencies.
2. MariaDB. (Theoretically MySQL might work too but let's not be soulless here.)

HeidiSQL is also recommended for viewing the MariaDB databases directly. It can be installed alongside MariaDB.

The database then needs to be set up. Run the following in the command line to do this:
1. `npm run create-database`
2. `npm run create-tables`

These processes will kinda just keep going even after they are done, so count to five and then force quit the process.

## Starting
1. Have the MariaDB server running. In order to log in/connect, JawsDB will interject their information if on the Heroku server, OR the calendar will use environmental variables for credentials (`DBHOST`, `DBUSER`, `DBPASSWORD`), or if those don't exist, defaults will be used (`'localhost'`, `'root'`, `'password'`).
2. Run `npm run start`. This will first build and then start the server.
3. Now the app has started! Note _you_ must manually connect to [your local host](http://localhost:8080/), Node.js will not open this up automatically for you.

If you're only working on one end of the project, this may be a bit slow. There are a few other commands you can use if you feel this is the case:
1. `npm run start-client` will run only the frontend. Note that, obviously, the frontend may not work very well without the backend.
2. `npm run start-server` will run the backend without attempting to build the frontend. If your frontend is already built, this is fine, but any changes to the frontend must be rebuilt manually.
3. `npm run build` will build the frontend.
4. `npm run test` will run frontend unit tests.
5. `npm run drop-tables` will drop all tables in the database (if they exist).
6. `npm run create-sample-data` will insert some sample data into the database for testing purposes.

## Technologies used
* [Node.JS](https://github.com/nodejs/node)
* [React.JS](https://github.com/facebook/react) (and [Create React App](https://github.com/facebook/create-react-app))
* [Bulma](https://github.com/jgthms/bulma)
* [axios](https://github.com/axios/axios)
* [express](https://github.com/expressjs/express)
* [mysql (the npm package)](https://www.npmjs.com/package/mysql)
* [MariaDB](https://mariadb.org/)
* [Heroku](https://www.heroku.com/)
* [JawsDB](https://www.jawsdb.com/)

Other technologies used are listed in [`package.json`](package.json).

## Authors
* Victoria Hoffman
* Alfred Mathew
* Eric Schneider
* Ezri White

## Live website
The live website is currently located at [tar-heel-calendar.herokuapp.com](https://tar-heel-calendar.herokuapp.com/). Note it is not stable nor secure, so use with caution. The live website will restart with each upstream Git commit.
