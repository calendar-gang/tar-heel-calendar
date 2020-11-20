CREATE TABLE IF NOT EXISTS `events` (
    `username` CHAR(100) NOT NULL COLLATE 'utf8_general_ci',
    `title` TINYTEXT NOT NULL COLLATE 'utf8_general_ci',
    `location` VARCHAR(500) NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `description` TEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `start` TIMESTAMP NOT NULL,
    `end` TIMESTAMP NOT NULL,
    `recurring` ENUM('not','weekly','monthly','yearly') NOT NULL DEFAULT 'not' COLLATE 'utf8_general_ci',
    `recurringuntil` TIMESTAMP NULL DEFAULT NULL,
    `category` ENUM('default','school') NOT NULL DEFAULT 'default' COLLATE 'utf8_general_ci',
    CONSTRAINT `username_events`
        FOREIGN KEY (`username`) REFERENCES `users` (`username`)
)
COLLATE='utf8_general_ci'
;
