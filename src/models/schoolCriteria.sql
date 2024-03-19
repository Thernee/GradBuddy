-- Table for school criteria
-- Create a database called gradbuddy if not available

CREATE DATABASE IF NOT EXISTS `gradbuddy`;

USE `gradbuddy`;

CREATE TABLE IF NOT EXISTS `schoolCriteria`(
  `criteria_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `graduateLevel` VARCHAR(255) NOT NULL DEFAULT 'Masters/PhD',
  `offersScholarships` TINYINT(1) NOT NULL DEFAULT '0',
  `requiresAppFee` TINYINT(1) NOT NULL DEFAULT '1',
  `requiresGre` TINYINT(1) NOT NULL DEFAULT '0'
);

-- Add index
ALTER TABLE
  `schoolCriteria` ADD INDEX `schoolCriteria_graduatelevel_index`(`graduateLevel`);

ALTER TABLE
    `schoolCriteria` ADD CONSTRAINT `schoolcriteria_school_id_foreign` FOREIGN KEY(`school_id`) REFERENCES `schools`(`school_id`);