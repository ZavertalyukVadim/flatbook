DROP TRIGGER IF EXISTS `rents_BEFORE_INSERT`;

DELIMITER $$
USE `team5`$$
CREATE DEFINER=`root`@`localhost` TRIGGER `rents_BEFORE_INSERT` BEFORE INSERT ON `rents` FOR EACH ROW
BEGIN
declare msg varchar(255);

set @result = (select count(announcement_id) from rents
where (not (new.`to` < rents.`from` or new.`from` >= rents.`to`)) and new.`announcement_id`=rents.`announcement_id`);

if (@result <> 0) then
set msg = "data range is used";
signal sqlstate '45000' set MESSAGE_TEXT = msg;
end if;
END$$
DELIMITER ;
