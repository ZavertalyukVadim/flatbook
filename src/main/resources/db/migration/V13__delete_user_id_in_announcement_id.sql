ALTER TABLE `announcements`
  DROP FOREIGN KEY `fk_announcements_user`;
ALTER TABLE `announcements`
  DROP COLUMN `user_id`,
DROP INDEX `fk_announcements_user` ;
