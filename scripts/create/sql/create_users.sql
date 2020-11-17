CREATE TABLE IF NOT EXISTS `users` (
	`username` CHAR(100) NOT NULL COLLATE 'utf8_general_ci',
	`email` CHAR(100) NOT NULL COLLATE 'utf8_general_ci',
	`firstname` CHAR(100) NOT NULL COLLATE 'utf8_general_ci',
	`lastname` CHAR(100) NOT NULL COLLATE 'utf8_general_ci',
	`password` VARCHAR(256) NOT NULL COLLATE 'utf8_general_ci',
	PRIMARY KEY (`username`) USING BTREE,
	INDEX `email` (`email`) USING BTREE
)
COLLATE='utf8_general_ci'
ENGINE=InnoDB
;
