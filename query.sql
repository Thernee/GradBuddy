SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `user_id` CHAR(36) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `fullname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `hashed_password` VARCHAR(255) NOT NULL,
  `nationality` VARCHAR(255) NULL,
  PRIMARY KEY(`user_id`)
);

ALTER TABLE `users` ADD UNIQUE `users_username_unique`(`username`);
ALTER TABLE `users` ADD UNIQUE `users_email_unique`(`email`);

INSERT INTO `users` (`user_id`, `username`, `fullname`, `email`, `nationality`) VALUES
('123e4567-e89b-12d3-a456-426655440000', 'admin', 'admin', 'pEY1K@example.com', 'English');

DROP TABLE IF EXISTS `schools`;
CREATE TABLE `schools` (
  `school_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `school_name` VARCHAR(255) NOT NULL,
  `state` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `institutionalControl` VARCHAR(255) NOT NULL,
  `rank` INT NOT NULL,
  `acceptanceRate` DECIMAL(8, 2) NOT NULL,
  `SchoolWebsite` VARCHAR(255) NULL
);

ALTER TABLE `schools` ADD INDEX `schools_state_city_index`(`state`, `city`);
ALTER TABLE `schools` ADD INDEX `schools_rank_index`(`rank`);
ALTER TABLE `schools` ADD INDEX `schools_institutionalcontrol_index`(`institutionalControl`);
ALTER TABLE `schools` ADD INDEX `schools_acceptancerate_index`(`acceptanceRate`);

INSERT INTO `schools` (`school_id`, `school_name`, `state`, `city`, `institutionalControl`, `rank`, `acceptanceRate`, `SchoolWebsite`)
VALUES (1, 'University of California, Berkeley', 'California', 'Berkeley', 'Public', 1, 5.0, 'https://www.berkeley.edu/');

DROP TABLE IF EXISTS `favorites`;
CREATE TABLE `favorites` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` CHAR(36) NOT NULL,
  `school_id` INT NOT NULL
);

INSERT INTO `favorites` (`id`, `user_id`, `school_id`) VALUES (1, '123e4567-e89b-12d3-a456-426655440000', 1);

DROP TABLE IF EXISTS `schoolCriteria`;
CREATE TABLE `schoolCriteria` (
  `criteria_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `graduateLevel` VARCHAR(255) NOT NULL DEFAULT 'Masters/PhD',
  `offersScholarships` TINYINT(1) NOT NULL DEFAULT 0,
  `requiresAppFee` TINYINT(1) NOT NULL DEFAULT 1,
  `requiresGre` TINYINT(1) NOT NULL DEFAULT 0
);

ALTER TABLE `schoolCriteria` ADD INDEX `schoolCriteria_graduatelevel_index`(`graduateLevel`);
ALTER TABLE `schoolCriteria` ADD CONSTRAINT `schoolcriteria_school_id_foreign` FOREIGN KEY(`school_id`) REFERENCES `schools`(`school_id`);

INSERT INTO `schoolCriteria` (`criteria_id`, `school_id`, `graduateLevel`, `offersScholarships`, `requiresAppFee`, `requiresGre`)
VALUES (1, 1, 'Masters/PhD', 0, 1, 0);

DROP TABLE IF EXISTS `scholarships`;
CREATE TABLE `scholarships` (
  `scholarship_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `scholarship_name` VARCHAR(255) NOT NULL,
  `scholarship_description` VARCHAR(255) NOT NULL,
  `program` VARCHAR(255) NOT NULL,
  `degree_level` VARCHAR(255) NOT NULL
);

ALTER TABLE `scholarships` ADD CONSTRAINT `scholarships_school_id_foreign` FOREIGN KEY(`school_id`) REFERENCES `schools`(`school_id`);

INSERT INTO `scholarships` (`scholarship_id`, `school_id`, `scholarship_name`, `scholarship_description`, `program`, `degree_level`)
VALUES (1, 1, 'Graduate School of Computer Science', 'Scholarships for graduating students in Computer Science', 'Computer science', 'Masters');

SET foreign_key_checks = 1;

ALTER TABLE `favorites` ADD CONSTRAINT `favorites_school_id_foreign` FOREIGN KEY(`school_id`) REFERENCES `schools`(`school_id`);
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`user_id`);
