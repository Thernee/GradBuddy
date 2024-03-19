SET foreign_key_checks = 0;

DROP TABLE if EXISTS `users`;

CREATE TABLE `users`(
    `user_id` CHAR(36) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `fullname` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `nationality` VARCHAR(255) NULL,
    PRIMARY KEY(`user_id`)
);
ALTER TABLE
    `users` ADD UNIQUE `users_username_unique`(`username`);
ALTER TABLE
    `users` ADD UNIQUE `users_email_unique`(`email`);
    
DROP TABLE if EXISTS `favorites`;
CREATE TABLE `favorites`(
    `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` CHAR(36) NOT NULL,
    `school_id` INT NOT NULL
);

DROP TABLE if EXISTS `schools`;
CREATE TABLE `schools`(
    `school_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `school_name` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `institutionalControl` VARCHAR(255) NOT NULL,
    `rank` INT NOT NULL,
    `acceptanceRate` DECIMAL(8, 2) NOT NULL,
    `SchoolWebsite` VARCHAR(255) NULL
);
ALTER TABLE
    `schools` ADD INDEX `schools_state_city_index`(`state`, `city`);
ALTER TABLE
    `schools` ADD INDEX `schools_rank_index`(`rank`);
ALTER TABLE
    `schools` ADD INDEX `schools_institutionalcontrol_index`(`institutionalControl`);
ALTER TABLE
    `schools` ADD INDEX `schools_acceptancerate_index`(`acceptanceRate`);

DROP TABLE if EXISTS `schoolCriteria`;
CREATE TABLE `schoolCriteria`(
    `criteria_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `school_id` INT NOT NULL,
    `graduateLevel` VARCHAR(255) NOT NULL DEFAULT 'Masters/PhD',
    `offersScholarships` TINYINT(1) NOT NULL DEFAULT '0',
    `requiresAppFee` TINYINT(1) NOT NULL DEFAULT '1',
    `requiresGre` TINYINT(1) NOT NULL DEFAULT '0'
);

DROP TABLE if EXISTS `scholarship`;
CREATE TABLE `scholarship`(
    `scholarship_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `school_id` INT NOT NULL,
    `scholarship_name` VARCHAR(255) NOT NULL,
    `program` VARCHAR(255) NOT NULL,
    `degree_level` VARCHAR(255) NOT NULL,
    `offer_link` VARCHAR(255) NULL,
    `deadline` DATE NULL
);

SET foreign_key_checks = 1;

ALTER TABLE
    `schoolCriteria` ADD CONSTRAINT `schoolcriteria_school_id_foreign` FOREIGN KEY(`school_id`) REFERENCES `schools`(`school_id`);
ALTER TABLE
    `favorites` ADD CONSTRAINT `favorites_school_id_foreign` FOREIGN KEY(`school_id`) REFERENCES `schools`(`school_id`);
ALTER TABLE
    `favorites` ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`user_id`);
ALTER TABLE
    `scholarship` ADD CONSTRAINT `scholarship_school_id_foreign` FOREIGN KEY(`school_id`) REFERENCES `schools`(`school_id`);