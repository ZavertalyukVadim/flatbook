ALTER TABLE `heroku_402365f31dab0c6`.`roles`
  ADD COLUMN `user_id` INT NULL AFTER `name`;

ALTER TABLE `heroku_402365f31dab0c6`.`roles`
  ADD CONSTRAINT `fk_user_fk` FOREIGN KEY (`user_id`) REFERENCES `heroku_402365f31dab0c6`.`users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
