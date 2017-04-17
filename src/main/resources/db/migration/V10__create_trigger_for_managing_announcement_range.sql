DROP TRIGGER IF EXISTS `team5`.`rents_BEFORE_INSERT`;

DELIMITER $$
USE `team5`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `team5`.`rents_BEFORE_INSERT` BEFORE INSERT ON `rents` FOR EACH ROW
BEGIN
declare msg varchar(255);

set @result = (select count(*) from rents
where new.`to` < rents.`from` or new.`from` > rents.`to`);

if (@result <> 0) then
set msg = "my error";
signal sqlstate '45000' set MESSAGE_TEXT = msg;
end if;
END$$
DELIMITER ;
