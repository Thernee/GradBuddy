-- Table for school criteria
-- Create a database called gradbuddy if not available

CREATE DATABASE IF NOT EXISTS `gradbuddy`;

USE `gradbuddy`;

CREATE TABLE IF NOT EXISTS `schoolCriteria`(
  `criteria_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `graduateLevel` VARCHAR(255) NOT NULL DEFAULT 'Masters/PhD',
  `offersScholarships` BOOLEAN NOT NULL DEFAULT false,
  `requiresAppFee` BOOLEAN NOT NULL DEFAULT true,
  `requiresGre` BOOLEAN NOT NULL DEFAULT false
);

-- Add index
ALTER TABLE
  `schoolCriteria` ADD INDEX `schoolCriteria_graduatelevel_index`(`graduateLevel`);

ALTER TABLE
    `schoolCriteria` ADD CONSTRAINT `schoolcriteria_school_id_foreign` FOREIGN KEY(`school_id`) REFERENCES `schools`(`school_id`);

-- Add sample data into school criteria table

INSERT INTO `schoolCriteria` (
  `criteria_id`,
  `school_id`,
  `graduateLevel`,
  `offersScholarships`,
  `requiresAppFee`,
  `requiresGre`
)
VALUES
  (
    1,
    1,
    'Masters/PhD',
    false,
    true,
    false
  );