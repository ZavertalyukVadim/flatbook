ALTER TABLE `team5`.`announcements_rents`
  ADD CONSTRAINT `fk_announcements_rents_announcement` FOREIGN KEY (`announcement_id`) REFERENCES `team5`.`announcements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_announcements_rents_rent` FOREIGN KEY (`rent_id`) REFERENCES `team5`.`rents` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
