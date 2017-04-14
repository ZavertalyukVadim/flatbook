ALTER TABLE `team5`.`roles`
  ADD COLUMN `user_id` INT NULL AFTER `name`;

ALTER TABLE `team5`.`roles`
  ADD CONSTRAINT `fk_user_fk` FOREIGN KEY (`user_id`) REFERENCES `team5`.`users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
