-- Table for favorites
-- Create a database called gradbuddy if not available

CREATE DATABASE IF NOT EXISTS `gradbuddy`;

USE `gradbuddy`;

-- Table for favorites
CREATE TABLE IF NOT EXISTS `favorites` (
  `id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` CHAR(36) NOT NULL,
  `school_id` INT NOT NULL
);

-- Add foreign keys
ALTER TABLE
  `favorites` ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `users`(`user_id`);
ALTER TABLE
  `favorites` ADD CONSTRAINT `favorites_school_id_foreign` FOREIGN KEY(`school_id`) REFERENCES `schools`(`school_id`);
