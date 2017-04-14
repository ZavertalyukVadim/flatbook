ALTER TABLE `team5`.`rents`
  ADD CONSTRAINT rents UNIQUE(`from`, `to`);