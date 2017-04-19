ALTER TABLE `team5`.`announcements`
  DROP FOREIGN KEY `fk_announcements_user`;
ALTER TABLE `team5`.`announcements`
  DROP COLUMN `user_id`,
DROP INDEX `fk_announcements_user` ;
