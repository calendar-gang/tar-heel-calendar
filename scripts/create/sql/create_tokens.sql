CREATE TABLE IF NOT EXISTS `tokens` (
    `token` CHAR(60) NOT NULL COLLATE 'utf8_general_ci',
    `username` CHAR(100) NOT NULL COLLATE 'utf8_general_ci',
    `whengen` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    PRIMARY KEY (`token`) USING BTREE,
    CONSTRAINT `username_tokens`
        FOREIGN KEY(`username`) REFERENCES `users` (`username`)
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
