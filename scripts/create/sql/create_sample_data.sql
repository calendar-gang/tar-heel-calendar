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

/* TODO: sample events */
/* TODO: these works individually but doesn't work together */
