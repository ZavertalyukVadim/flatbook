CREATE TABLE `team5`.`users_rents` (
  `user_id` INT NOT NULL,
  `announcement_rent_id` INT NOT NULL,
  CONSTRAINT `fk_users_rents_user`
  FOREIGN KEY (`user_id`)
  REFERENCES `team5`.`users` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT `fk_users_rents_announcement_rent`
  FOREIGN KEY (`announcement_rent_id`)
  REFERENCES `team5`.`announcements_rents` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);
