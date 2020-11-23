CREATE TABLE IF NOT EXISTS `tasks`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `username` CHAR(100) NOT NULL COLLATE 'utf8_general_ci',
    `description` TEXT NULL DEFAULT NULL COLLATE 'utf8_general_ci',
    `iscompleted` BOOL NOT NULL DEFAULT false,
    `isshown` BOOL NOT NULL DEFAULT true,
    PRIMARY KEY (`id`),
    CONSTRAINT `username_tasks`
        FOREIGN KEY (`username`) REFERENCES `users` (`username`)
)
COLLATE='utf8_general_ci'
;
