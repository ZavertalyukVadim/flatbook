ALTER TABLE `team5`.`announcements_rents`
  ADD COLUMN `user_id` INT NOT NULL AFTER `rent_id`;
ALTER TABLE `team5`.`announcements_rents`
  ADD CONSTRAINT `fk_announcements_rents_user`
FOREIGN KEY (`user_id`)
REFERENCES `team5`.`users` (`id`)
ON DELETE CASCADE
ON UPDATE CASCADE;
