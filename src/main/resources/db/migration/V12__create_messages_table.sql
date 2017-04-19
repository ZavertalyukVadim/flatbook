CREATE TABLE `team5`.`messages` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sender_id` INT NOT NULL,
  `receiver_id` INT NOT NULL,
  `announcement_id` INT NOT NULL,
  `content` VARCHAR(500) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_messages_user_sender`
  FOREIGN KEY (`sender_id`)
  REFERENCES `team5`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_user_receiver`
  FOREIGN KEY (`receiver_id`)
  REFERENCES `team5`.`users` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  CONSTRAINT `fk_messages_announcement`
  FOREIGN KEY (`announcement_id`)
  REFERENCES `team5`.`announcements` (`id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE);
