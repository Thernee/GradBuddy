-- Table for scholarships
-- Create a database called gradbuddy if not available

CREATE DATABASE IF NOT EXISTS `gradbuddy`;

USE `gradbuddy`;

-- Table for scholarships
CREATE TABLE IF NOT EXISTS `scholarships` (
  `scholarship_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `school_id` INT NOT NULL,
  `scholarship_name` VARCHAR(255) NOT NULL,
  `scholarship_description` VARCHAR(255) NOT NULL,
  `program` VARCHAR(255) NOT NULL,
  `degree_level` VARCHAR(255) NOT NULL
);

-- Add foreign keys
ALTER TABLE
  `scholarships` ADD CONSTRAINT `scholarships_school_id_foreign` FOREIGN KEY(`school_id`) REFERENCES `schools`(`school_id`);

-- Add sample data into scholarships table
INSERT INTO
  `scholarships` (
    `scholarship_id`,
    `school_id`,
    `scholarship_name`,
    `scholarship_description`,
    `program`,
    `degree_level`
  )
VALUES
  (
    1,
    1,
    'Graduate School of Computer Science',
    'Scholarships for graduating students in Computer Science',
    'Computer science',
    'Masters'
  );
