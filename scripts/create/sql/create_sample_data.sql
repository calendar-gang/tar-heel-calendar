/* TODO: these works individually but doesn't work together */

INSERT INTO `users`(`username`, `email`, `firstname`, `lastname`, `password`)
VALUES
       ('eric',
        'eric@tar-heel-calendar.herokuapp.com',
        'Eric',
        'Schneider',
        'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg='), /* yes, this is what "password" encrypts to*/

       ('user',
        'user@tar-heel-calendar.herokuapp.com',
        'Us',
        'Er',
        'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=');

INSERT INTO `tokens`(`token`, `username`)
VALUES('bde8bf3f06cd24faabc60c9dfac94769daf666751eaea86e7f06255c9740', 'user');

INSERT INTO `events`(`username`, `title`, `location`, `description`, `start`, `end`)
VALUES('user', 'Event title', 'Location', 'Nice place.', '2020-11-10 12:30:00', '2020-11-11 12:30:00');

INSERT INTO `events`(`username`, `title`, `start`, `end`)
VALUES('user', 'Event title 2', '2020-11-10 12:30:00', '2020-11-11 12:30:00');

INSERT INTO `tasks`(`username`, `description`, `iscompleted`, `isshown`)
VALUES('user', 'A description', false, true);

