CREATE TABLE `tokens` (
    `token` CHAR(60) NOT NULL COLLATE 'utf8_general_ci',
    `username` CHAR(100) NOT NULL COLLATE 'utf8_general_ci',
    `whengen` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`token`) USING BTREE,
    CONSTRAINT `username`
        FOREIGN KEY(`username`) REFERENCES `users` (`username`)
)
    COLLATE='latin1_swedish_ci'
    ENGINE=InnoDB
;
