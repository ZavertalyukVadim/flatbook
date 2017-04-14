ALTER TABLE `team5`.`announcements_rents`
DROP FOREIGN KEY `fk_announcements_rents_user`;
ALTER TABLE `team5`.`announcements_rents`
DROP COLUMN `user_id`,
DROP INDEX `fk_announcements_rents_user` ;
