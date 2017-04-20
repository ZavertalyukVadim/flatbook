CREATE TABLE `rents` (
  `id` INT NOT NULL,
  `announcement_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `from` DATETIME NOT NULL,
  `to` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_rents_announcement`
    FOREIGN KEY (`announcement_id`)
    REFERENCES `announcements` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_rents_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
