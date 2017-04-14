ALTER TABLE `team5`.`announcements_rents`
  ADD COLUMN `id` INT NOT NULL AUTO_INCREMENT AFTER `rent_id`,
ADD PRIMARY KEY (`id`);
