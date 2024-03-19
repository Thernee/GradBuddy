-- Table for users if not available
-- Create a database called gradbuddy if not available

CREATE DATABASE IF NOT EXISTS `gradbuddy`;

USE `gradbuddy`;

-- Table for users
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` CHAR(36) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `fullname` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `nationality` VARCHAR(255) NULL,
  PRIMARY KEY(`user_id`)
);

-- Add unique constraint
ALTER TABLE `users` ADD UNIQUE `users_username_unique`(`username`);
ALTER TABLE `users` ADD UNIQUE `users_email_unique`(`email`);
