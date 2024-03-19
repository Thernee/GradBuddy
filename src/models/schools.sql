-- Table for schools if not available
-- Create a database called gradbuddy if not available

CREATE DATABASE IF NOT EXISTS `gradbuddy`;

USE `gradbuddy`;

-- Table for schools
CREATE TABLE IF NOT EXISTS `schools` (
  `school_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `school_name` VARCHAR(255) NOT NULL,
  `state` VARCHAR(255) NOT NULL,
  `city` VARCHAR(255) NOT NULL,
  `institutionalControl` VARCHAR(255) NOT NULL,
  `rank` INT NOT NULL,
  `acceptanceRate` DECIMAL(8, 2) NOT NULL,
  `SchoolWebsite` VARCHAR(255) NULL
);

-- Add index
ALTER TABLE
  `schools` ADD INDEX `schools_state_city_index`(`state`, `city`);
ALTER TABLE
  `schools` ADD INDEX `schools_rank_index`(`rank`);
ALTER TABLE
  `schools` ADD INDEX `schools_institutionalcontrol_index`(`institutionalControl`);
ALTER TABLE
  `schools` ADD INDEX `schools_acceptancerate_index`(`acceptanceRate`);

-- Add sample data into schools table
INSERT INTO
  `schools` (
    `school_id`,
    `school_name`,
    `state`,
    `city`,
    `institutionalControl`,
    `rank`,
    `acceptanceRate`,
    `SchoolWebsite`
  )
VALUES
  (
    1,
    'University of California, Berkeley',
    'California',
    'Berkeley',
    'Public',
    1,
    0.94,
    'https://www.berkeley.edu/'
  );
